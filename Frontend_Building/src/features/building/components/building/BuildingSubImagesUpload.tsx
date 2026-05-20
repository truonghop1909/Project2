// components/building/BuildingSubImagesUpload.tsx
import { Upload, Trash2 } from "lucide-react";

export interface SubImageItem {
  id?: number;           // Cho phép number hoặc undefined
  file?: File;
  preview: string;
  title: string;
  description: string;
  isNew?: boolean;
  displayOrder?: number;
}

interface Props {
  images: SubImageItem[];
  onAddImages: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onUpdateImage: (index: number, field: 'title' | 'description', value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function BuildingSubImagesUpload({
  images,
  onAddImages,
  onRemoveImage,
  onUpdateImage,
  error,
  disabled
}: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onAddImages(files);
    }
    e.target.value = "";
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Ảnh con
        <span className="text-gray-400 text-xs font-normal ml-2">
          (tối đa 3 ảnh - {images.length}/3)
        </span>
      </label>

      {/* Upload button */}
      {images.length < 3 && (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Tải ảnh con</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  multiple
                  onChange={handleFileChange}
                  disabled={disabled}
                />
              </label>
              <p className="pl-1">hoặc kéo thả</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, JPEG, WEBP (tối đa 5MB mỗi ảnh)
            </p>
          </div>
        </div>
      )}

      {/* Danh sách ảnh */}
      {images.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-sm font-medium text-gray-700">Danh sách ảnh con sẽ upload:</p>
          {images.map((image, index) => (
            <div key={image.id} className="bg-white border rounded-lg p-3">
              <div className="flex gap-3">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    disabled={disabled}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    placeholder="Tiêu đề ảnh (không bắt buộc)"
                    value={image.title}
                    onChange={(e) => onUpdateImage(index, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={disabled}
                  />
                  <textarea
                    placeholder="Mô tả ảnh (không bắt buộc)"
                    value={image.description}
                    onChange={(e) => onUpdateImage(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}