"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Role } from "@/features/auth/types/role";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCircle,
  FileText,
  LogOut,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Building,
  Home,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  roles: Role[];
}

export default function Sidebar({ roles }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isBuildingMenuOpen, setIsBuildingMenuOpen] = useState(true);

  const isAdmin = roles.includes("ADMIN");
  const isStaff = roles.includes("STAFF");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/login");
  };

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo / Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          <span>Building Management</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* DASHBOARD SECTION */}
        {(isAdmin || isStaff) && (
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Tổng quan
            </p>
            {isAdmin && (
              <MenuItem
                href="/dashboard/admin"
                label="Dashboard Admin"
                icon={LayoutDashboard}
                isActive={isActive("/dashboard/admin")}
              />
            )}
            {isStaff && (
              <MenuItem
                href="/dashboard/staff"
                label="Dashboard Staff"
                icon={LayoutDashboard}
                isActive={isActive("/dashboard/staff")}
              />
            )}
          </div>
        )}

        {/* ADMIN SECTION */}
        {isAdmin && (
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quản trị
            </p>
            <MenuItem
              href="/dashboard/admin/users"
              label="Người dùng"
              icon={Users}
              isActive={isActive("/dashboard/admin/users")}
            />
            <MenuItem
              href="/dashboard/admin/buildings"
              label="Tòa nhà"
              icon={Building2}
              isActive={isActive("/dashboard/admin/buildings")}
            />
            <MenuItem
              href="/dashboard/admin/customers"
              label="Khách hàng"
              icon={UserCircle}
              isActive={isActive("/dashboard/admin/customers")}
            />
            <MenuItem
              href="/dashboard/admin/reports"
              label="Báo cáo"
              icon={FileText}
              isActive={isActive("/dashboard/admin/reports")}
            />
          </div>
        )}

        {/* STAFF SECTION */}
        {isStaff && (
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quản lý tòa nhà
            </p>
            
            {/* Dropdown menu */}
            <div>
              <button
                onClick={() => setIsBuildingMenuOpen(!isBuildingMenuOpen)}
                className={`
                  w-full flex items-center justify-between
                  px-3 py-2 rounded-lg
                  text-sm font-medium
                  transition-all duration-200
                  ${isBuildingMenuOpen 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5" />
                  <span>Tòa nhà</span>
                </div>
                {isBuildingMenuOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {isBuildingMenuOpen && (
                <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
                  <MenuItem
                    href="/dashboard/staff/buildings/my-buildings"
                    label="Được giao"
                    icon={CheckCircle2}
                    isActive={isActive("/dashboard/staff/buildings/my-buildings")}
                    isSubmenu
                  />
                  <MenuItem
                    href="/dashboard/staff/buildings/all-buildings"
                    label="Tất cả"
                    icon={Home}
                    isActive={isActive("/dashboard/staff/buildings/all-buildings")}
                    isSubmenu
                  />
                </div>
              )}
            </div>

            <MenuItem
              href="/dashboard/staff/customers"
              label="Khách hàng"
              icon={Users}
              isActive={isActive("/dashboard/staff/customers")}
            />
          </div>
        )}
      </nav>

      {/* Footer - Logout Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3
            px-3 py-2 rounded-lg
            text-sm font-medium text-red-600
            hover:bg-red-50
            transition-all duration-200
            group
          "
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

interface MenuItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  isSubmenu?: boolean;
}

function MenuItem({ href, label, icon: Icon, isActive, isSubmenu }: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3
        px-3 py-2 rounded-lg
        text-sm font-medium
        transition-all duration-200
        ${isSubmenu ? "pl-0" : ""}
        ${isActive 
          ? "bg-blue-50 text-blue-700" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto w-1 h-6 bg-blue-600 rounded-full" />
      )}
    </Link>
  );
}  
