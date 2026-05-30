'use client';

interface ModalActionsProps {
  onClose: () => void;
  closeText?: string;
}

export const ModalActions: React.FC<ModalActionsProps> = ({ onClose, closeText = 'Đóng' }) => {
  return (
    <div className="flex justify-end pt-6 border-t border-gray-200">
      <button
        onClick={onClose}
        className="px-6 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition font-medium shadow-sm"
      >
        {closeText}
      </button>
    </div>
  );
};