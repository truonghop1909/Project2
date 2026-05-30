"use client";

import { useState, useEffect } from "react";
import { BuildingSearchDTO } from "../../types/building.type";
import { Province, Ward } from "../../types/address.type";  
import { addressApi } from "../../api/Address.api";


interface Props {
  onSearch: (params: BuildingSearchDTO) => void;
}

export default function BuildingSearchForm({ onSearch }: Props) {
  const [form, setForm] = useState<Partial<BuildingSearchDTO>>({});
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Load provinces khi component mount
  useEffect(() => {
    loadProvinces();
  }, []);

  const loadProvinces = async () => {
    setLoadingProvinces(true);
    const data = await addressApi.getProvinces();
    setProvinces(data);
    setLoadingProvinces(false);
  };

  const loadWardsByProvince = async (provinceCode: number) => {
    if (!provinceCode) {
      setWards([]);
      return;
    }
    setLoadingWards(true);
    const data = await addressApi.getWardsByProvince(provinceCode);
    setWards(data);
    setLoadingWards(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value,
    }));

    // Nếu chọn tỉnh mới, load wards và reset wardCode
    if (name === "provinceId" && value) {
      loadWardsByProvince(parseInt(value));
      setForm(prev => ({ ...prev, wardCode: undefined }));
    } else if (name === "provinceId" && !value) {
      setWards([]);
      setForm(prev => ({ ...prev, wardCode: undefined }));
    }
  };

  const handleSearch = () => {
    // Lọc bỏ các field undefined hoặc rỗng
    const searchParams = Object.fromEntries(
      Object.entries(form).filter(([_, value]) => 
        value !== undefined && value !== "" && value !== null
      )
    ) as BuildingSearchDTO;
    
    onSearch(searchParams);
  };

  const handleReset = () => {
    setForm({});
    setWards([]);
    onSearch({});
  };

  const inputStyle = "h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
      {/* Row 1 - Thông tin cơ bản */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Tên tòa nhà"
        />

        <input
          name="street"
          value={form.street || ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Số nhà / Đường"
        />

        <select
          name="provinceId"
          value={form.provinceId || ""}
          onChange={handleChange}
          className={inputStyle}
          disabled={loadingProvinces}
        >
          <option value="">-- Chọn Tỉnh/Thành phố --</option>
          {provinces.map(province => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>

        <select
          name="wardCode"
          value={form.wardCode || ""}
          onChange={handleChange}
          className={inputStyle}
          disabled={loadingWards || !form.provinceId}
        >
          <option value="">-- Chọn Phường/Xã --</option>
          {wards.map(ward => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>

      {/* Row 2 - Thông số kỹ thuật */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          name="floorAreaFrom"
          value={form.floorAreaFrom ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="DT sàn từ (m²)"
        />

        <input
          name="floorAreaTo"
          value={form.floorAreaTo ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="DT sàn đến (m²)"
        />

        <input
          name="rentPriceFrom"
          value={form.rentPriceFrom ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="Giá từ (VNĐ)"
        />

        <input
          name="rentPriceTo"
          value={form.rentPriceTo ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="Giá đến (VNĐ)"
        />

        <select
          name="sortBy"
          value={form.sortBy || ""}
          onChange={handleChange}
          className={inputStyle}
        >
          <option value="">Sắp xếp theo</option>
          <option value="rentPrice">Giá thuê</option>
          <option value="floorArea">Diện tích sàn</option>
        </select>
      </div>

      {/* Row 3 - Sắp xếp & Hành động */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select
          name="sortDirection"
          value={form.sortDirection || "ASC"}
          onChange={handleChange}
          className={inputStyle}
        >
          <option value="ASC">Tăng dần</option>
          <option value="DESC">Giảm dần</option>
        </select>

        <button
          onClick={handleSearch}
          className="h-10 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Tìm kiếm
        </button>

        <button
          onClick={handleReset}
          className="h-10 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}