import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarMenuItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  isSubmenu?: boolean;
}

export function SidebarMenuItem({ href, icon, label, isActive, isSubmenu = false }: SidebarMenuItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isSubmenu ? 'pl-0' : ''}
        ${isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }
      `}
    >
      <span className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>{icon}</span>
      <span>{label}</span>
      {isActive && <div className="ml-auto w-1 h-6 bg-blue-600 rounded-full" />}
    </Link>
  );
}