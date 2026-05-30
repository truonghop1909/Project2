import React from 'react';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, icon: Icon, className = '' }) => {
  return (
    <div className={`flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm hover:border-gray-200 transition-all duration-200 ${className}`}>
      {Icon && (
        <div className="flex-shrink-0 mt-0.5">
          <Icon size={16} className="text-blue-500" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 font-medium break-words">{value || '—'}</p>
      </div>
    </div>
  );
};