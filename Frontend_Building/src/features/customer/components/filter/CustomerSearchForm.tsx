"use client";

import { useState } from "react";
import { CustomerSearchDTO } from "../../types/customer.type";

export default function CustomerSearchForm({
  onSearch,
}: {
  onSearch: (params: CustomerSearchDTO) => void;
}) {
  const [form, setForm] = useState<CustomerSearchDTO>({});

  const inputStyle =
    "h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === "" ? undefined : Number(value)
          : value === "" ? undefined : value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          name="fullname"
          value={form.fullname || ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Họ tên"
        />

        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Số điện thoại"
        />

        <input
          name="transactionTypeId"
          type="number"
          value={form.transactionTypeId ?? ""}
          onChange={handleChange}
          className={inputStyle}
          placeholder="TransactionTypeId"
        />

        <button
          onClick={() => onSearch(form)}
          className="h-10 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}