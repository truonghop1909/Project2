'use client';
import { useBuildingPagination } from '@/features/building/hooks/useBuildingPagination';
import { BuildingCard } from '@/features/building/components/public/BuildingCard';
import BuildingFilter from '@/features/building/components/search/BuildingFilter';
import { Pagination } from '@/components/common';
import { useRouter } from 'next/navigation';

export default function BuildingsListPage() {
  const router = useRouter();
  const { buildings, loading, pagination, updateFilters, goToPage, changePageSize, isEmpty } =
    useBuildingPagination({
      publicMode: true,
      initialSize: 12,
    });

  const handleCardClick = (id: number) => router.push(`/buildings/${id}`);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Danh sách văn phòng cho thuê</h1>
      <BuildingFilter onSearch={updateFilters} />
      {loading && <div className="text-center py-12 text-gray-500">Đang tải...</div>}
      {isEmpty && <div className="text-center py-12 text-gray-500">Không có tòa nhà phù hợp.</div>}
      {!loading && !isEmpty && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {buildings.map((b) => (
              <BuildingCard key={b.id} building={b} onClick={() => handleCardClick(b.id!)} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              pageSize={pagination.size}
              totalElements={pagination.totalElements}
              onPageChange={goToPage}
              onPageSizeChange={changePageSize}
              showSizeChanger
            />
          </div>
        </>
      )}
    </div>
  );
}