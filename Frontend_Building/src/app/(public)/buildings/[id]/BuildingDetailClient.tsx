'use client';
import { BuildingDetail } from '@/features/building/types/building.type';
import { Section } from '@/components/ui';
import { ClipboardList, MapPin, Phone, Mail, Building2, Calendar, CreditCard, Car, Bike, Zap, Droplet, Percent } from 'lucide-react';
import {
  formatArea,
  formatPrice,
  formatRentTypes,
  formatDirection,
  formatLevel,
  getDisplayAddress,
} from '@/features/building/utils/building.utils';
import { BuildingHeader } from '@/features/building/components/detail/BuildingHeader';
import { BuildingThumbnail } from '@/features/building/components/detail/BuildingThumbnail';
import { BuildingImageGallery } from '@/features/building/components/detail/BuildingImageGallery';
import { BuildingInfoSection } from '@/features/building/components/detail/BuildingInfoSection';
import { BuildingMiniMap } from '@/features/building/components/detail/BuildingMiniMap';
import { useState } from 'react';
import { PublicContactModal } from '@/features/building/components/public/PublicContactModal';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const formatRentAreas = (rentAreas?: number[]): string =>
  rentAreas?.length ? rentAreas.map((a) => a.toLocaleString()).join(', ') + ' m²' : '—';

// Icon map cho các field
const fieldIconMap: Record<string, any> = {
  'Giá thuê': 'DollarSign',
  'Phí dịch vụ': 'CreditCard',
  'Phí ô tô': 'Car',
  'Phí xe máy': 'Bike',
  'Tiền điện': 'Zap',
  'Tiền nước': 'Droplet',
  'Hoa hồng': 'Percent',
};

export function BuildingDetailClient({ building }: { building: BuildingDetail }) {
  const [showContactModal, setShowContactModal] = useState(false);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);

  const sections = [
    {
      title: 'Thông tin cơ bản',
      icon: Building2,
      fields: [
        { label: 'Tên tòa nhà', value: building.name },
        { label: 'Kết cấu', value: building.structure || '—' },
        { label: 'Hướng', value: formatDirection(building.direction) },
        { label: 'Hạng', value: formatLevel(building.level) },
        { label: 'Số tầng hầm', value: building.numberOfBasement?.toLocaleString() || '0' },
        { label: 'Diện tích sàn', value: formatArea(building.floorArea) },
      ],
    },
    {
      title: 'Địa chỉ',
      icon: MapPin,
      fields: [{ label: 'Địa chỉ', value: getDisplayAddress(building), fullWidth: true }],
    },
    {
      title: 'Diện tích & Loại hình thuê',
      icon: Building2,
      fields: [
        { label: 'Diện tích cho thuê', value: formatRentAreas(building.rentAreas) },
        { label: 'Loại hình thuê', value: formatRentTypes(building.rentTypeCodes) },
      ],
    },
    {
      title: 'Chi phí',
      icon: CreditCard,
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
      ],
    },
    {
      title: 'Thông tin hợp đồng',
      icon: Calendar,
      fields: [
        { label: 'Đặt cọc', value: building.deposit || '—' },
        { label: 'Thanh toán', value: building.payment || '—' },
        { label: 'Thời hạn thuê', value: building.rentTime || '—' },
        { label: 'Thời gian trang trí', value: building.decorationTime || '—' },
      ],
    },
    {
      title: 'Thông tin quản lý',
      icon: Phone,
      fields: [
        { label: 'Tên quản lý', value: building.managerName || '—' },
        { label: 'Số điện thoại', value: building.managerPhone || '—' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero animation */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={heroVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8 max-w-6xl"
      >
        <BuildingHeader building={building} />

        {/* Thumbnail với hiệu ứng */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6"
        >
          <BuildingThumbnail thumbnail={building.thumbnail} name={building.name} className="w-full h-96 rounded-2xl shadow-xl" />
        </motion.div>

        {/* Image Gallery */}
        {building.images && building.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8"
          >
            <BuildingImageGallery images={building.images} />
          </motion.div>
        )}

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <BuildingMiniMap
            address={getDisplayAddress(building)}
            googleMapLink={building.googleMapLink}
          />
        </motion.div>

        {/* Thông tin chi tiết */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 space-y-8"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
            >
              <BuildingInfoSection
                title={section.title}
                fields={section.fields}
                columns={2}
                icon={section.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Ghi chú */}
        {building.note && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-8"
          >
            <Section title="Ghi chú" icon={ClipboardList}>
              <div className="text-gray-700 whitespace-pre-wrap p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                {building.note}
              </div>
            </Section>
          </motion.div>
        )}

        {/* Nút liên hệ nổi bật */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowContactModal(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Lớp phủ hover - sẽ lộ dần từ trái sang phải */}
              <span className="absolute inset-y-0 left-0 w-0 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              <Phone className="relative z-10 w-5 h-5" />
              <span className="relative z-10">Liên hệ ngay</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {showContactModal && (
        <PublicContactModal
          buildingName={building.name}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}