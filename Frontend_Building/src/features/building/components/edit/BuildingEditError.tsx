// src/features/building/components/edit/BuildingEditError.tsx

import { AlertCircle } from "lucide-react";

interface BuildingEditErrorProps {
  error: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export const BuildingEditError: React.FC<BuildingEditErrorProps> = ({ 
  error, 
  onRetry, 
  onClose 
}) => {
  return (
    <div className="text-center py-16">
      <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
      <div className="text-red-500 text-lg mb-4">{error}</div>
      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thử lại
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Đóng
          </button>
        )}
      </div>
    </div>
  );
};