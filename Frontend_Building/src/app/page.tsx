// app/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { BuildingCard } from "@/features/building/components/public/BuildingCard";
import { BuildingFilter } from "@/features/building/components/public/BuildingFilter";
import { PublicBuildingDetailModal } from "@/features/building/components/public/PublicBuildingDetailModal";
import { buildingApi } from "@/features/building/api/building.api";
import { BuildingSearchDTO } from "@/features/building/types/building.type";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [buildings, setBuildings] = useState<BuildingSearchDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const [filters, setFilters] = useState({});

  const loadBuildings = useCallback(async (searchFilters = {}) => {
    setLoading(true);
    try {
      const response = await buildingApi.getPublicBuildings(searchFilters);
      setBuildings(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách tòa nhà:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBuildings(filters);
  }, [filters, loadBuildings]);

  const handleSearch = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tìm kiếm văn phòng cho thuê</h1>
          <p className="text-lg text-blue-100 mb-8">
            Hàng ngàn mặt bằng văn phòng chất lượng cao tại Việt Nam
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Tòa nhà</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm">Mặt bằng</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Results */}
      <div className="container mx-auto px-4 py-8">
        <BuildingFilter onSearch={handleSearch} loading={loading} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && buildings.length === 0 && (
          <div className="text-center py-12">
            <Building2 size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy tòa nhà</h3>
            <p className="text-gray-500">Vui lòng thử lại với bộ lọc khác</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && buildings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {buildings.map((building) => (
              <BuildingCard
                key={building.id}
                building={building}
                onClick={() => setSelectedBuildingId(building.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedBuildingId && (
        <PublicBuildingDetailModal
          buildingId={selectedBuildingId}
          onClose={() => setSelectedBuildingId(null)}
        />
      )}
    </div>
  );
}