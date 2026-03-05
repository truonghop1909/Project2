"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BuildingDetail } from "@/features/building/types/building.type";
import { buildingApi } from "@/features/building/api/building.api";

interface Props {
  buildingId: number;
  onClose: () => void;
}

export default function BuildingDetailModal({
  buildingId,
  onClose,
}: Props) {
  const [building, setBuilding] = useState<BuildingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await buildingApi.getById(buildingId);
        setBuilding(res.data);
      } catch (error) {
        console.error("Failed to fetch building detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [buildingId]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Loading ===== */}
        {loading && (
          <div className="text-center py-16 text-gray-500 text-sm">
            Đang tải dữ liệu...
          </div>
        )}

        {/* ===== Content ===== */}
        {!loading && building && (
          <>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {building.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {building.street}, {building.ward}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Giá thuê</p>
                <p className="text-xl font-bold text-green-600">
                  {building.rentPrice
                    ? building.rentPrice.toLocaleString() + " đ"
                    : "—"}
                </p>
              </div>
            </div>

            {/* ===== GENERAL ===== */}
            <Card title="Thông tin chung">
              <Row label="Quận">{building.districtId ?? "—"}</Row>
              <Row label="Tầng hầm">{building.numberOfBasement ?? "—"}</Row>
              <Row label="Diện tích sàn">{building.floorArea ?? "—"}</Row>
              <Row label="Kết cấu">{building.structure ?? "—"}</Row>
              <Row label="Hướng">{building.direction ?? "—"}</Row>
              <Row label="Hạng">{building.level ?? "—"}</Row>
            </Card>

            {/* ===== COST ===== */}
            <Card title="Chi phí">
              <Row label="Mô tả giá">{building.rentPriceDescription ?? "—"}</Row>
              <Row label="Phí dịch vụ">{building.serviceFee ?? "—"}</Row>
              <Row label="Phí ô tô">{building.carFee ?? "—"}</Row>
              <Row label="Phí xe máy">{building.motorFee ?? "—"}</Row>
              <Row label="Phí ngoài giờ">{building.overtimeFee ?? "—"}</Row>
              <Row label="Tiền điện">{building.electricityFee ?? "—"}</Row>
              <Row label="Tiền nước">{building.waterFee ?? "—"}</Row>
              <Row label="Hoa hồng">{building.brokerageFee ?? "—"}</Row>
            </Card>

            {/* ===== TERMS ===== */}
            <Card title="Điều khoản">
              <Row label="Đặt cọc">{building.deposit ?? "—"}</Row>
              <Row label="Thanh toán">{building.payment ?? "—"}</Row>
              <Row label="Thời gian thuê">{building.rentTime ?? "—"}</Row>
              <Row label="Thời gian decor">
                {building.decorationTime ?? "—"}
              </Row>
            </Card>

            {/* ===== OTHER ===== */}
            <Card title="Thông tin khác">
              <Row label="Diện tích thuê">
                {building.rentAreas?.length
                  ? building.rentAreas.join(", ")
                  : "—"}
              </Row>

              <Row label="Loại thuê">
                {building.rentTypeCodes?.length
                  ? building.rentTypeCodes.join(", ")
                  : "—"}
              </Row>

              <Row label="Quản lý">{building.managerName ?? "—"}</Row>
              <Row label="SĐT quản lý">{building.managerPhone ?? "—"}</Row>
              <Row label="Ghi chú">{building.note ?? "—"}</Row>
            </Card>
          </>
        )}

        {/* ===== Close Button ===== */}
        <div className="flex justify-end pt-6 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ================= COMPONENT PHỤ ================= */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
        {children}
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 mb-1">
        {label}
      </span>
      <span className="font-medium text-gray-800 break-words">
        {children}
      </span>
    </div>
  );
}
