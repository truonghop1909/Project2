// app/(public)/_components/PublicHeader.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PublicHeader() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          BuildingHub
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className={`hover:text-blue-600 ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
            Trang chủ
          </Link>
          <Link href="/buildings" className={`hover:text-blue-600 ${isActive('/buildings') ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
            Danh sách văn phòng
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">Liên hệ</Link>
        </nav>
        <div className="flex gap-2">
          <Link href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Đăng nhập
          </Link>
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}