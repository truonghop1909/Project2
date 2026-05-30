"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { customerApi } from "../../api/customer.api";
import { CustomerDetailContent } from "./CustomerDetailContent";

interface Props {
  customerId: number;
  onClose: () => void;
}

export default function CustomerDetailModal({ customerId, onClose }: Props) {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await customerApi.getById(customerId);
        setCustomer(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [customerId]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {loading && <div className="py-16 text-center text-sm text-gray-500">Đang tải...</div>}
        {!loading && customer && <CustomerDetailContent customer={customer} onClose={onClose} />}
        {!loading && !customer && <div className="py-16 text-center text-sm text-gray-500">Không tìm thấy thông tin</div>}
      </div>
    </div>,
    document.body
  );
}