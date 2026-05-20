// src/features/building/components/detail/BuildingMiniMap.tsx

import { ExternalLink, MapPin } from "lucide-react";

interface BuildingMiniMapProps {
  address: string;
  googleMapLink?: string;
}

export const BuildingMiniMap: React.FC<BuildingMiniMapProps> = ({ address, googleMapLink }) => {
  if (!googleMapLink) return null;

  return (
    <a
      href={googleMapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <MapPin size={18} />
      <span className="font-medium">Xem vị trí trên Google Maps</span>
      <ExternalLink size={14} />
    </a>
  );
};