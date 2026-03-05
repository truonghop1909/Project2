"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type Role = "ROLE_ADMIN" | "ROLE_STAFF";

interface Props {
  children: React.ReactNode;
  requiredRole?: Role;
}

interface JwtPayload {
  roles?: string[] | string;
  authorities?: string[] | string;
  exp?: number;
}

export default function AuthGuard({ children, requiredRole }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // Check hết hạn
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }

      const rawRoles = decoded.roles ?? decoded.authorities ?? [];

      const roles = Array.isArray(rawRoles)
        ? rawRoles
        : [rawRoles];

      if (requiredRole && !roles.includes(requiredRole)) {
        router.replace("/403");
        return;
      }

      setAuthorized(true);
    } catch {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }, [router, requiredRole]);

  if (!authorized) return null;

  return <>{children}</>;
}
