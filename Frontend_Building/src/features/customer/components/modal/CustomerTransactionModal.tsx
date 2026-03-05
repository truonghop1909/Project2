"use client";

import { useEffect, useMemo, useState } from "react";
import { transactionApi } from "../../api/transaction.api";
import { TransactionDTO } from "../../types/customer.type";
import { transactionTypeApi } from "../../api/transactionType.api"
import { TransactionTypeDTO } from "../../types/customer.type"

type Mode = "ADMIN" | "STAFF";

export default function CustomerTransactionModal({
    customerId,
    mode,
    onClose,
}: {
    customerId: number;
    mode: Mode;
    onClose: () => void;
}) {
    const [items, setItems] = useState<TransactionDTO[]>([]);
    const [types, setTypes] = useState<TransactionTypeDTO[]>([])
    const [form, setForm] = useState<TransactionDTO>({
        transactiontypeId: undefined,
        note: "",
    });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res =
                mode === "ADMIN"
                    ? await transactionApi.getForAdmin(customerId)
                    : await transactionApi.getForStaff(customerId);

            setItems(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()

        transactionTypeApi.getAll().then(res => {
            setTypes(res.data)
        })

    }, [customerId, mode])

    const handleCreate = async () => {
        if (!form.note || !form.transactiontypeId) {
            alert("Vui lòng nhập TransactionTypeId và Note");
            return;
        }

        await transactionApi.create(customerId, {
            transactiontypeId: Number(form.transactiontypeId),
            note: form.note,
        });

        setForm({ transactiontypeId: undefined, note: "" });
        await fetchData();
    };

    // ✅ Lấy info khách để hiển thị title (vì mọi row đều cùng 1 khách)
    const customerInfo = useMemo(() => {
        const first = items.find((x) => x.customerName || x.customerPhone);
        if (!first) return null;
        return {
            name: first.customerName ?? "",
            phone: first.customerPhone ?? "",
        };
    }, [items]);

    const title = customerInfo?.name
        ? `${customerInfo.name}${customerInfo.phone ? " - " + customerInfo.phone : ""}`
        : `#${customerId}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-3xl rounded-xl bg-white p-4 shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        Giao dịch khách hàng {title} ({mode})
                    </h3>
                    <button className="px-2 py-1 text-sm" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Create */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                    <label className="md:col-span-2 block">
                        <div className="mb-1 text-sm">Loại giao dịch</div>
                        <select
                            value={form.transactiontypeId ?? ""}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    transactiontypeId:
                                        e.target.value === "" ? undefined : Number(e.target.value),
                                }))
                            }
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="">-- Chọn loại giao dịch --</option>

                            {types.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="md:col-span-4 block">
                        <div className="mb-1 text-sm">Note</div>
                        <input
                            value={form.note ?? ""}
                            onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                            className="w-full rounded border px-3 py-2"
                        />
                    </label>

                    <div className="md:col-span-6 flex justify-end">
                        <button
                            onClick={handleCreate}
                            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            Thêm giao dịch
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="mt-4 rounded border overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-3 py-2 text-left">ID</th>
                                <th className="px-3 py-2 text-left">Khách hàng</th>
                                <th className="px-3 py-2 text-left">Loại giao dịch</th>
                                <th className="px-3 py-2 text-left">Note</th>
                                <th className="px-3 py-2 text-left">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {items.map((t) => (
                                <tr key={t.id ?? `${t.date}-${Math.random()}`}>
                                    <td className="px-3 py-2">{t.id ?? "—"}</td>

                                    <td className="px-3 py-2">
                                        <div className="font-medium">{t.customerName ?? "—"}</div>
                                        <div className="text-xs text-gray-500">{t.customerPhone ?? ""}</div>
                                    </td>

                                    <td className="px-3 py-2">
                                        {t.transactionTypeName ?? "—"}
                                    </td>

                                    <td className="px-3 py-2">{t.note ?? "—"}</td>

                                    <td className="px-3 py-2">
                                        {t.date ? new Date(t.date).toLocaleString() : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!loading && items.length === 0 && (
                        <div className="p-6 text-center text-sm text-gray-500">
                            Chưa có giao dịch
                        </div>
                    )}

                    {loading && (
                        <div className="p-6 text-center text-sm text-gray-500">
                            Đang tải...
                        </div>
                    )}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}