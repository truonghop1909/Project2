"use client";

import { useEffect, useState } from "react";
import { customerApi } from "../../api/customer.api";
import { CustomerRequestDTO } from "../../types/customer.type";

interface Props {
  customerId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CustomerEditModal({
  customerId,
  onClose,
  onSuccess,
}: Props) {

  const [form, setForm] = useState<CustomerRequestDTO>({});
  const [loading, setLoading] = useState(false);

  // ✅ load dữ liệu từ server
  useEffect(() => {
    setLoading(true);

    customerApi
      .getById(customerId)
      .then(res => {
        const c = res.data;

        setForm({
          fullname: c.fullname,
          phone: c.phone,
          email: c.email,
          demand: c.demand,
          note: c.note,
        });
      })
      .finally(() => setLoading(false));

  }, [customerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value === "" ? undefined : value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload: CustomerRequestDTO = {};

    Object.entries(form).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        payload[key as keyof CustomerRequestDTO] = value;
      }
    });

    await customerApi.update(customerId, payload);

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[720px] max-h-[90vh] rounded bg-white shadow flex flex-col">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">
            Sửa khách hàng #{customerId}
          </h3>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-3">

            <Input label="Họ tên" name="fullname" value={form.fullname} onChange={handleChange} />
            <Input label="SĐT" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input label="Nhu cầu" name="demand" value={form.demand} onChange={handleChange} />

            <Input
              className="col-span-2"
              label="Ghi chú"
              name="note"
              value={form.note}
              onChange={handleChange}
            />

          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-yellow-500 px-4 py-2 text-white"
          >
            Lưu
          </button>
        </div>

      </div>
    </div>
  );
}

/* ===== UI helper ===== */

function Input({
  label,
  name,
  value,
  onChange,
  className = "",
}: {
  label: string;
  name: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <div className="mb-1 text-sm">{label}</div>

      <input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full rounded border px-3 py-2"
      />
    </label>
  );
}