"use client";

import { useEffect, useState } from "react";
import { buildingService } from "../services/building.service";
import { BuildingUpdate } from "../types/building.type";
import { District } from "@/features/dictrict/types/dictrict.type";
import { districtService } from "@/features/dictrict/services/dictrict.service";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function BuildingCreateModal({ onClose, onSuccess }: Props) {
    const [form, setForm] = useState<BuildingUpdate>({});
    const [loading, setLoading] = useState(false);
    const [districts, setDistricts] = useState<District[]>([]);

    useEffect(() => {
        districtService.getAll().then(res => setDistricts(res.data));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setForm(prev => ({
            ...prev,
            [name]:
                type === "number" || name === "districtId"
                    ? value === "" ? undefined : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        const payload: BuildingUpdate = {};
        Object.entries(form).forEach(([key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                payload[key as keyof BuildingUpdate] = value;
            }
        });

        await buildingService.create(payload);
        console.log("CREATE PAYLOAD:", payload);
        setLoading(false);
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[720px] max-h-[90vh] bg-white rounded shadow flex flex-col">

                {/* HEADER */}
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">Thêm tòa nhà</h3>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="grid grid-cols-2 gap-3">
                        {/* BASIC */}
                        <Input label="Tên tòa nhà" name="name" value={form.name} onChange={handleChange} />
                        <Input label="Đường" name="street" value={form.street} onChange={handleChange} />
                        <Input label="Phường" name="ward" value={form.ward} onChange={handleChange} />

                        <Select
                            label="Quận"
                            name="districtId"
                            value={form.districtId}
                            options={districts.map(d => ({ value: d.id, label: d.name }))}
                            onChange={handleChange}
                        />

                        {/* BUILDING INFO */}
                        <Input label="Kết cấu" name="structure" value={form.structure} onChange={handleChange} />
                        <Input label="Hướng" name="direction" value={form.direction} onChange={handleChange} />
                        <Input label="Hạng" name="level" value={form.level} onChange={handleChange} />

                        <InputNumber label="Số tầng hầm" name="numberOfBasement" value={form.numberOfBasement} onChange={handleChange} />
                        <InputNumber label="DT sàn" name="floorArea" value={form.floorArea} onChange={handleChange} />

                        {/* PRICE */}
                        <InputNumber label="Giá thuê" name="rentPrice" value={form.rentPrice} onChange={handleChange} />
                        <Input label="Mô tả giá" name="rentPriceDescription" value={form.rentPriceDescription} onChange={handleChange} />

                        <InputNumber label="Phí dịch vụ" name="serviceFee" value={form.serviceFee} onChange={handleChange} />
                        <InputNumber label="Phí ô tô" name="carFee" value={form.carFee} onChange={handleChange} />
                        <InputNumber label="Phí xe máy" name="motorFee" value={form.motorFee} onChange={handleChange} />
                        <InputNumber label="Phí ngoài giờ" name="overtimeFee" value={form.overtimeFee} onChange={handleChange} />

                        <Input label="Tiền điện" name="electricityFee" value={form.electricityFee} onChange={handleChange} />
                        <Input label="Tiền nước" name="waterFee" value={form.waterFee} onChange={handleChange} />

                        {/* CONTRACT */}
                        <Input label="Đặt cọc" name="deposit" value={form.deposit} onChange={handleChange} />
                        <Input label="Thanh toán" name="payment" value={form.payment} onChange={handleChange} />
                        <Input label="Thời hạn thuê" name="rentTime" value={form.rentTime} onChange={handleChange} />
                        <Input label="Thời gian setup" name="decorationTime" value={form.decorationTime} onChange={handleChange} />

                        {/* MANAGER */}
                        <Input label="Quản lý" name="managerName" value={form.managerName} onChange={handleChange} />
                        <Input label="SĐT quản lý" name="managerPhone" value={form.managerPhone} onChange={handleChange} />

                        <InputNumber label="Hoa hồng (%)" name="brokerageFee" value={form.brokerageFee} onChange={handleChange} />

                        {/* NOTE */}
                        <Input
                            className="col-span-2"
                            label="Ghi chú"
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                        />
                    </div>


                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t flex justify-end gap-2">
                    <button onClick={onClose} className="border rounded px-4 py-2">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-green-600 text-white rounded px-4 py-2"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
/* ===== UI helpers ===== */

function Input({
    label,
    name,
    value,
    onChange,
    className = "",
}: {
    label: string;
    name: string;
    value?: string | null;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}) {
    return (
        <label className={`block ${className}`}>
            <div className="mb-1 text-sm">{label}</div>
            <input
                name={name}
                value={value ?? ""}
                onChange={onChange}
                className="w-full rounded border px-3 py-2"
            />
        </label>
    );
}

function InputNumber({
    label,
    name,
    value,
    onChange,
}: {
    label: string;
    name: string;
    value?: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <label className="block">
            <div className="mb-1 text-sm">{label}</div>
            <input
                type="number"
                name={name}
                value={value ?? ""}
                onChange={onChange}
                className="w-full rounded border px-3 py-2"
            />
        </label>
    );
}

function Select({
    label,
    name,
    value,
    options,
    onChange,
}: {
    label: string;
    name: string;
    value?: number | null;
    options: { value: number; label: string }[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
    return (
        <label className="block">
            <div className="mb-1 text-sm">{label}</div>
            <select
                name={name}
                value={value ?? ""}
                onChange={onChange}
                className="w-full rounded border px-3 py-2"
            >
                <option value="">-- Chọn quận --</option>
                {options.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
