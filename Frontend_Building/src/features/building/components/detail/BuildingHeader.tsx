// src/features/building/components/detail/BuildingHeader.tsx

import { MapPin } from "lucide-react";
import { getDisplayAddress, formatPrice } from "../../utils/building.utils";
import { BuildingDetail } from "../../types/building.type";

interface BuildingHeaderProps {
  building: BuildingDetail;
}

export const BuildingHeader: React.FC<BuildingHeaderProps> = ({ building }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-800">{building.name}</h3>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin size={14} />
          {getDisplayAddress(building)}
        </p>
      </div>
      <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
        <p className="text-xs text-gray-500">Giá thuê</p>
        <p className="text-xl font-bold text-green-600">{formatPrice(building.rentPrice)}</p>
      </div>
    </div>
  );
};