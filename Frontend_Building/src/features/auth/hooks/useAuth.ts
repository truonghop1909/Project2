"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface JwtPayload {
  roles?: string[] | string;
  authorities?: string[] | string;
}

export function useAuth() {
  const router = useRouter();

  function redirectByRole(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    const rawRoles =
      decoded.roles ?? decoded.authorities ?? [];

    const roles = Array.isArray(rawRoles)
      ? rawRoles
      : [rawRoles];

    if (roles.includes("ROLE_ADMIN")) {
      router.replace("/dashboard/admin");
      return;
    }

    if (roles.includes("ROLE_STAFF")) {
      router.replace("/dashboard/staff");
      return;
    }

    router.replace("/403");
  }

  return { redirectByRole };
}
