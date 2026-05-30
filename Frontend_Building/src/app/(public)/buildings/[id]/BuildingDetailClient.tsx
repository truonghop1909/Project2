'use client';
import { useState } from 'react';
import { BuildingDetail } from '@/features/building/types/building.type';
import { Section } from '@/components/ui';
import { ClipboardList } from 'lucide-react';
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
import { PublicContactModal } from '@/features/building/components/public/PublicContactModal';

const formatRentAreas = (rentAreas?: number[]): string =>
  rentAreas?.length ? rentAreas.map((a) => a.toLocaleString()).join(', ') + ' m²' : '—';

export function BuildingDetailClient({ building }: { building: BuildingDetail }) {
  const [showContactModal, setShowContactModal] = useState(false); // ✅ di chuyển vào đây

  const sections = [
    // ... giữ nguyên sections
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
          <div className="text-gray-700 whitespace-pre-wrap p-4 bg-gray-50 rounded-lg">{building.note}</div>
        </Section>
      )}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowContactModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          📞 Liên hệ ngay
        </button>
      </div>
      {showContactModal && (
        <PublicContactModal
          buildingName={building.name}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}