'use client';
import { SidebarLogo } from './SidebarLogo';
import { SidebarMenu } from './SidebarMenu';
import { SidebarLogoutButton } from './SidebarLogoutButton';

interface SidebarProps {
    role: 'ADMIN' | 'STAFF';
}

export default function Sidebar({ role }: SidebarProps) {
    console.log("📌 Sidebar render với role:", role);
    return (

        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            <SidebarLogo />
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <SidebarMenu role={role} />
            </nav>
            <div className="p-3 border-t border-gray-200">
                <SidebarLogoutButton />
            </div>
        </aside>
    );
}