import { useState, useEffect } from "react";
import { transactionTypeApi } from "../../api/transactionType.api";
import { TransactionTypeDTO } from "../../types/customer.type";

interface TransactionFormProps {
  onSubmit: (data: { transactiontypeId: number; note: string }) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [types, setTypes] = useState<TransactionTypeDTO[]>([]);
  const [form, setForm] = useState({ transactiontypeId: undefined as number | undefined, note: "" });

  useEffect(() => {
    transactionTypeApi.getAll().then(res => setTypes(res.data));
  }, []);

  const handleSubmit = () => {
    if (!form.transactiontypeId || !form.note) {
      alert("Vui lòng nhập loại giao dịch và ghi chú");
      return;
    }
    onSubmit({ transactiontypeId: form.transactiontypeId, note: form.note });
    setForm({ transactiontypeId: undefined, note: "" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
      <label className="md:col-span-2 block">
        <div className="mb-1 text-sm">Loại giao dịch</div>
        <select
          value={form.transactiontypeId ?? ""}
          onChange={(e) => setForm((p) => ({ ...p, transactiontypeId: e.target.value ? Number(e.target.value) : undefined }))}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">-- Chọn loại giao dịch --</option>
          {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </label>
      <label className="md:col-span-4 block">
        <div className="mb-1 text-sm">Ghi chú</div>
        <input value={form.note} onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))} className="w-full rounded border px-3 py-2" />
      </label>
      <div className="md:col-span-6 flex justify-end">
        <button onClick={handleSubmit} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">Thêm giao dịch</button>
      </div>
    </div>
  );
}