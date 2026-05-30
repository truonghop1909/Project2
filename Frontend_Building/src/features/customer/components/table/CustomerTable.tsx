// features/customer/components/table/CustomerTable.tsx
import { CustomerDTO } from "../../types/customer.type";
import { CustomerPermission } from "../../permissions";
import { CustomerTableHeader } from "./CustomerTableHeader";
import { CustomerTableRow } from "./CustomerTableRow";

interface CustomerTableProps {
  customers: CustomerDTO[];
  permission: CustomerPermission;
  loading?: boolean;   // ✅ thêm loading
  onView?: (id: number) => void;
  onEdit?: (c: CustomerDTO) => void;
  onAssign?: (id: number) => void;
  onTransactions?: (id: number) => void;
  onTake?: (id: number) => void;
  onUnassign?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function CustomerTable({
  customers = [],
  permission,
  loading = false,
  onView,
  onEdit,
  onAssign,
  onTransactions,
  onTake,
  onUnassign,
  onApprove,
  onReject,
}: CustomerTableProps) {
  if (loading) {
    return (
      <div className="overflow-x-auto rounded-lg border bg-white">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return <div className="p-6 text-center text-sm text-gray-500">Không có dữ liệu</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <CustomerTableHeader />
        <tbody className="divide-y">
          {customers.map((c) => (
            <CustomerTableRow
              key={c.id}
              customer={c}
              permission={permission}
              onView={onView}
              onEdit={onEdit}
              onAssign={onAssign}
              onTransactions={onTransactions}
              onTake={onTake}
              onUnassign={onUnassign}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}