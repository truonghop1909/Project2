import { Trash2, Edit3 } from "lucide-react";
import { FALLBACK_IMAGE } from "../../../utils/building.utils";
import { SubImageItem } from "../../building/BuildingSubImagesUpload";

interface ImageCardProps {
  img: SubImageItem;
  index: number;
  total: number;
  onSelect: () => void;
  onRemove: () => void;
}

export function ImageCard({ img, index, total, onSelect, onRemove }: ImageCardProps) {
  return (
    <div
      className="group cursor-pointer relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 hover:shadow-lg transition-all duration-300"
      onClick={onSelect}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={img.preview}
          alt={img.title || `Ảnh ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        {img.title && <p className="text-white text-sm font-medium line-clamp-1">{img.title}</p>}
        {img.description && <p className="text-gray-200 text-xs line-clamp-2 mt-1">{img.description}</p>}
      </div>
      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
        {index + 1}/{total}
      </div>
      {img.isNew && (
        <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium z-10">
          Mới
        </div>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className={`absolute p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md z-10 ${
          img.isNew ? 'top-10 left-2' : 'top-2 left-2'
        }`}
      >
        <Trash2 size={14} className="text-white" />
      </button>
      <div className="absolute bottom-2 left-2 bg-yellow-500/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 size={10} className="inline mr-1" />
        Chỉnh sửa
      </div>
    </div>
  );
}