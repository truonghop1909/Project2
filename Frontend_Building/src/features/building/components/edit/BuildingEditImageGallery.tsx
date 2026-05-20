// src/features/building/components/edit/BuildingEditImageGallery.tsx

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Plus, Trash2, Edit3 } from "lucide-react";
import { FALLBACK_IMAGE } from "../../utils/building.utils";

interface SubImage {
  id?: number;
  preview: string;
  title: string;
  description: string;
  isNew?: boolean;
  file?: File;
}

interface BuildingEditImageGalleryProps {
  images: SubImage[];
  loading?: boolean;
  error?: string;
  onAddImages: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage: (index: number, field: "title" | "description", value: string) => void;
}

export const BuildingEditImageGallery: React.FC<BuildingEditImageGalleryProps> = ({
  images,
  loading,
  error,
  onAddImages,
  onRemoveImage,
  onUpdateImage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Cleanup blob URLs khi component unmount
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.preview?.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  const EmptyState = () => (
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

  if (!images || images.length === 0) {
    return <EmptyState />;
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
};

// Component con: Nút thêm ảnh
const AddImageButton = ({ onAddImages, loading }: { onAddImages: (files: File[]) => void; loading?: boolean }) => (
  <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
    <Plus size={16} />
    Thêm ảnh
    <input 
      type="file" 
      accept="image/*" 
      multiple 
      onChange={(e) => onAddImages(Array.from(e.target.files || []))} 
      className="hidden" 
      disabled={loading}
    />
  </label>
);

// Component con: Card hiển thị ảnh
const ImageCard = ({ 
  img, 
  index, 
  total, 
  onSelect, 
  onRemove 
}: { 
  img: SubImage; 
  index: number; 
  total: number; 
  onSelect: () => void; 
  onRemove: () => void;
}) => (
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

    {/* Badge số thứ tự */}
    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
      {index + 1}/{total}
    </div>

    {/* Badge "Mới" cho ảnh chưa lưu */}
    {img.isNew && (
      <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium z-10">
        Mới
      </div>
    )}

    {/* Nút xóa */}
    <button
      onClick={(e) => { e.stopPropagation(); onRemove(); }}
      className={`absolute p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md z-10 ${
        img.isNew ? 'top-10 left-2' : 'top-2 left-2'
      }`}
    >
      <Trash2 size={14} className="text-white" />
    </button>

    {/* Badge chỉnh sửa */}
    <div className="absolute bottom-2 left-2 bg-yellow-500/80 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
      <Edit3 size={10} className="inline mr-1" />
      Chỉnh sửa
    </div>
  </div>
);

// Component: Lightbox chỉnh sửa ảnh
const ImageEditLightbox: React.FC<{
  images: SubImage[];
  currentIndex: number;
  onClose: () => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage: (index: number, field: "title" | "description", value: string) => void;
}> = ({ images, currentIndex, onClose, onRemoveImage, onUpdateImage }) => {
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
      <NavButton onClick={prev} icon={<ChevronLeft size={28} />} position="left" />
      
      <div className="max-w-7xl max-h-[90vh] w-full mx-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col lg:flex-row gap-6 bg-black/50 rounded-2xl backdrop-blur-sm p-4">
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <img
              src={currentImage?.preview}
              alt={currentImage?.title || `Ảnh ${index + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          <EditPanel
            currentImage={currentImage}
            index={index}
            total={images.length}
            editTitle={editTitle}
            editDescription={editDescription}
            isEditing={isEditing}
            onEditTitleChange={setEditTitle}
            onEditDescriptionChange={setEditDescription}
            onSave={saveChanges}
            onCancel={() => setIsEditing(false)}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <NavButton onClick={next} icon={<ChevronRight size={28} />} position="right" />
      <CloseButton onClick={onClose} />

      <ThumbnailNavigation
        images={images}
        currentIndex={index}
        onSelect={setIndex}
      />
    </div>,
    document.body
  );
};

// Component con: Nút điều hướng
const NavButton = ({ onClick, icon, position }: { onClick: () => void; icon: React.ReactNode; position: "left" | "right" }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`absolute ${position === 'left' ? 'left-4' : 'right-4'} p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm`}
  >
    {icon}
  </button>
);

// Component con: Nút đóng
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
  >
    <X size={24} className="text-white" />
  </button>
);

// Component con: Panel chỉnh sửa
const EditPanel = ({
  currentImage,
  index,
  total,
  editTitle,
  editDescription,
  isEditing,
  onEditTitleChange,
  onEditDescriptionChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: any) => (
  <div className="lg:w-96 space-y-4 p-4 bg-gray-900/50 rounded-xl backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-white font-semibold text-lg">Chỉnh sửa ảnh</h3>
      <div className="flex gap-2">
        {!isEditing ? (
          <button onClick={onEdit} className="p-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30">
            <Edit3 size={16} />
          </button>
        ) : (
          <>
            <button onClick={onCancel} className="px-3 py-1 text-sm bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              Hủy
            </button>
            <button onClick={onSave} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Lưu
            </button>
          </>
        )}
        <button onClick={onDelete} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    
    {isEditing ? (
      <div className="space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => onEditTitleChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-500"
          placeholder="Nhập tiêu đề ảnh..."
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => onEditDescriptionChange(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 resize-none"
          placeholder="Nhập mô tả ảnh..."
        />
      </div>
    ) : (
      <div className="space-y-3">
        {currentImage?.title && (
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wide">Tiêu đề</label>
            <p className="text-white mt-1 break-words">{currentImage.title}</p>
          </div>
        )}
        {currentImage?.description && (
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-wide">Mô tả</label>
            <p className="text-gray-300 mt-1 leading-relaxed break-words">{currentImage.description}</p>
          </div>
        )}
        {!currentImage?.title && !currentImage?.description && (
          <p className="text-gray-500 text-center py-8">Chưa có thông tin chi tiết</p>
        )}
      </div>
    )}
    
    <div className="pt-3 border-t border-gray-700">
      <p className="text-gray-400 text-xs">{index + 1}/{total} ảnh</p>
    </div>
  </div>
);

// Component con: Thumbnail navigation
const ThumbnailNavigation = ({ images, currentIndex, onSelect }: { images: SubImage[]; currentIndex: number; onSelect: (index: number) => void }) => (
  <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
    {images.map((img, i) => (
      <button
        key={img.id || `thumb-${i}`}
        onClick={(e) => { e.stopPropagation(); onSelect(i); }}
        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
          i === currentIndex ? 'border-yellow-500 scale-110' : 'border-white/30 hover:border-white/60'
        }`}
      >
        <img src={img.preview} alt="" className="w-full h-full object-cover" />
      </button>
    ))}
  </div>
);