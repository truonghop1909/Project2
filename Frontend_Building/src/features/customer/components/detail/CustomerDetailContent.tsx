import { InfoRow, ModalActions } from "@/components/common";
import { formatDate } from "@/utils/date.utils";

export function CustomerDetailContent({ customer, onClose }: { customer: any; onClose: () => void }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{customer.fullname}</h2>
          <p className="mt-1 text-sm text-gray-500">Chi tiết khách hàng</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Trạng thái duyệt</p>
          <p className="text-sm font-semibold text-blue-600">{customer.approvalStatus ?? "—"}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Thông tin cơ bản</h3>
          <div className="mt-4 grid gap-5 text-sm md:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Họ tên" value={customer.fullname || "—"} />
            <InfoRow label="Số điện thoại" value={customer.phone || "—"} />
            <InfoRow label="Email" value={customer.email || "—"} />
            <InfoRow label="Nhu cầu" value={customer.demand || "—"} />
            <InfoRow label="Ghi chú" value={customer.note || "—"} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Thông tin tạo</h3>
          <div className="mt-4 grid gap-5 text-sm md:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Người tạo" value={customer.createdByName || "—"} />
            <InfoRow label="ID người tạo" value={customer.createdBy ?? "—"} />
            <InfoRow label="Ngày tạo" value={formatDate(customer.createdAt)} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Thông tin duyệt</h3>
          <div className="mt-4 grid gap-5 text-sm md:grid-cols-2 lg:grid-cols-3">
            <InfoRow label="Trạng thái" value={customer.approvalStatus || "—"} />
            <InfoRow label="Người duyệt" value={customer.approvedByName || "—"} />
            <InfoRow label="ID người duyệt" value={customer.approvedBy ?? "—"} />
            <InfoRow label="Ngày duyệt" value={formatDate(customer.approvedAt)} />
          </div>
        </div>
      </div>

      <ModalActions onClose={onClose} />
    </>
  );
}