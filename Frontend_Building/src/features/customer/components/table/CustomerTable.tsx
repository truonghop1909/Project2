"use client";

import { CustomerDTO } from "../../types/customer.type";
import { CustomerPermission } from "../../permissions";

export default function CustomerTable({
  customers = [],
  permission,
  onView,
  onEdit,
  onAssign,
  onTransactions,
  onTake,
  onUnassign,
  onApprove,
  onReject,
}: {
  customers: CustomerDTO[];
  permission: CustomerPermission;

  onView?: (customerId: number) => void;
  onEdit?: (c: CustomerDTO) => void;
  onAssign?: (customerId: number) => void;
  onTransactions?: (customerId: number) => void;
  onTake?: (customerId: number) => void;
  onUnassign?: (customerId: number) => void;
  onApprove?: (customerId: number) => void;
  onReject?: (customerId: number) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Họ tên</th>
            <th className="px-3 py-2 text-left">SĐT</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">Nhu cầu</th>
            <th className="px-3 py-2 text-left">Ghi chú</th>
            <th className="px-3 py-2 text-left">Trạng thái</th>
            <th className="px-3 py-2 text-center w-[320px]">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td
                className="px-3 py-2 font-medium max-w-[200px] truncate"
                title={c.fullname}
              >
                {c.fullname}
              </td>

              <td className="px-3 py-2">{c.phone}</td>

              <td
                className="px-3 py-2 max-w-[220px] truncate"
                title={c.email}
              >
                {c.email}
              </td>

              <td
                className="px-3 py-2 max-w-[220px] truncate"
                title={c.demand}
              >
                {c.demand}
              </td>

              <td
                className="px-3 py-2 max-w-[240px] truncate"
                title={c.note}
              >
                {c.note}
              </td>

              <td className="px-3 py-2">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    c.approvalStatus === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : c.approvalStatus === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.approvalStatus ?? "PENDING"}
                </span>
              </td>

              <td className="px-3 py-2 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {onView && (
                    <button
                      onClick={() => onView(c.id)}
                      className="rounded bg-slate-600 px-2 py-1 text-white hover:bg-slate-700"
                    >
                      Xem
                    </button>
                  )}

                  {permission.canViewTransactions && onTransactions && (
                    <button
                      onClick={() => onTransactions(c.id)}
                      className="rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-800"
                    >
                      Giao dịch
                    </button>
                  )}

                  {permission.canAssign && onAssign && (
                    <button
                      onClick={() => onAssign(c.id)}
                      className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    >
                      Giao NV
                    </button>
                  )}

                  {permission.canEdit && onEdit && (
                    <button
                      onClick={() => onEdit(c)}
                      className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                  )}

                  {permission.canTake && onTake && (
                    <button
                      onClick={() => onTake(c.id)}
                      className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700"
                    >
                      Nhận
                    </button>
                  )}

                  {permission.canUnassign && onUnassign && (
                    <button
                      onClick={() => onUnassign(c.id)}
                      className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                    >
                      Bỏ nhận
                    </button>
                  )}

                  {permission.canApprove &&
                    onApprove &&
                    c.approvalStatus === "PENDING" && (
                      <button
                        onClick={() => onApprove(c.id)}
                        className="rounded bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-700"
                      >
                        Duyệt
                      </button>
                    )}

                  {permission.canReject &&
                    onReject &&
                    c.approvalStatus === "PENDING" && (
                      <button
                        onClick={() => onReject(c.id)}
                        className="rounded bg-rose-600 px-2 py-1 text-white hover:bg-rose-700"
                      >
                        Từ chối
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="p-6 text-center text-sm text-gray-500">
          Không có dữ liệu
        </div>
      )}
    </div>
  );
}