"use client";

import { useEffect, useMemo, useState } from "react";
import { customerApi } from "../../api/customer.api";
import { assignmentCustomerApi } from "../../api/assignmentCustomer.api";
import { CustomerDTO, StaffAssignmentDTO } from "../../types/customer.type";

export default function CustomerAssignmentModal({
    customerId,
    onClose,
    onSuccess,
}: {
    customerId: number;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [customer, setCustomer] = useState<CustomerDTO | null>(null);
    const [staffs, setStaffs] = useState<StaffAssignmentDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [cusRes, staffRes] = await Promise.all([
                customerApi.getById(customerId),
                assignmentCustomerApi.loadStaffs(customerId),
            ]);

            setCustomer(cusRes.data);
            setStaffs(staffRes.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerId]);

    const selectedStaffIds = useMemo(
        () => staffs.filter((s) => s.checked).map((s) => s.staffId),
        [staffs]
    );

    const toggle = (staffId: number) => {
        setStaffs((prev) =>
            prev.map((s) =>
                s.staffId === staffId ? { ...s, checked: !s.checked } : s
            )
        );
    };

    const handleSave = async () => {
        await assignmentCustomerApi.assign({
            customerId,
            staffIds: selectedStaffIds,
        });
        onSuccess();
        onClose();
    };

    const title = customer
        ? `${customer.fullname} - ${customer.phone}`
        : `#${customerId}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-3xl rounded-xl bg-white p-5 shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        Giao nhân viên cho khách hàng {title}
                    </h3>
                    <button className="px-2 py-1" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {loading && (
                    <div className="py-10 text-center text-sm text-gray-500">
                        Đang tải...
                    </div>
                )}

                {!loading && (
                    <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                        {staffs.map((s) => (
                            <label
                                key={s.staffId}
                                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={!!s.checked}
                                    onChange={() => toggle(s.staffId)}
                                    className="h-4 w-4"
                                />

                                <div className="flex-1">
                                    <div className="font-medium text-gray-800">
                                        {s.fullname || `Staff #${s.staffId}`}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        ID: {s.staffId}
                                    </div>
                                </div>
                            </label>
                        ))}

                        {staffs.length === 0 && (
                            <div className="py-10 text-center text-sm text-gray-500">
                                Không có nhân viên
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-5 flex justify-end gap-2">
                    <button onClick={onClose} className="rounded border px-4 py-2">
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Lưu giao
                    </button>
                </div>
            </div>
        </div>
    );
}