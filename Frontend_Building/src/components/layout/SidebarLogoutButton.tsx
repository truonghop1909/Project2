'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function SidebarLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.replace('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 group"
    >
      <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      <span>Đăng xuất</span>
    </button>
  );
}