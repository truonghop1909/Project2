// src/features/building/components/detail/BuildingDetailModal.tsx

"use client";

import { useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Building2, Home, MapPin, Wallet, User, Phone, FileText, Calendar, Car, Bike, Zap, Droplet, Award, TrendingUp, Star, Ruler, Layers, Clock, Key, ClipboardList, Navigation, DollarSign, Mail, ExternalLink } from "lucide-react";
import { Section } from "@/shared/components/ui";
import { useBuildingDetail } from "../../hooks/useBuildingDetail";
import {
  formatArea,
  formatAreas,
  formatPrice,
  formatRentTypes,
  formatDirection,
  formatLevel,
  getDisplayAddress,
  formatPhoneNumber
} from "../../utils/building.utils";
import { BuildingHeader } from "./BuildingHeader";
import { BuildingThumbnail } from "./BuildingThumbnail";
import { BuildingInfoSection } from "./BuildingInfoSection";
import { BuildingImageGallery } from "./BuildingImageGallery";
import { BuildingDetailSkeleton } from "./BuildingDetailSkeleton";
import { BuildingDetailError } from "./BuildingDetailError";
import { ModalActions } from "../shared/ModalActions";
import { BuildingMiniMap } from "./BuildingMiniMap";

interface BuildingDetailModalProps {
  buildingId: number;
  onClose: () => void;
}

export default function BuildingDetailModal({ buildingId, onClose }: BuildingDetailModalProps) {
  const { building, loading, error, refetch } = useBuildingDetail(buildingId);

  // Ngăn scroll body khi modal mở - chỉ chạy 1 lần
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []); // Empty deps - chỉ chạy 1 lần

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Memoize sections để tránh re-create mỗi lần render
  // Trong BuildingDetailModal.tsx, sửa lại getBuildingSections

  const buildingSections = useMemo(() => {
    if (!building) return [];

    return [
      {
        title: "Thông tin cơ bản",
        icon: Home,
        columns: 2 as const,
        fields: [
          { label: "Tên tòa nhà", value: building.name, icon: Building2 },
          { label: "Kết cấu", value: building.structure || "—", icon: Layers },
          { label: "Hướng", value: formatDirection(building.direction), icon: TrendingUp },
          { label: "Hạng", value: formatLevel(building.level), icon: Star },
          { label: "Số tầng hầm", value: building.numberOfBasement?.toLocaleString() || "0", icon: ParkingIcon },
          { label: "Diện tích sàn", value: formatArea(building.floorArea), icon: Ruler },
        ]
      },
      // Trong BuildingDetailModal.tsx, sửa lại phần map

      {
        title: "Địa chỉ",
        icon: MapPin,
        columns: 1 as const,
        fields: [
          {
            label: "Địa chỉ",
            value: getDisplayAddress(building),
            icon: Navigation,
            fullWidth: true
          },
          { label: "Tỉnh/Thành phố", value: building.provinceName || "—", icon: MapPin },
          { label: "Xã/Phường", value: building.wardName || "—", icon: MapPin },
          { label: "Đường/Số nhà", value: building.street || "—", icon: Navigation },
          // THÊM PHẦN NÀY - Hiển thị mini map
          ...(building.googleMapLink ? [{
            label: "Bản đồ vị trí",
            value: (
              <BuildingMiniMap
                address={getDisplayAddress(building)}
                googleMapLink={building.googleMapLink}
              />
            ),
            fullWidth: true
          }] : []),
        ]
      },
      {
        title: "Diện tích & Loại hình thuê",
        icon: Home,
        columns: 2 as const,
        fields: [
          { label: "Diện tích cho thuê", value: formatAreas(building.rentAreas), icon: Ruler },
          { label: "Loại hình thuê", value: formatRentTypes(building.rentTypeCodes), icon: Building2 },
        ]
      },
      {
        title: "Chi phí",
        icon: Wallet,
        columns: 2 as const,
        fields: [
          { label: "Giá thuê", value: formatPrice(building.rentPrice), icon: Wallet },
          { label: "Mô tả giá", value: building.rentPriceDescription || "—", icon: ClipboardList },
          { label: "Phí dịch vụ", value: formatPrice(building.serviceFee), icon: DollarSign },
          { label: "Phí ô tô", value: formatPrice(building.carFee), icon: Car },
          { label: "Phí xe máy", value: formatPrice(building.motorFee), icon: Bike },
          { label: "Phí ngoài giờ", value: formatPrice(building.overtimeFee), icon: Clock },
          {
            label: "Tiền điện",
            value: (() => {
              const fee = building.electricityFee;
              if (fee === null || fee === undefined || fee === "") return "—";
              const numFee = typeof fee === 'string' ? parseFloat(fee) : fee;
              if (isNaN(numFee)) return "—";
              return `${numFee.toLocaleString()} ₫/kWh`;
            })(),
            icon: Zap
          },
          {
            label: "Tiền nước",
            value: (() => {
              const fee = building.waterFee;
              if (fee === null || fee === undefined || fee === "") return "—";
              const numFee = typeof fee === 'string' ? parseFloat(fee) : fee;
              if (isNaN(numFee)) return "—";
              return `${numFee.toLocaleString()} ₫/m³`;
            })(),
            icon: DropletIcon
          },
          { label: "Hoa hồng", value: building.brokerageFee ? `${building.brokerageFee}%` : "—", icon: Award },
        ]
      },
      {
        title: "Thông tin hợp đồng",
        icon: FileText,
        columns: 2 as const,
        fields: [
          { label: "Đặt cọc", value: building.deposit || "—", icon: Key },
          { label: "Thanh toán", value: building.payment || "—", icon: Calendar },
          { label: "Thời hạn thuê", value: building.rentTime || "—", icon: Calendar },
          { label: "Thời gian trang trí", value: building.decorationTime || "—", icon: Clock },
        ]
      },
      {
        title: "Thông tin quản lý",
        icon: User,
        columns: 2 as const,
        fields: [
          { label: "Tên quản lý", value: building.managerName || "—", icon: User },
          { label: "Số điện thoại", value: formatPhoneNumber(building.managerPhone), icon: Phone },
        ]
      },
    ];
  }, [building]);

  // Memoize note section
  const noteSection = useMemo(() => {
    if (!building?.note) return null;
    return (
      <Section title="Ghi chú" icon={ClipboardList}>
        <div className="text-gray-700 whitespace-pre-wrap p-4 bg-gray-50 rounded-lg">
          {building.note}
        </div>
      </Section>
    );
  }, [building?.note]);

  // Memoize image gallery
  const imageGallery = useMemo(() => {
    if (!building?.images?.length) return null;
    return <BuildingImageGallery images={building.images} />;
  }, [building?.images]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header - Fixed */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Chi tiết tòa nhà</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {loading && <BuildingDetailSkeleton />}

          {error && (
            <BuildingDetailError
              error={error}
              onRetry={refetch}
              onClose={handleClose}
            />
          )}

          {!loading && !error && building && (
            <>
              <BuildingHeader building={building} />
              <BuildingThumbnail thumbnail={building.thumbnail} name={building.name} />
              {imageGallery}

              {buildingSections.map((section, idx) => (
                <BuildingInfoSection
                  key={`${section.title}-${idx}`}
                  title={section.title}
                  icon={section.icon}
                  fields={section.fields}
                  columns={2}
                />
              ))}

              {noteSection}

              <ModalActions onClose={handleClose} />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Custom Icons - Define outside component to avoid recreation
const ParkingIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </svg>
);

const DropletIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);