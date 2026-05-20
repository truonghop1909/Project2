// components/building/BuildingImageManager.tsx
import { useState } from "react";
import { Upload, X, Edit2, Trash2, AlertCircle } from "lucide-react";
import { imageApi } from "../../api/image.api";
interface SubImage {
  id: number;
  image: string;        // ← Backend dùng "image"
  title: string;
  description: string;
  displayOrder?: number;
}

interface Props {
  buildingId: number;
  images: SubImage[];
  onImagesChange: () => void;
}

export default function BuildingImageManager({ buildingId, images, onImagesChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [editingImage, setEditingImage] = useState<SubImage | null>(null);
  const [error, setError] = useState<string>("");

  // Upload ảnh phụ
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra số lượng ảnh (backend chỉ cho tối đa 3)
    if (images.length >= 3) {
      setError("Chỉ được phép tối đa 3 ảnh phụ");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setUploading(true);
    setError("");
    
    try {
      await imageApi.uploadSubImage(buildingId, file, "", "");
      onImagesChange();
    } catch (err: any) {
      console.error("Upload error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Upload ảnh thất bại");
      }
      setTimeout(() => setError(""), 3000);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  // Xóa ảnh
  const handleDelete = async (imageId: number) => {
    if (confirm("Bạn có chắc muốn xóa ảnh này?")) {
      try {
        await imageApi.deleteSubImage(imageId);
        onImagesChange();
      } catch (error) {
        console.error("Delete error:", error);
        setError("Xóa ảnh thất bại");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // Cập nhật thông tin ảnh (title, description)
  const handleUpdate = async (imageId: number, data: { title: string; description: string }) => {
    try {
      await imageApi.updateSubImage(imageId, data);
      setEditingImage(null);
      onImagesChange();
    } catch (error) {
      console.error("Update error:", error);
      setError("Cập nhật thất bại");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Đổi thứ tự ảnh
  const handleMoveOrder = async (imageId: number, currentIndex: number, direction: "up" | "down") => {
    const newOrder = direction === "up" ? currentIndex : currentIndex + 2;
    try {
      await imageApi.updateImageOrder(imageId, newOrder);
      onImagesChange();
    } catch (error) {
      console.error("Move error:", error);
      setError("Đổi thứ tự thất bại");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Ảnh phụ của tòa nhà</h3>
          <p className="text-sm text-gray-500">Tối đa 3 ảnh ({images.length}/3)</p>
        </div>
        <label className={`cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${(images.length >= 3 || uploading) ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Upload size={18} className="inline mr-2" />
          {uploading ? "Đang upload..." : "Thêm ảnh"}
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleUpload}
            disabled={uploading || images.length >= 3}
          />
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {uploading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Đang tải ảnh lên...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="relative group border rounded-lg overflow-hidden bg-white shadow-sm">
            <img
              src={imageApi.getImageUrl(image.image)}
              alt={image.title || `Ảnh ${index + 1}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.png";
              }}
            />
            
            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => setEditingImage(image)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Order controls */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {index > 0 && (
                <button
                  onClick={() => handleMoveOrder(image.id, index, "up")}
                  className="p-1 bg-white rounded shadow hover:bg-gray-100 text-sm font-bold"
                >
                  ↑
                </button>
              )}
              {index < images.length - 1 && (
                <button
                  onClick={() => handleMoveOrder(image.id, index, "down")}
                  className="p-1 bg-white rounded shadow hover:bg-gray-100 text-sm font-bold"
                >
                  ↓
                </button>
              )}
            </div>

            {/* Info */}
            <div className="p-2">
              <p className="text-sm font-medium truncate">
                {image.title || `Ảnh ${image.displayOrder || index + 1}`}
              </p>
              {image.description && (
                <p className="text-xs text-gray-500 truncate">{image.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !uploading && (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-2">
            <Upload size={48} className="mx-auto" />
          </div>
          <p className="text-gray-500">Chưa có ảnh phụ nào</p>
          <p className="text-sm text-gray-400">Click "Thêm ảnh" để tải lên (tối đa 3 ảnh)</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chỉnh sửa thông tin ảnh</h3>
              <button
                onClick={() => setEditingImage(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Tiêu đề"
              defaultValue={editingImage.title}
              className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
            />
            
            <textarea
              placeholder="Mô tả"
              defaultValue={editingImage.description}
              className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
            />
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingImage(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleUpdate(editingImage.id, {
                  title: editingImage.title,
                  description: editingImage.description
                })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}