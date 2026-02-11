"use client";

import { useState } from "react";
import { BuildingSearch } from "../../types/building.type";

interface Props {
  onSearch: (params: BuildingSearch) => void;
}

export default function BuildingSearchForm({ onSearch }: Props) {
  const [form, setForm] = useState<BuildingSearch>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value,
    }));
  };

  const handleSearch = () => {
    onSearch(form);
  };

  const inputStyle =
    "h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
          placeholder="Đường"
        />

        <input
          name="ward"
          value={form.ward || ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Phường"
        />

        <input
          name="district"
          value={(form as any).district || ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Quận"
        />

        <select
          name="sortBy"
          value={form.sortBy || ""}
          onChange={handleChange}
          className={inputStyle}
        >
          <option value="">Sắp xếp theo</option>
          <option value="rent_price">Giá thuê</option>
          <option value="floor_area">Diện tích</option>
        </select>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">

        <input
          name="floorAreaFrom"
          value={form.floorAreaFrom ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="DT sàn từ"
        />

        <input
          name="floorAreaTo"
          value={form.floorAreaTo ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="DT sàn đến"
        />

        <input
          name="rentPriceFrom"
          value={form.rentPriceFrom ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="Giá thuê từ"
        />

        <input
          name="rentPriceTo"
          value={form.rentPriceTo ?? ""}
          onChange={handleChange}
          type="number"
          className={inputStyle}
          placeholder="Giá thuê đến"
        />

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
      </div>
    </div>
  );
}
