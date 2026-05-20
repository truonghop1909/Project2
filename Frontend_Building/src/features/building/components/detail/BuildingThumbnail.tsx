// src/features/building/components/detail/BuildingThumbnail.tsx

import { useState } from "react";
import { getImageUrl, FALLBACK_IMAGE } from "../../utils/building.utils";
import { Building2 } from "lucide-react";

interface BuildingThumbnailProps {
  thumbnail?: string;
  name: string;
  className?: string;  // ← THÊM DÒNG NÀY
}

export const BuildingThumbnail: React.FC<BuildingThumbnailProps> = ({ 
  thumbnail, 
  name, 
  className = ""  // ← THÊM DÒNG NÀY với giá trị mặc định
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Nếu không có thumbnail hoặc có lỗi, hiển thị placeholder
  if (!thumbnail || imageError) {
    return (
      <div className={`rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
        <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-3">
          <Building2 size={48} className="text-gray-400" />
          <p className="text-gray-500 text-sm font-medium">{name}</p>
          <p className="text-gray-400 text-xs">Chưa có ảnh đại diện</p>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(thumbnail);

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent"></div>
        </div>
      )}
      <img
        src={imageUrl}
        alt={name}
        className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};