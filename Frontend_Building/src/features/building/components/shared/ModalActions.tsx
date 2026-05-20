import React from "react";

interface ModalActionsProps {
  onClose: () => void;
}

export const ModalActions: React.FC<ModalActionsProps> = ({ onClose }) => {
  return (
    <div className="flex justify-end pt-6 border-t border-gray-200">
      <button
        onClick={onClose}
        className="px-6 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
      >
        Đóng
      </button>
    </div>
  );
};

export default ModalActions;