"use client";

import AuthGuard from "@/features/auth/components/AuthGuard";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard requiredRole="STAFF">{children}</AuthGuard>;
}
