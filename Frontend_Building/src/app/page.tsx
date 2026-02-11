"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles?: string[] | string;
  authorities?: string[] | string;
}

export default function HomePage() {
  const router = useRouter();

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

      if (roles.includes("ROLE_ADMIN")) {
        router.replace("/dashboard/admin");
      } else if (roles.includes("ROLE_STAFF")) {
        router.replace("/dashboard/staff");
      } else {
        router.replace("/login");
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
