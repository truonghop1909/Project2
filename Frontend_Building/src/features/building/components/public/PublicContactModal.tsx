"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User, Phone, Mail, MessageSquare, FileText } from "lucide-react";
import { Input, TextArea } from "@/components/ui";
import { customerApi } from "@/features/customer/api/customer.api";
import { CustomerRequestDTO } from "@/features/customer/types/customer.type";

interface PublicContactModalProps {
  buildingName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PublicContactModal({ buildingName, onClose, onSuccess }: PublicContactModalProps) {
  const [form, setForm] = useState<CustomerRequestDTO>({
    fullname: "",
    phone: "",
    email: "",
    demand: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.fullname || !form.phone) {
      setError("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await customerApi.createPublic(form);
      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Liên hệ về tòa nhà: {buildingName}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-4 space-y-4">
          {success ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-lg mb-2">✓ Gửi yêu cầu thành công!</div>
              <p className="text-gray-500">Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
            </div>
          ) : (
            <>
              <Input label="Họ tên *" name="fullname" value={form.fullname} onChange={handleChange} required />
              <Input label="Số điện thoại *" name="phone" value={form.phone} onChange={handleChange} required />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
              <Input label="Nhu cầu" name="demand" value={form.demand} onChange={handleChange} placeholder="VD: Thuê văn phòng 100m²" />
              <TextArea label="Ghi chú" name="note" value={form.note} onChange={handleChange} rows={3} />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </>
          )}
        </div>
        <div className="flex justify-end gap-2 p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Đóng</button>
          {!success && (
            <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}