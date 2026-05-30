"use client";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Building2 } from "lucide-react";
import { useBuildingDetail } from "../../hooks/useBuildingDetail";
import { BuildingDetailContent } from "./BuildingDetailContent";
import { ModalActions } from "@/components/common";

interface BuildingDetailModalProps {
  buildingId: number;
  onClose: () => void;
}

export default function BuildingDetailModal({ buildingId, onClose }: BuildingDetailModalProps) {
  const { building, loading, error, refetch } = useBuildingDetail(buildingId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => onClose(), [onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-gray-600" />
            <h2 className="text-xl font-semibold">Chi tiết tòa nhà</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6">
          <BuildingDetailContent building={building} loading={loading} error={error} onRetry={refetch} />
          <ModalActions onClose={handleClose} />
        </div>
      </div>
    </div>,
    document.body
  );
}