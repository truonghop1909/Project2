// app/dashboard/staff/layout.tsx

import Sidebar from "../components/Sidebar";
import AuthGuard from "@/features/auth/components/AuthGuard";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="STAFF">
      <div className="flex min-h-screen w-full">
        <Sidebar roles={["STAFF"]} />

        <main className="flex-1 bg-gray-50">
          <div className="w-full p-6">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
