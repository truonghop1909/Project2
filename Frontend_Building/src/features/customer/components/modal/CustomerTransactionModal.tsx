"use client";
import { useEffect, useState } from "react";
import { transactionApi } from "../../api/transaction.api";
import { TransactionDTO } from "../../types/customer.type";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";

type Mode = "ADMIN" | "STAFF";

export default function CustomerTransactionModal({ customerId, mode, onClose }: { customerId: number; mode: Mode; onClose: () => void }) {
  const [items, setItems] = useState<TransactionDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = mode === "ADMIN" ? await transactionApi.getForAdmin(customerId) : await transactionApi.getForStaff(customerId);
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [customerId, mode]);

  const handleCreate = async (data: { transactiontypeId: number; note: string }) => {
    await transactionApi.create(customerId, data);
    await fetchData();
  };

  const customerInfo = items.find(x => x.customerName || x.customerPhone);
  const title = customerInfo ? `${customerInfo.customerName ?? ""}${customerInfo.customerPhone ? " - " + customerInfo.customerPhone : ""}` : `#${customerId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-4 shadow">
        <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Giao dịch khách hàng {title} ({mode})</h3><button onClick={onClose}>✕</button></div>
        <div className="mt-4"><TransactionForm onSubmit={handleCreate} /></div>
        <div className="mt-4"><TransactionList items={items} loading={loading} /></div>
        <div className="mt-4 flex justify-end"><button onClick={onClose} className="rounded bg-black px-4 py-2 text-white">Đóng</button></div>
      </div>
    </div>
  );
}