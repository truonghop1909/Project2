// app/(public)/buildings/[id]/BuildingDetailClient.tsx
'use client';

import { BuildingDetail } from '@/features/building/types/building.type';
import {
  BuildingHeader,
  BuildingThumbnail,
  BuildingImageGallery,
  BuildingInfoSection,
} from '@/features/building/components/detail';
import { Section } from '@/shared/components/ui';
import { ClipboardList } from 'lucide-react';
import {
  formatArea,
  formatPrice,
  formatRentTypes,
  formatDirection,
  formatLevel,
  getDisplayAddress,
} from '@/features/building/utils/building.utils';

const formatRentAreas = (rentAreas?: number[]): string => {
  if (!rentAreas || rentAreas.length === 0) return '—';
  return rentAreas.map(area => area.toLocaleString()).join(', ') + ' m²';
};

export function BuildingDetailClient({ building }: { building: BuildingDetail }) {
  const sections = [
    {
      title: 'Thông tin cơ bản',
      fields: [
        { label: 'Tên tòa nhà', value: building.name },
        { label: 'Kết cấu', value: building.structure || '—' },
        { label: 'Hướng', value: formatDirection(building.direction) },
        { label: 'Hạng', value: formatLevel(building.level) },
        { label: 'Số tầng hầm', value: building.numberOfBasement?.toLocaleString() || '0' },
        { label: 'Diện tích sàn', value: formatArea(building.floorArea) },
      ]
    },
    {
      title: 'Địa chỉ',
      fields: [
        { label: 'Địa chỉ', value: getDisplayAddress(building), fullWidth: true },
      ]
    },
    {
      title: 'Diện tích & Loại hình thuê',
      fields: [
        { label: 'Diện tích cho thuê', value: formatRentAreas(building.rentAreas) },
        { label: 'Loại hình thuê', value: formatRentTypes(building.rentTypeCodes) },
      ]
    },
    {
      title: 'Chi phí',
      fields: [
        { label: 'Giá thuê', value: formatPrice(building.rentPrice) },
        { label: 'Mô tả giá', value: building.rentPriceDescription || '—' },
        { label: 'Phí dịch vụ', value: formatPrice(building.serviceFee) },
        { label: 'Phí ô tô', value: formatPrice(building.carFee) },
        { label: 'Phí xe máy', value: formatPrice(building.motorFee) },
        { label: 'Phí ngoài giờ', value: formatPrice(building.overtimeFee) },
        { label: 'Tiền điện', value: building.electricityFee ? `${building.electricityFee} ₫/kWh` : '—' },
        { label: 'Tiền nước', value: building.waterFee ? `${building.waterFee} ₫/m³` : '—' },
        { label: 'Hoa hồng', value: building.brokerageFee ? `${building.brokerageFee}%` : '—' },
      ]
    },
    {
      title: 'Thông tin hợp đồng',
      fields: [
        { label: 'Đặt cọc', value: building.deposit || '—' },
        { label: 'Thanh toán', value: building.payment || '—' },
        { label: 'Thời hạn thuê', value: building.rentTime || '—' },
        { label: 'Thời gian trang trí', value: building.decorationTime || '—' },
      ]
    },
    {
      title: 'Thông tin quản lý',
      fields: [
        { label: 'Tên quản lý', value: building.managerName || '—' },
        { label: 'Số điện thoại', value: building.managerPhone || '—' },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <BuildingHeader building={building} />
      <div className="mt-6">
        <BuildingThumbnail thumbnail={building.thumbnail} name={building.name} className="w-full h-96" />
      </div>
      {building.images && building.images.length > 0 && (
        <div className="mt-8">
          <BuildingImageGallery images={building.images} />
        </div>
      )}
      <div className="mt-8 space-y-6">
        {sections.map((section, idx) => (
          <BuildingInfoSection key={idx} title={section.title} fields={section.fields} columns={2} />
        ))}
      </div>
      {building.note && (
        <Section title="Ghi chú" icon={ClipboardList}>
          <div className="text-gray-700 whitespace-pre-wrap p-4 bg-gray-50 rounded-lg">
            {building.note}
          </div>
        </Section>
      )}
      <div className="mt-8 flex justify-center">
        <a href={`tel:${building.managerPhone}`} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📞 Liên hệ ngay
        </a>
      </div>
    </div>
  );
}