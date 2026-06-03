'use client';
import { useBuildingPagination } from '@/features/building/hooks/useBuildingPagination';
import { BuildingCard } from '@/features/building/components/public/BuildingCard';
import BuildingFilter from '@/features/building/components/search/BuildingFilter';
import { Pagination } from '@/components/common';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

export default function BuildingsListPage() {
  const router = useRouter();
  const { buildings, loading, pagination, updateFilters, goToPage, changePageSize, isEmpty } =
    useBuildingPagination({
      publicMode: true,
      initialSize: 12,
    });

  const handleCardClick = (id: number) => router.push(`/buildings/${id}`);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero section - thêm mb-8 để tạo khoảng cách với filter */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 relative z-10 shadow-lg mb-8">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Danh sách văn phòng cho thuê
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg"
          >
            Khám phá không gian làm việc lý tưởng cho doanh nghiệp của bạn
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter với margin top rõ ràng */}
        <div className="mt-0">
          <BuildingFilter onSearch={updateFilters} />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {isEmpty && !loading && (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không có tòa nhà phù hợp với tiêu chí của bạn.</p>
            <button
              onClick={() => updateFilters({})}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {!loading && !isEmpty && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            >
              {buildings.map((b) => (
                <motion.div key={b.id} variants={itemVariants}>
                  <BuildingCard building={b} onClick={() => handleCardClick(b.id!)} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-12">
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
    </div>
  );
}