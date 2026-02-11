// app/dashboard/admin/layout.tsx
import Sidebar from "../components/Sidebar";
import AuthGuard from "@/features/auth/components/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="flex min-h-screen w-full">
        <Sidebar role="ADMIN" />

        <main className="flex-1 bg-gray-50">
          <div className="w-full p-6">
            {children}
          </div>
        </main>
      </div>

    </AuthGuard>
  );
}
