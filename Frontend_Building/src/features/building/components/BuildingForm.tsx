"use client";

import { useState } from "react";
import { BuildingSearch } from "../types/building.type";

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
    console.log("SEARCH PARAMS:", form);
    onSearch(form);
  };

  return (
    <div className="grid grid-cols-6 gap-3 rounded bg-white p-4 shadow">
      <input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        className="input"
        placeholder="Tên tòa nhà"
      />

      <input
        name="street"
        value={form.street || ""}
        onChange={handleChange}
        className="input"
        placeholder="Đường"
      />

      <input
        name="ward"
        value={form.ward || ""}
        onChange={handleChange}
        className="input"
        placeholder="Phường"
      />

      <input
        name="district"
        value={(form as any).district || ""}
        onChange={handleChange}
        className="input"
        placeholder="Quận"
      />

      <input
        name="floorAreaFrom"
        value={form.floorAreaFrom ?? ""}
        onChange={handleChange}
        type="number"
        className="input"
        placeholder="DT sàn từ"
      />

      <input
        name="floorAreaTo"
        value={form.floorAreaTo ?? ""}
        onChange={handleChange}
        type="number"
        className="input"
        placeholder="DT sàn đến"
      />

      <input
        name="rentPriceFrom"
        value={form.rentPriceFrom ?? ""}
        onChange={handleChange}
        type="number"
        className="input"
        placeholder="Giá thuê từ"
      />

      <input
        name="rentPriceTo"
        value={form.rentPriceTo ?? ""}
        onChange={handleChange}
        type="number"
        className="input"
        placeholder="Giá thuê đến"
      />

      <select
        name="sortBy"
        value={form.sortBy || ""}
        onChange={handleChange}
        className="input"
      >
        <option value="">Sắp xếp theo</option>
        <option value="rent_price">Giá thuê</option>
        <option value="floor_area">Diện tích</option>
      </select>

      <select
        name="sortDirection"
        value={form.sortDirection || "ASC"}
        onChange={handleChange}
        className="input"
      >
        <option value="ASC">Tăng dần</option>
        <option value="DESC">Giảm dần</option>
      </select>

      <button
        onClick={handleSearch}
        className="col-span-2 rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Tìm kiếm
      </button>
    </div>
  );
}
