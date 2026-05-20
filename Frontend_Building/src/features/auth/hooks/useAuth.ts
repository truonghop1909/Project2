"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ROLE } from "../types/role";

interface JwtPayload {
  roles?: string[] | string;
  authorities?: string[] | string;
}

export function useAuth() {
  const router = useRouter();

  function redirectByRole(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    const rawRoles = decoded.roles ?? decoded.authorities ?? [];
    const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];

    console.log("Decoded roles:", roles);

    if (roles.includes(ROLE.ADMIN)) {
      router.replace("/dashboard/admin");
      return;
    }

    if (roles.includes(ROLE.STAFF)) {
      router.replace("/dashboard/staff");
      return;
    }

    router.replace("/403");
  }

  return { redirectByRole };
}