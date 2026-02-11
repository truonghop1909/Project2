"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type Role = "ADMIN" | "STAFF";

interface Props {
  children: React.ReactNode;
  requiredRole?: Role;
}

interface JwtPayload {
  roles?: string[] | string;
  authorities?: string[] | string;
}

export default function AuthGuard({ children, requiredRole }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const rawRoles =
        decoded.roles ?? decoded.authorities ?? [];

      const roles = Array.isArray(rawRoles)
        ? rawRoles
        : [rawRoles];

      if (requiredRole) {
        const required = `ROLE_${requiredRole}`;
        if (!roles.includes(required)) {
          router.replace("/403");
          return;
        }
      }

      setAuthorized(true);
    } catch {
      router.replace("/login");
    }
  }, [router, requiredRole]);

  if (!authorized) return null; // ⛔ không render gì cả

  return <>{children}</>;
}
