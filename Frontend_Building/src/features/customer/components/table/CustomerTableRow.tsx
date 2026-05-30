import { CustomerDTO } from "../../types/customer.type";
import { CustomerPermission } from "../../permissions";

interface CustomerTableRowProps {
  customer: CustomerDTO;
  permission: CustomerPermission;
  onView?: (id: number) => void;
  onEdit?: (c: CustomerDTO) => void;
  onAssign?: (id: number) => void;
  onTransactions?: (id: number) => void;
  onTake?: (id: number) => void;
  onUnassign?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const statusClass = {
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
};

export function CustomerTableRow({
  customer,
  permission,
  onView,
  onEdit,
  onAssign,
  onTransactions,
  onTake,
  onUnassign,
  onApprove,
  onReject,
}: CustomerTableRowProps) {
  const status = customer.approvalStatus ?? "PENDING";
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-3 py-2 font-medium max-w-[200px] truncate" title={customer.fullname}>
        {customer.fullname}
      </td>
      <td className="px-3 py-2">{customer.phone}</td>
      <td className="px-3 py-2 max-w-[220px] truncate" title={customer.email}>
        {customer.email}
      </td>
      <td className="px-3 py-2 max-w-[220px] truncate" title={customer.demand}>
        {customer.demand}
      </td>
      <td className="px-3 py-2 max-w-[240px] truncate" title={customer.note}>
        {customer.note}
      </td>
      <td className="px-3 py-2">
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusClass[status as keyof typeof statusClass]}`}>
          {status}
        </span>
      </td>
      <td className="px-3 py-2 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {onView && (
            <button onClick={() => onView(customer.id)} className="rounded bg-slate-600 px-2 py-1 text-white hover:bg-slate-700">
              Xem
            </button>
          )}
          {permission.canViewTransactions && onTransactions && (
            <button onClick={() => onTransactions(customer.id)} className="rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-800">
              Giao dịch
            </button>
          )}
          {permission.canAssign && onAssign && (
            <button onClick={() => onAssign(customer.id)} className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
              Giao NV
            </button>
          )}
          {permission.canEdit && onEdit && (
            <button onClick={() => onEdit(customer)} className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600">
              Sửa
            </button>
          )}
          {permission.canTake && onTake && (
            <button onClick={() => onTake(customer.id)} className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700">
              Nhận
            </button>
          )}
          {permission.canUnassign && onUnassign && (
            <button onClick={() => onUnassign(customer.id)} className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700">
              Bỏ nhận
            </button>
          )}
          {permission.canApprove && onApprove && status === "PENDING" && (
            <button onClick={() => onApprove(customer.id)} className="rounded bg-emerald-600 px-2 py-1 text-white hover:bg-emerald-700">
              Duyệt
            </button>
          )}
          {permission.canReject && onReject && status === "PENDING" && (
            <button onClick={() => onReject(customer.id)} className="rounded bg-rose-600 px-2 py-1 text-white hover:bg-rose-700">
              Từ chối
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}