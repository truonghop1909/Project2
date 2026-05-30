"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Role } from "../types/role";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: Role; // sử dụng type Role
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (requiredRole && user.role !== requiredRole) {
        router.replace("/403");
      }
    }
  }, [user, loading, router, requiredRole]);

  if (loading || !user) return null;
  if (requiredRole && user.role !== requiredRole) return null;

  return <>{children}</>;
}