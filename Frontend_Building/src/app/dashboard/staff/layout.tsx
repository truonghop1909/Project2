import AuthGuard from "@/features/auth/components/AuthGuard";
import { ROLE } from "@/features/auth/types/role";
import Sidebar from "@/components/layout/Sidebar";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole={ROLE.STAFF}>
      <div className="flex min-h-screen w-full">
        <Sidebar role="STAFF" />
        <main className="flex-1 bg-gray-50">
          <div className="w-full p-6">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}