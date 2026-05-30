"use client";
import { useState } from "react";
import { Input } from "@/components/ui";
import { ModalActions } from "@/components/common";
import { customerApi } from "../../api/customer.api";
import { CustomerRequestDTO } from "../../types/customer.type";

export default function CustomerCreateModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState<CustomerRequestDTO>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value === "" ? undefined : value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = Object.fromEntries(Object.entries(form).filter(([_, v]) => v !== "" && v != null));
    await customerApi.createPublic(payload);
    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[720px] max-h-[90vh] bg-white rounded shadow flex flex-col">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Thêm khách hàng</h3></div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Họ tên" name="fullname" value={form.fullname} onChange={handleChange} />
            <Input label="SĐT" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input label="Nhu cầu" name="demand" value={form.demand} onChange={handleChange} />
            <Input className="col-span-2" label="Ghi chú" name="note" value={form.note} onChange={handleChange} />
          </div>
        </div>
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="border rounded px-4 py-2">Hủy</button>
          <button onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white rounded px-4 py-2">
            {loading ? "Đang xử lý..." : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}