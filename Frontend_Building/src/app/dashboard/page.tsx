// app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  roles?: string[] | string;
  authorities?: string[] | string;
}

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      router.replace("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const rawRoles = decoded.roles ?? decoded.authorities ?? [];
      const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];

      const hasAdminRole = roles.some(role => role === "ADMIN" || role === "ROLE_ADMIN");
      const hasStaffRole = roles.some(role => role === "STAFF" || role === "ROLE_STAFF");

      if (hasAdminRole) {
        router.replace("/dashboard/admin");
      } else if (hasStaffRole) {
        router.replace("/dashboard/staff");
      } else {
        router.replace("/");
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  return null;
}