import Link from 'next/link';
import { Building2 } from 'lucide-react';

export function SidebarLogo() {
  return (
    <div className="px-6 py-5 border-b border-gray-200">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Building2 className="w-6 h-6 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">Building Management</span>
      </Link>
    </div>
  );
}