"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Role } from "@/features/users/types/role";

interface SidebarProps {
  role: Role;
}

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Xóa token
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); // nếu có

    // 2. Chuyển về trang login
    router.replace("/login");
  };

  return (
    <aside className="w-64 bg-white border-r px-4 py-6">
      <nav className="space-y-1">

        {/* Dashboard theo role */}
        {role === "ADMIN" && (
          <MenuItem href="/dashboard/admin" label="Dashboard" />
        )}

        {role === "STAFF" && (
          <MenuItem href="/dashboard/staff" label="Dashboard" />
        )}

        {/* ADMIN MENU */}
        {role === "ADMIN" && (
          <>
            <MenuItem href="/dashboard/admin/users" label="Quản lý người dùng" />
            <MenuItem href="/dashboard/admin/buildings" label="Quản lý tòa nhà" />
            <MenuItem href="/dashboard/admin/reports" label="Báo cáo" />
          </>
        )}

        {/* STAFF MENU */}
        {role === "STAFF" && (
          <>
            <MenuItem href="/dashboard/orders" label="Đơn hàng" />
            <MenuItem href="/dashboard/customers" label="Khách hàng" />
          </>
        )}

        <hr className="my-3" />

        {/* LOGOUT */}
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
