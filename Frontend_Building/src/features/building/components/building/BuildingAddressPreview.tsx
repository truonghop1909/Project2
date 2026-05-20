// components/building/BuildingAddressPreview.tsx
import { MapPin } from "lucide-react";

interface BuildingAddressPreviewProps {
  street?: string;
  wardName?: string;
  provinceName?: string;
}

const getFullAddress = (street: string, ward: string, province: string) => {
  return `${street}, ${ward}, ${province}`;
};

export const BuildingAddressPreview: React.FC<BuildingAddressPreviewProps> = ({
  street,
  wardName,
  provinceName,
}) => {
  if (!provinceName || !wardName || !street) return null;
  
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <MapPin size={20} className="text-green-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-green-800 mb-1">📍 Địa chỉ đầy đủ</div>
          <div className="text-base font-medium text-green-900">
            {getFullAddress(street, wardName, provinceName)}
          </div>
        </div>
      </div>
    </div>
  );
};