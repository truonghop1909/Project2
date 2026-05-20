// src/features/building/components/public/BuildingCard.tsx

"use client";

import { MapPin, DollarSign, Ruler, Phone, Building2 } from "lucide-react";
import { BuildingSearchDTO } from "../../types/building.type";
import { imageApi } from "../../api/image.api";

interface BuildingCardProps {
  building: BuildingSearchDTO;
  onClick: () => void;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, onClick }) => {
  const formatPrice = (price?: number) => {
    if (!price) return "—";
    return `${price.toLocaleString()} ₫`;
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {building.thumbnail ? (
          <img
            src={imageApi.getImageUrl(building.thumbnail)}
            alt={building.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
            <Building2 size={48} className="text-white opacity-50" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
          Cho thuê
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{building.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{building.address}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-gray-400" />
            <span>Diện tích: {building.floorArea?.toLocaleString()} m²</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-500" />
            <span className="text-green-600 font-semibold">{formatPrice(building.rentPrice)}</span>
            <span className="text-xs text-gray-400">/ tháng</span>
          </div>
        </div>

        {/* Manager info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Phone size={14} />
            <span>Liên hệ: {building.managerName || "Quản lý"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};