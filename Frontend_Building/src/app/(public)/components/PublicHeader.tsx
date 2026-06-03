'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function PublicHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition">
          Building<span className="text-accent">Hub</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className={`transition ${
            isActive('/') ? 'text-accent font-semibold' : 'text-gray-700 hover:text-accent'
          }`}>Trang chủ</Link>
          <Link href="/buildings" className={`transition ${
            isActive('/buildings') ? 'text-accent font-semibold' : 'text-gray-700 hover:text-accent'
          }`}>Danh sách văn phòng</Link>
          <Link href="/contact" className="text-gray-700 hover:text-accent transition">Liên hệ</Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition">
            Đăng nhập
          </Link>
          <Link href="/register" className="px-4 py-2 bg-accent text-primary rounded-full hover:bg-accent-dark transition shadow-md">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}