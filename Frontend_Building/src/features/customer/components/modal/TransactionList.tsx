import { TransactionDTO } from "../../types/customer.type";

export function TransactionList({ items, loading }: { items: TransactionDTO[]; loading: boolean }) {
  if (loading) return <div className="p-6 text-center text-sm text-gray-500">Đang tải...</div>;
  if (items.length === 0) return <div className="p-6 text-center text-sm text-gray-500">Chưa có giao dịch</div>;

  return (
    <div className="rounded border overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Khách hàng</th>
            <th className="px-3 py-2 text-left">Loại giao dịch</th>
            <th className="px-3 py-2 text-left">Ghi chú</th>
            <th className="px-3 py-2 text-left">Ngày</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((t) => (
            <tr key={t.id ?? t.date}>
              <td className="px-3 py-2">{t.id ?? "—"}</td>
              <td className="px-3 py-2"><div className="font-medium">{t.customerName ?? "—"}</div><div className="text-xs text-gray-500">{t.customerPhone ?? ""}</div></td>
              <td className="px-3 py-2">{t.transactionTypeName ?? "—"}</td>
              <td className="px-3 py-2">{t.note ?? "—"}</td>
              <td className="px-3 py-2">{t.date ? new Date(t.date).toLocaleString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}