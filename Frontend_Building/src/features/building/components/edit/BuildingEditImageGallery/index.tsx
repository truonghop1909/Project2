import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import { AddImageButton } from "./AddImageButton";
import { ImageCard } from "./ImageCard";
import { ImageEditLightbox } from "./ImageEditLightbox";
import { SubImageItem } from "../../building/BuildingSubImagesUpload";

interface BuildingEditImageGalleryProps {
  images: SubImageItem[];
  loading?: boolean;
  error?: string;
  onAddImages: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage: (index: number, field: "title" | "description", value: string) => void;
}

export function BuildingEditImageGallery({
  images,
  loading,
  error,
  onAddImages,
  onRemoveImage,
  onUpdateImage,
}: BuildingEditImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.preview?.startsWith('blob:')) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ImageIcon size={20} className="text-blue-500" />
            Hình ảnh chi tiết
          </h3>
          <AddImageButton onAddImages={onAddImages} loading={loading} />
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">Chưa có ảnh chi tiết nào</p>
          <p className="text-sm text-gray-400 mt-1">Nhấn "Thêm ảnh" để tải lên</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon size={20} className="text-blue-500" />
          Hình ảnh chi tiết
          <span className="text-sm font-normal text-gray-500">({images.length} ảnh)</span>
        </h3>
        <AddImageButton onAddImages={onAddImages} loading={loading} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <ImageCard
            key={img.id || `temp-${index}`}
            img={img}
            index={index}
            total={images.length}
            onSelect={() => setSelectedIndex(index)}
            onRemove={() => onRemoveImage(index)}
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      {selectedIndex !== null && (
        <ImageEditLightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onRemoveImage={onRemoveImage}
          onUpdateImage={onUpdateImage}
        />
      )}
    </div>
  );
}