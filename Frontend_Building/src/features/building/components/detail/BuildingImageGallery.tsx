// src/features/building/components/detail/BuildingImageGallery.tsx

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Info } from "lucide-react";
import { getImageUrl, FALLBACK_IMAGE } from "../../utils/building.utils";
import { SubImage } from "../../types/building.type";

interface BuildingImageGalleryProps {
  images: SubImage[];
}

export const BuildingImageGallery: React.FC<BuildingImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ImageIcon size={20} className="text-blue-500" />
          Hình ảnh chi tiết
          <span className="text-sm font-normal text-gray-500">({images.length} ảnh)</span>
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={img.id || index}
            className="group cursor-pointer relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedIndex(index)}
          >
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(img.image)}
                alt={img.title || `Ảnh ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
            </div>
            
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {img.title && (
                <p className="text-white text-sm font-medium line-clamp-1">{img.title}</p>
              )}
              {img.description && (
                <p className="text-gray-200 text-xs line-clamp-2 mt-1">{img.description}</p>
              )}
            </div>

            {/* Badge */}
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {index + 1}/{images.length}
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
};

interface ImageLightboxProps {
  images: SubImage[];
  currentIndex: number;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, onClose]);

  const currentImage = images[index];

  return createPortal(
    <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center" onClick={onClose}>
      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      
      {/* Main Image Container */}
      <div className="max-w-7xl max-h-[90vh] w-full mx-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col lg:flex-row gap-6 bg-black/50 rounded-2xl backdrop-blur-sm p-4">
          {/* Image */}
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <img
              src={getImageUrl(currentImage?.image)}
              alt={currentImage?.title || `Ảnh ${index + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Info Panel */}
          <div className="lg:w-80 space-y-4 p-4 bg-gray-900/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Thông tin ảnh</h3>
              <span className="text-gray-400 text-sm">{index + 1}/{images.length}</span>
            </div>
            
            {currentImage?.title && (
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wide">Tiêu đề</label>
                <p className="text-white mt-1">{currentImage.title}</p>
              </div>
            )}
            
            {currentImage?.description && (
              <div>
                <label className="text-gray-400 text-xs uppercase tracking-wide">Mô tả</label>
                <p className="text-gray-300 mt-1 leading-relaxed">{currentImage.description}</p>
              </div>
            )}
            
            {!currentImage?.title && !currentImage?.description && (
              <p className="text-gray-500 text-center py-8">Không có thông tin chi tiết</p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === index ? 'border-blue-500 scale-110' : 'border-white/30 hover:border-white/60'
            }`}
          >
            <img
              src={getImageUrl(img.image)}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};