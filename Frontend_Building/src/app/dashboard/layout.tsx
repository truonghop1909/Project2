'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Header } from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('🔹 DashboardLayout effect:', { loading, user });
    if (!loading && !user) {
      console.log('🔹 No user, redirect to /login');
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  console.log('🔹 DashboardLayout render với user:', user);
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 bg-gray-50">
        <Header title={user.role === 'ADMIN' ? 'Dashboard Admin' : 'Dashboard Staff'} username={user.username} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}