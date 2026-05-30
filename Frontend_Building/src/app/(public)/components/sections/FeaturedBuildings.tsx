'use client';
import { useBuildingPagination } from '@/features/building/hooks/useBuildingPagination';
import { BuildingCard } from '@/features/building/components/public/BuildingCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function FeaturedBuildings() {
  const router = useRouter();
  const { buildings, loading } = useBuildingPagination({
    publicMode: true,
    initialPage: 1,
    initialSize: 6,
    autoLoad: true,
  });

  const handleCardClick = (id: number) => {
    router.push(`/buildings/${id}`);
  };

  if (loading) return <div className="text-center py-12">Đang tải...</div>;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Tòa nhà nổi bật</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildings.map((b) => (
          <BuildingCard key={b.id} building={b} onClick={() => handleCardClick(b.id!)} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/buildings" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Xem tất cả
        </Link>
      </div>
    </section>
  );
}