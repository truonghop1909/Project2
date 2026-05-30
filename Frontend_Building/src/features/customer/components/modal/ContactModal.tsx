"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Input, TextArea } from "@/components/ui";
import { customerApi } from "../../api/customer.api";
import { CustomerRequestDTO } from "../../types/customer.type";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<CustomerRequestDTO>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value === "" ? undefined : value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // Chỉ gửi các trường cần thiết
      const payload = {
        fullname: form.fullname,
        phone: form.phone,
        email: form.email,
        demand: form.demand,
        note: form.note,
      };
      await customerApi.createPublic(payload);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setForm({});
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Liên hệ tư vấn</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8 text-green-600">
            <p className="text-lg font-semibold">Gửi yêu cầu thành công!</p>
            <p className="text-sm mt-2">Chúng tôi sẽ liên hệ lại sớm nhất.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <Input
                label="Họ tên *"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                required
              />
              <Input
                label="Số điện thoại *"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <Input
                label="Nhu cầu *"
                name="demand"
                value={form.demand}
                onChange={handleChange}
                placeholder="VD: Thuê văn phòng 100m², giá dưới 20 triệu..."
                required
              />
              <TextArea
                label="Ghi chú"
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={3}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !form.fullname || !form.phone || !form.demand}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}