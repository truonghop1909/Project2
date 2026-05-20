// src/features/building/components/public/BuildingFilter.tsx

"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { useProvinces, useWardsByProvince } from "../../hooks/useAddress";

interface BuildingFilterProps {
  onSearch: (filters: any) => void;
  loading?: boolean;
}

export const BuildingFilter: React.FC<BuildingFilterProps> = ({ onSearch, loading }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    provinceId: "",
    wardCode: "",
    rentPriceFrom: "",
    rentPriceTo: "",
    floorAreaFrom: "",
    floorAreaTo: "",
  });

  const { provinces } = useProvinces();
  const { wards, loading: loadingWards } = useWardsByProvince(
    filters.provinceId ? Number(filters.provinceId) : null
  );

  const handleChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const cleaned: any = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        cleaned[key] = key.includes("From") || key.includes("To") ? Number(value) : value;
      }
    });
    onSearch(cleaned);
  };

  const handleReset = () => {
    setFilters({
      name: "", provinceId: "", wardCode: "",
      rentPriceFrom: "", rentPriceTo: "",
      floorAreaFrom: "", floorAreaTo: "",
    });
    onSearch({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm tòa nhà theo tên hoặc địa chỉ..."
            value={filters.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-3 border rounded-lg transition-colors flex items-center gap-2 ${
            showAdvanced ? "bg-blue-50 border-blue-300 text-blue-600" : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Filter size={20} />
          Bộ lọc
        </button>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
        >
          Tìm kiếm
        </button>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
              <select
                value={filters.provinceId}
                onChange={(e) => handleChange("provinceId", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả</option>
                {provinces.map(p => (
                  <option key={p.code} value={p.code}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
              <select
                value={filters.wardCode}
                onChange={(e) => handleChange("wardCode", e.target.value)}
                disabled={!filters.provinceId || loadingWards}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Tất cả</option>
                {wards.map(w => (
                  <option key={w.code} value={w.code}>{w.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá thuê (VNĐ/tháng)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Từ"
                  value={filters.rentPriceFrom}
                  onChange={(e) => handleChange("rentPriceFrom", e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Đến"
                  value={filters.rentPriceTo}
                  onChange={(e) => handleChange("rentPriceTo", e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích (m²)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Từ"
                  value={filters.floorAreaFrom}
                  onChange={(e) => handleChange("floorAreaFrom", e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Đến"
                  value={filters.floorAreaTo}
                  onChange={(e) => handleChange("floorAreaTo", e.target.value)}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
};