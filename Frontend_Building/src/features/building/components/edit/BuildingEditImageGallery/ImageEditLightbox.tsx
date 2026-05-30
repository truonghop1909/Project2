import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Edit3, Trash2 } from "lucide-react";
import { SubImageItem } from "../../building/BuildingSubImagesUpload";

interface ImageEditLightboxProps {
  images: SubImageItem[];
  currentIndex: number;
  onClose: () => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage: (index: number, field: "title" | "description", value: string) => void;
}

export function ImageEditLightbox({
  images,
  currentIndex,
  onClose,
  onRemoveImage,
  onUpdateImage,
}: ImageEditLightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const current = images[index];
    if (current) {
      setEditTitle(current.title || "");
      setEditDescription(current.description || "");
    }
  }, [index, images]);

  const currentImage = images[index];
  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const saveChanges = () => {
    onUpdateImage(index, "title", editTitle);
    onUpdateImage(index, "description", editDescription);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onRemoveImage(index);
    if (images.length === 1) {
      onClose();
    } else if (index === images.length - 1) {
      setIndex(index - 1);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center" onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full">
        <ChevronLeft size={28} className="text-white" />
      </button>
      <div className="max-w-7xl max-h-[90vh] w-full mx-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col lg:flex-row gap-6 bg-black/50 rounded-2xl backdrop-blur-sm p-4">
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <img src={currentImage?.preview} alt="" className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />
          </div>
          <div className="lg:w-96 space-y-4 p-4 bg-gray-900/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Chỉnh sửa ảnh</h3>
              <div className="flex gap-2">
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="p-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30">
                    <Edit3 size={16} />
                  </button>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600">Hủy</button>
                    <button onClick={saveChanges} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Lưu</button>
                  </>
                )}
                <button onClick={handleDelete} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" placeholder="Tiêu đề..." autoFocus />
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={4} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none" placeholder="Mô tả..." />
              </div>
            ) : (
              <div className="space-y-3">
                {currentImage?.title && <div><label className="text-gray-400 text-xs">Tiêu đề</label><p className="text-white mt-1">{currentImage.title}</p></div>}
                {currentImage?.description && <div><label className="text-gray-400 text-xs">Mô tả</label><p className="text-gray-300 mt-1">{currentImage.description}</p></div>}
                {!currentImage?.title && !currentImage?.description && <p className="text-gray-500 text-center py-8">Chưa có thông tin</p>}
              </div>
            )}
            <div className="pt-3 border-t border-gray-700"><p className="text-gray-400 text-xs">{index + 1}/{images.length} ảnh</p></div>
          </div>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full">
        <ChevronRight size={28} className="text-white" />
      </button>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full">
        <X size={24} className="text-white" />
      </button>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
        {images.map((img, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }} className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === index ? 'border-yellow-500 scale-110' : 'border-white/30'}`}>
            <img src={img.preview} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}