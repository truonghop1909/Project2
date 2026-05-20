// src/features/building/components/shared/InfoCard.tsx

import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;