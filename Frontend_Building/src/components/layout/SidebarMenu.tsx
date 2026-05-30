'use client';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Users, UserCircle, FileText, CheckCircle2, Home } from 'lucide-react';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarMenuSection } from './SidebarMenuSection';
import { SidebarDropdownMenu } from './SidebarDropdownMenu';

interface SidebarMenuProps {
  role: 'ADMIN' | 'STAFF';
}

export function SidebarMenu({ role }: SidebarMenuProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  if (role === 'ADMIN') {
    return (
      <div className="space-y-6">
        <SidebarMenuSection title="Tổng quan">
          <SidebarMenuItem
            href="/dashboard/admin"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard Admin"
            isActive={isActive('/dashboard/admin')}
          />
        </SidebarMenuSection>
        <SidebarMenuSection title="Quản trị">
          <SidebarMenuItem
            href="/dashboard/admin/users"
            icon={<Users size={20} />}
            label="Người dùng"
            isActive={isActive('/dashboard/admin/users')}
          />
          <SidebarMenuItem
            href="/dashboard/admin/buildings"
            icon={<Building2 size={20} />}
            label="Tòa nhà"
            isActive={isActive('/dashboard/admin/buildings')}
          />
          <SidebarMenuItem
            href="/dashboard/admin/customers"
            icon={<UserCircle size={20} />}
            label="Khách hàng"
            isActive={isActive('/dashboard/admin/customers')}
          />
          <SidebarMenuItem
            href="/dashboard/admin/reports"
            icon={<FileText size={20} />}
            label="Báo cáo"
            isActive={isActive('/dashboard/admin/reports')}
          />
        </SidebarMenuSection>
      </div>
    );
  }

  // STAFF menu
  return (
    <div className="space-y-6">
      <SidebarMenuSection title="Tổng quan">
        <SidebarMenuItem
          href="/dashboard/staff"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard Staff"
          isActive={isActive('/dashboard/staff')}
        />
      </SidebarMenuSection>
      <SidebarMenuSection title="Quản lý tòa nhà">
        <SidebarDropdownMenu
          title="Tòa nhà"
          icon={<Building2 size={20} />}
          isActive={pathname.startsWith('/dashboard/staff/buildings')}
        >
          <SidebarMenuItem
            href="/dashboard/staff/buildings/my-buildings"
            icon={<CheckCircle2 size={18} />}
            label="Được giao"
            isActive={isActive('/dashboard/staff/buildings/my-buildings')}
            isSubmenu
          />
          <SidebarMenuItem
            href="/dashboard/staff/buildings/all-buildings"
            icon={<Home size={18} />}
            label="Tất cả"
            isActive={isActive('/dashboard/staff/buildings/all-buildings')}
            isSubmenu
          />
        </SidebarDropdownMenu>
      </SidebarMenuSection>
      <SidebarMenuSection title="Quản lý khách hàng">
        <SidebarDropdownMenu
          title="Khách hàng"
          icon={<Users size={20} />}
          isActive={pathname.startsWith('/dashboard/staff/customers')}
        >
          <SidebarMenuItem
            href="/dashboard/staff/customers/my-customers"
            icon={<CheckCircle2 size={18} />}
            label="Được giao"
            isActive={isActive('/dashboard/staff/customers/my-customers')}
            isSubmenu
          />
          <SidebarMenuItem
            href="/dashboard/staff/customers/all-customers"
            icon={<Home size={18} />}
            label="Tất cả"
            isActive={isActive('/dashboard/staff/customers/all-customers')}
            isSubmenu
          />
        </SidebarDropdownMenu>
      </SidebarMenuSection>
    </div>
  );
}