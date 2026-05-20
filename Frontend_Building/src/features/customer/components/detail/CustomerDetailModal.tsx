"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { customerApi } from "../../api/customer.api";
import { CustomerDTO } from "../../types/customer.type";

interface Props {
  customerId: number;
  onClose: () => void;
}

export default function CustomerDetailModal({
  customerId,
  onClose,
}: Props) {
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await customerApi.getById(customerId);
        setCustomer(res.data);
      } catch (error) {
        console.error("Failed to fetch customer detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [customerId]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="py-16 text-center text-sm text-gray-500">
            Đang tải dữ liệu...
          </div>
        )}

        {!loading && customer && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {customer.fullname}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Chi tiết khách hàng
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Trạng thái duyệt</p>
                <p className="text-sm font-semibold text-blue-600">
                  {customer.approvalStatus ?? "—"}
                </p>
              </div>
            </div>

            <Card title="Thông tin cơ bản">
              <Row label="Họ tên">{customer.fullname || "—"}</Row>
              <Row label="Số điện thoại">{customer.phone || "—"}</Row>
              <Row label="Email">{customer.email || "—"}</Row>
              <Row label="Nhu cầu">{customer.demand || "—"}</Row>
              <Row label="Ghi chú">{customer.note || "—"}</Row>
            </Card>

            <Card title="Thông tin tạo">
              <Row label="Người tạo">{customer.createdByName || "—"}</Row>
              <Row label="ID người tạo">{customer.createdBy ?? "—"}</Row>
              <Row label="Ngày tạo">{formatDate(customer.createdAt)}</Row>
            </Card>

            <Card title="Thông tin duyệt">
              <Row label="Trạng thái">{customer.approvalStatus || "—"}</Row>
              <Row label="Người duyệt">{customer.approvedByName || "—"}</Row>
              <Row label="ID người duyệt">{customer.approvedBy ?? "—"}</Row>
              <Row label="Ngày duyệt">{formatDate(customer.approvedAt)}</Row>
            </Card>
          </>
        )}

        {!loading && !customer && (
          <div className="py-16 text-center text-sm text-gray-500">
            Không tìm thấy thông tin khách hàng
          </div>
        )}

        <div className="flex justify-end border-t pt-6">
          <button
            onClick={onClose}
            className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
        {title}
      </h3>
      <div className="grid gap-5 text-sm md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="mb-1 text-xs text-gray-500">{label}</span>
      <span className="break-words font-medium text-gray-800">
        {children}
      </span>
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("vi-VN");
}