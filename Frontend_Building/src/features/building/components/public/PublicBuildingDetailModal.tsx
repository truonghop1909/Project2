// src/features/building/components/public/PublicBuildingDetailModal.tsx

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Building2, MapPin, DollarSign, Ruler, Phone, User, Car, Bike, Zap, Droplet, Clock, Calendar, Key, FileText, Award } from "lucide-react";
import { buildingApi, imageApi } from "../../api";
import { BuildingDetail } from "../../types/building.type";

interface PublicBuildingDetailModalProps {
  buildingId: number;
  onClose: () => void;
}

export const PublicBuildingDetailModal: React.FC<PublicBuildingDetailModalProps> = ({ buildingId, onClose }) => {
  const [building, setBuilding] = useState<BuildingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBuilding = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await buildingApi.getPublicBuildingById(buildingId);
        setBuilding(response.data);
      } catch (err) {
        setError("Không thể tải thông tin tòa nhà");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBuilding();
  }, [buildingId]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const formatPrice = (price?: number) => price ? `${price.toLocaleString()} ₫` : "—";
  const formatArea = (area?: number) => area ? `${area.toLocaleString()} m²` : "—";
  const getAddress = () => {
    const parts = [building?.street, building?.wardName, building?.provinceName].filter(Boolean);
    return parts.join(", ") || "—";
  };

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <Icon size={18} className="text-gray-400 mt-0.5" />
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-gray-800 font-medium">{value || "—"}</div>
      </div>
    </div>
  );

  if (loading) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Đang tải thông tin...</p>
        </div>
      </div>,
      document.body
    );
  }

  if (error || !building) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md text-center">
          <div className="text-red-500 text-lg mb-4">{error || "Không tìm thấy tòa nhà"}</div>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Đóng</button>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <Building2 size={24} />
            <h2 className="text-xl font-bold">Chi tiết tòa nhà</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Price */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{building.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span>{getAddress()}</span>
            </div>
            <div className="mt-3 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              <span className="text-2xl font-bold">{formatPrice(building.rentPrice)}</span>
              <span className="text-sm"> / tháng</span>
            </div>
          </div>

          {/* Thumbnail */}
          {building.thumbnail && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img 
                src={imageApi.getImageUrl(building.thumbnail)} 
                alt={building.name} 
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/800x400?text=No+Image";
                }}
              />
            </div>
          )}

          {/* Images Gallery */}
          {building.images && building.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Building2 size={20} className="text-blue-500" />
                Hình ảnh chi tiết
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {building.images.slice(0, 6).map((img, idx) => (
                  <div key={img.id || idx} className="rounded-lg overflow-hidden h-32">
                    <img 
                      src={imageApi.getImageUrl(img.image)} 
                      alt={img.title || `Ảnh ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Basic Info */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Building2 size={20} className="text-blue-500" />
            Thông tin cơ bản
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <InfoRow icon={Ruler} label="Diện tích sàn" value={formatArea(building.floorArea)} />
            <InfoRow icon={Building2} label="Kết cấu" value={building.structure || "—"} />
            <InfoRow icon={Car} label="Phí ô tô" value={formatPrice(building.carFee)} />
            <InfoRow icon={Bike} label="Phí xe máy" value={formatPrice(building.motorFee)} />
            <InfoRow icon={Clock} label="Phí ngoài giờ" value={formatPrice(building.overtimeFee)} />
            <InfoRow icon={Zap} label="Tiền điện" value={building.electricityFee || "—"} />
            <InfoRow icon={Droplet} label="Tiền nước" value={building.waterFee || "—"} />
            <InfoRow icon={Award} label="Hoa hồng" value={building.brokerageFee ? `${building.brokerageFee}%` : "—"} />
          </div>

          {/* Contract Info */}
          {(building.deposit || building.payment || building.rentTime) && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" />
                Thông tin hợp đồng
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <InfoRow icon={Key} label="Đặt cọc" value={building.deposit || "—"} />
                <InfoRow icon={Calendar} label="Thanh toán" value={building.payment || "—"} />
                <InfoRow icon={Calendar} label="Thời hạn thuê" value={building.rentTime || "—"} />
              </div>
            </>
          )}

          {/* Contact Info */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <User size={20} className="text-blue-500" />
            Thông tin liên hệ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <InfoRow icon={User} label="Người liên hệ" value={building.managerName || "—"} />
            <InfoRow icon={Phone} label="Số điện thoại" value={building.managerPhone || "—"} />
          </div>

          {/* Note */}
          {building.note && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Ghi chú</h3>
              <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
                {building.note}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => window.location.href = `tel:${building.managerPhone}`}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Liên hệ ngay
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};