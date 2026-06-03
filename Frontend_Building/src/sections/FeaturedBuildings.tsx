'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useBuildingPagination } from '@/features/building/hooks/useBuildingPagination';
import { BuildingCard } from '@/features/building/components/public/BuildingCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function FeaturedBuildings() {
  const router = useRouter();
  const { buildings, loading } = useBuildingPagination({ publicMode: true, initialPage: 1, initialSize: 12, autoLoad: true });
  const handleCardClick = (id: number) => router.push(`/buildings/${id}`);
  if (loading) return <div className="text-center py-12">Đang tải...</div>;
  if (!buildings.length) return null;
  return (
    <AnimatedSection direction="up" delay={0.1}>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">🏢 Tòa nhà nổi bật</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          style={{ paddingBottom: '40px' }}   // 👈 thêm style này
          className="pb-12"
        >
          {buildings.map(b => <SwiperSlide key={b.id}><BuildingCard building={b} onClick={() => handleCardClick(b.id!)} /></SwiperSlide>)}
        </Swiper>
        <div className="text-center mt-6">
          <Link href="/buildings" className="inline-block px-6 py-3 bg-accent text-primary rounded-full hover:bg-accent-dark transition shadow-md font-semibold">Xem tất cả tòa nhà</Link>
        </div>
      </section>
    </AnimatedSection>
  );
}