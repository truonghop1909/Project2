"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Role } from "@/features/auth/types/role";

interface SidebarProps {
  roles: Role[]; // <-- đổi sang mảng
}

export default function Sidebar({ roles }: SidebarProps) {
  const router = useRouter();

  const isAdmin = roles.includes("ROLE_ADMIN");
  const isStaff = roles.includes("ROLE_STAFF");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/login");
  };

  return (
    <aside className="w-64 bg-white border-r px-4 py-6">
      <nav className="space-y-1">

        {/* DASHBOARD */}
        {isAdmin && (
          <MenuItem href="/dashboard/admin" label="Dashboard Admin" />
        )}

        {isStaff && (
          <MenuItem href="/dashboard/staff" label="Dashboard Staff" />
        )}

        {/* ADMIN MENU */}
        {isAdmin && (
          <>
            <p className="px-4 pt-4 text-xs font-semibold text-gray-400">
              ADMIN
            </p>
            <MenuItem href="/dashboard/admin/users" label="Quản lý người dùng" />
            <MenuItem href="/dashboard/admin/buildings" label="Quản lý tòa nhà" />
            <MenuItem href="/dashboard/admin/customers" label="Quản lý khách hàng" />
            <MenuItem href="/dashboard/admin/reports" label="Báo cáo" />
          </>
        )}

        {/* STAFF MENU */}
        {isStaff && (
          <>
            <p className="px-4 pt-4 text-xs font-semibold text-gray-400">
              STAFF
            </p>
            <MenuItem href="/dashboard/staff/buildings" label="Quản lý tòa nhà" />
            <MenuItem href="/dashboard/staff/customers" label="Quản lý khách hàng" />
          </>
        )}

        <hr className="my-3" />

        <button
          onClick={handleLogout}
          className="
            w-full text-left px-4 py-2 rounded-lg
            text-sm font-medium text-red-600
            hover:bg-red-50
            transition
          "
        >
          Đăng xuất
        </button>
      </nav>
    </aside>
  );
}

function MenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        block px-4 py-2 rounded-lg
        text-sm font-medium text-gray-700
        hover:bg-gray-100 hover:text-gray-900
        transition
      "
    >
      {label}
    </Link>
  );
}
