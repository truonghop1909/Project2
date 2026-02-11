"use client";

import { useEffect, useState } from "react";
import { buildingApi } from "../../api/building.api";
import { Building, BuildingUpdate } from "../../types/building.type";
import { districtApi } from "@/features/district/api/dictrict.api";
import { District } from "@/features/district/types/dictrict.type";


interface Props {
    buildingId: number;
    onClose: () => void;
    onSuccess: () => void;
}

export default function BuildingEditModal({
    buildingId,
    onClose,
    onSuccess,
}: Props) {
    const [form, setForm] = useState<BuildingUpdate>({});
    const [loading, setLoading] = useState(false);

    // ✅ Load dữ liệu cũ
    useEffect(() => {
        setLoading(true);

        buildingApi
            .getById(buildingId)   // 🔥 LẤY TỪ DB
            .then(res => {
                const b = res.data;

                setForm({
                    name: b.name,
                    street: b.street,
                    ward: b.ward,
                    districtId: b.districtId,
                    structure: b.structure,
                    direction: b.direction,
                    level: b.level,
                    numberOfBasement: b.numberOfBasement,
                    floorArea: b.floorArea,
                    rentPrice: b.rentPrice,
                    rentPriceDescription: b.rentPriceDescription,
                    serviceFee: b.serviceFee,
                    carFee: b.carFee,
                    motorFee: b.motorFee,
                    overtimeFee: b.overtimeFee,
                    electricityFee: b.electricityFee,
                    waterFee: b.waterFee,
                    deposit: b.deposit,
                    payment: b.payment,
                    rentTime: b.rentTime,
                    decorationTime: b.decorationTime,
                    managerName: b.managerName,
                    managerPhone: b.managerPhone,
                    brokerageFee: b.brokerageFee,
                    note: b.note,
                    rentAreas: b.rentAreas,
                    rentTypeCodes: b.rentTypeCodes,
                });
            })
            .finally(() => setLoading(false));
    }, [buildingId]);



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

        await buildingApi.update(buildingId, payload);

        setLoading(false);
        onSuccess();
        onClose();
    };
    const [districts, setDistricts] = useState<District[]>([]);
    useEffect(() => {
        districtApi.getAll().then(res => {
            setDistricts(res.data);
        });
    }, []);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[720px] max-h-[90vh] rounded bg-white shadow flex flex-col">
                {/* HEADER */}
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">
                        Sửa tòa nhà #{buildingId}
                    </h3>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="grid grid-cols-2 gap-3">
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

                        <Input label="Kết cấu" name="structure" value={form.structure} onChange={handleChange} />
                        <Input label="Hướng" name="direction" value={form.direction} onChange={handleChange} />
                        <Input label="Hạng" name="level" value={form.level} onChange={handleChange} />

                        <InputNumber label="Số tầng hầm" name="numberOfBasement" value={form.numberOfBasement} onChange={handleChange} />
                        <InputNumber label="DT sàn" name="floorArea" value={form.floorArea} onChange={handleChange} />
                        <InputNumber label="Giá thuê" name="rentPrice" value={form.rentPrice} onChange={handleChange} />
                        <Input label="Mô tả giá" name="rentPriceDescription" value={form.rentPriceDescription} onChange={handleChange} />

                        <InputNumber label="Phí dịch vụ" name="serviceFee" value={form.serviceFee} onChange={handleChange} />
                        <InputNumber label="Phí ô tô" name="carFee" value={form.carFee} onChange={handleChange} />
                        <InputNumber label="Phí xe máy" name="motorFee" value={form.motorFee} onChange={handleChange} />
                        <InputNumber label="Phí ngoài giờ" name="overtimeFee" value={form.overtimeFee} onChange={handleChange} />

                        <Input label="Tiền điện" name="electricityFee" value={form.electricityFee} onChange={handleChange} />
                        <Input label="Tiền nước" name="waterFee" value={form.waterFee} onChange={handleChange} />

                        <Input label="Đặt cọc" name="deposit" value={form.deposit} onChange={handleChange} />
                        <Input label="Thanh toán" name="payment" value={form.payment} onChange={handleChange} />
                        <Input label="Thời hạn thuê" name="rentTime" value={form.rentTime} onChange={handleChange} />
                        <Input label="Thời gian setup" name="decorationTime" value={form.decorationTime} onChange={handleChange} />

                        <Input label="Quản lý" name="managerName" value={form.managerName} onChange={handleChange} />
                        <Input label="SĐT quản lý" name="managerPhone" value={form.managerPhone} onChange={handleChange} />

                        <InputNumber label="Hoa hồng (%)" name="brokerageFee" value={form.brokerageFee} onChange={handleChange} />
                        <Input className="col-span-2" label="Ghi chú" name="note" value={form.note} onChange={handleChange} />
                    </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 border-t flex justify-end gap-2 bg-white">
                    <button onClick={onClose} className="rounded border px-4 py-2">
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded bg-yellow-500 px-4 py-2 text-white"
                    >
                        Lưu
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
