// src/features/building/components/edit/BuildingEditHeader.tsx

import { MapPin, Edit3 } from "lucide-react";
import { getDisplayAddress, formatPrice } from "../../utils/building.utils";
import { BuildingDetail } from "../../types/building.type";

interface BuildingEditHeaderProps {
  building: BuildingDetail;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export const BuildingEditHeader: React.FC<BuildingEditHeaderProps> = ({ 
  building, 
  onFieldChange,
  errors 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
      <div className="space-y-2 flex-1">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Tên tòa nhà</label>
          <input
            type="text"
            value={building.name || ""}
            onChange={(e) => onFieldChange("name", e.target.value)}
            className="text-2xl font-bold text-gray-800 w-full border-b-2 border-transparent focus:border-yellow-500 focus:outline-none bg-transparent px-2 py-1 -ml-2"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin size={14} />
          <span>{getDisplayAddress(building)}</span>
        </div>
      </div>
      <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
        <p className="text-xs text-gray-500">Giá thuê</p>
        <input
          type="number"
          value={building.rentPrice || ""}
          onChange={(e) => onFieldChange("rentPrice", e.target.value === "" ? undefined : Number(e.target.value))}
          className="text-xl font-bold text-green-600 w-32 text-right border-b-2 border-transparent focus:border-yellow-500 focus:outline-none bg-transparent"
        />
        <span className="text-xs text-gray-400">₫</span>
      </div>
    </div>
  );
};