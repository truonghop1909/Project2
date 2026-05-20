// src/features/building/components/edit/BuildingEditThumbnail.tsx

import { useState, useRef, useEffect } from "react";
import { Upload, Building2, Loader2 } from "lucide-react";
import { getImageUrl } from "../../utils/building.utils";

interface BuildingEditThumbnailProps {
  thumbnail?: string;
  name: string;
  onThumbnailChange: (file: File | null) => void;
  loading?: boolean;
  error?: string;
}

export const BuildingEditThumbnail: React.FC<BuildingEditThumbnailProps> = ({ 
  thumbnail, 
  name, 
  onThumbnailChange,
  loading,
  error 
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(thumbnail || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cập nhật preview khi thumbnail prop thay đổi
  useEffect(() => {
    if (thumbnail && !selectedFile) {
      setPreviewUrl(thumbnail);
    }
  }, [thumbnail, selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ hỗ trợ các định dạng: JPG, PNG, WEBP, GIF');
      return;
    }

    if (file.size > maxSize) {
      alert('Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    // Chỉ tạo preview, KHÔNG upload lên server
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);
    onThumbnailChange(file);
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Hiển thị ảnh preview tạm thời
  if (!previewUrl) {
    return (
      <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full min-h-[300px] flex flex-col items-center justify-center gap-3">
          <Building2 size={48} className="text-gray-400" />
          <p className="text-gray-500 text-sm font-medium">{name}</p>
          <p className="text-gray-400 text-xs">Chưa có ảnh đại diện</p>
        </div>
        <label className="absolute bottom-4 right-4 p-2 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors shadow-lg z-10">
          <Upload size={18} className="text-white" />
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
            onChange={handleFileChange} 
            className="hidden" 
            disabled={loading}
          />
        </label>
      </div>
    );
  }

  // Hiển thị ảnh preview (từ file mới hoặc thumbnail cũ)
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
      <img
        src={previewUrl}
        alt={name}
        className="w-full h-full object-cover min-h-[300px]"
      />
      <label className="absolute bottom-4 right-4 p-2 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors shadow-lg z-20">
        <Upload size={18} className="text-white" />
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
          onChange={handleFileChange} 
          className="hidden" 
          disabled={loading}
        />
      </label>
      
      {/* Badge hiển thị ảnh tạm thời */}
      {selectedFile && (
        <div className="absolute bottom-4 left-4 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
          Ảnh mới (chưa lưu)
        </div>
      )}
      
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};