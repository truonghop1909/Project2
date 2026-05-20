// components/building/BuildingThumbnailUpload.tsx
import { Upload, Trash2 } from "lucide-react";

interface Props {
  thumbnailPreview: string;
  onFileChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export default function BuildingThumbnailUpload({ 
  thumbnailPreview, 
  onFileChange, 
  error, 
  disabled 
}: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const handleRemove = () => {
    onFileChange(null);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Ảnh đại diện (Ảnh chính)
        <span className="text-gray-400 text-xs font-normal ml-2">(không bắt buộc)</span>
      </label>
      
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
        <div className="space-y-1 text-center">
          {thumbnailPreview ? (
            <div className="relative inline-block">
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail preview" 
                className="h-32 w-auto object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                disabled={disabled}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Tải ảnh đại diện</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleFileChange}
                    disabled={disabled}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG, WEBP (tối đa 5MB)
              </p>
            </>
          )}
        </div>
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}