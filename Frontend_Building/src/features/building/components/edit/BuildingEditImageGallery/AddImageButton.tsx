import { Plus } from "lucide-react";

interface AddImageButtonProps {
  onAddImages: (files: File[]) => void;
  loading?: boolean;
}

export function AddImageButton({ onAddImages, loading }: AddImageButtonProps) {
  return (
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
}