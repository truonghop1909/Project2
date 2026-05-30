"use client";

import { useState } from "react";
import {
  CustomerSearchDTO,
  TransactionTypeDTO,
} from "../../types/customer.type";

export default function CustomerSearchForm({
  onSearch,
  showApprovalStatus = false,
  showTransactionType = false,    // ✅ mới
  transactionTypes = [],
  showStaffFilters = false,
}: {
  onSearch: (params: CustomerSearchDTO) => void;
  showApprovalStatus?: boolean;
  showTransactionType?: boolean;   // ✅ mới
  transactionTypes?: TransactionTypeDTO[];
  showStaffFilters?: boolean;
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
        type === "number" || name === "transactionTypeId" || name === "staffId"
          ? value === ""
            ? undefined
            : Number(value)
          : value === ""
          ? undefined
          : value,
    }));
  };

  // Tính số cột dựa trên các flag
  let cols = "md:grid-cols-2"; // baseline: fullname + phone
  if (showTransactionType) cols = "md:grid-cols-3";
  if (showApprovalStatus) cols = "md:grid-cols-4";
  if (showStaffFilters) cols = "md:grid-cols-6";

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-4">
      <div className={`grid grid-cols-1 gap-4 ${cols}`}>
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

        {showTransactionType && (
          <select
            name="transactionTypeId"
            value={form.transactionTypeId ?? ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Loại giao dịch</option>
            {transactionTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        {showApprovalStatus && (
          <select
            name="approvalStatus"
            value={form.approvalStatus || ""}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Trạng thái</option>
            <option value="PENDING">Chờ duyệt</option>
            <option value="APPROVED">Đã duyệt</option>
            <option value="REJECTED">Từ chối</option>
          </select>
        )}

        {showStaffFilters && (
          <>
            <input
              name="staffId"
              type="number"
              value={form.staffId ?? ""}
              onChange={handleChange}
              className={inputStyle}
              placeholder="ID staff"
            />

            <input
              name="staffName"
              value={form.staffName || ""}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Tên staff quản lý"
            />
          </>
        )}

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