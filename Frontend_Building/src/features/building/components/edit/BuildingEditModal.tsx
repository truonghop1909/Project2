// src/features/building/components/modal/BuildingEditModal.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Building2, Home, MapPin, Wallet, User, FileText, Calendar, Car, Bike, Zap, Droplet, Award, TrendingUp, Star, Ruler, Layers, Clock, Key, ClipboardList, Navigation, DollarSign, Save } from "lucide-react";
import { buildingApi, imageApi } from "../../api";
import { BuildingDetail } from "../../types/building.type";
import { useBuildingImages } from "../../hooks/useBuildingImages";
import { useProvinces, useWardsByProvince } from "../../hooks/useAddress";
import {
  formatArea,
  formatDirection,
  formatLevel,
  getDisplayAddress,
  formatPhoneNumber
} from "../../utils/building.utils";
import { BuildingEditHeader } from "../edit/BuildingEditHeader";
import { BuildingEditThumbnail } from "../edit/BuildingEditThumbnail";
import { BuildingEditInfoSection } from "../edit/BuildingEditInfoSection";
import { BuildingEditSkeleton } from "../edit/BuildingEditSkeleton";
import { BuildingEditError } from "../edit/BuildingEditError";
import { BuildingMiniMap } from "../detail/BuildingMiniMap";
import { BuildingEditImageGallery } from "../edit/BuildingEditImageGallery";

interface BuildingEditModalProps {
  buildingId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BuildingEditModal({ buildingId, onClose, onSuccess }: BuildingEditModalProps) {
  const [form, setForm] = useState<BuildingDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalSubImages, setOriginalSubImages] = useState<any[]>([]);

  const {
    thumbnailFile,
    thumbnailPreview,
    subImages,
    loading: loadingImages,
    errors: imageErrors,
    handleThumbnailChange,
    handleAddSubImages,
    handleRemoveSubImage,
    handleUpdateSubImage,
    setExistingThumbnail,
    setSubImagesDirectly,
    cleanup
  } = useBuildingImages({ maxSubImages: 10, autoLoad: false });

  const { provinces } = useProvinces();
  const { wards, loading: loadingWards } = useWardsByProvince(
    form?.provinceId && form.provinceId !== "" ? Number(form.provinceId) : null
  );

  // Load data
  const loadData = useCallback(async () => {
    setIsLoadingData(true);
    setError(null);
    try {
      const buildingRes = await buildingApi.getById(buildingId);
      const b = buildingRes.data as BuildingDetail;
      setForm(b);

      if (b.thumbnail) {
        setExistingThumbnail(imageApi.getImageUrl(b.thumbnail));
      }

      const images = b.images || [];
      const existingSubImages = images.map((img: any, index: number) => ({
        id: img.id,
        preview: imageApi.getImageUrl(img.image),
        title: img.title || "",
        description: img.description || "",
        isNew: false,
      }));

      setSubImagesDirectly(existingSubImages);
      setOriginalSubImages(JSON.parse(JSON.stringify(existingSubImages)));

    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải thông tin tòa nhà");
    } finally {
      setIsLoadingData(false);
    }
  }, [buildingId, setExistingThumbnail, setSubImagesDirectly]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Prevent scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      cleanup();
    };
  }, [cleanup]);

  const handleFieldChange = (field: string, value: any) => {
    setForm(prev => prev ? { ...prev, [field]: value } : null);
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form?.name?.trim()) newErrors.name = "Tên tòa nhà không được để trống";
    if (!form?.provinceId) newErrors.provinceId = "Vui lòng chọn Tỉnh/Thành phố";
    if (!form?.wardCode) newErrors.wardCode = "Vui lòng chọn Xã/Phường";
    if (!form?.street?.trim()) newErrors.street = "Vui lòng nhập địa chỉ cụ thể";
    if (!form?.rentAreas?.length) newErrors.rentAreas = "Vui lòng nhập ít nhất một diện tích cho thuê";
    if (!form?.rentTypeCodes?.length) newErrors.rentTypeCodes = "Vui lòng chọn ít nhất một loại hình thuê";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !form) return;

    setLoading(true);
    try {
      // 1. Update basic info
      const fullAddress = [form.street, form.wardName, form.provinceName].filter(Boolean).join(", ");
      const payload = { ...form, address: fullAddress };
      (Object.keys(payload) as Array<keyof typeof payload>).forEach((key) => {
        if (payload[key] === undefined || payload[key] === null || payload[key] === "") {
          delete payload[key];
        }
      });
      await buildingApi.update(buildingId, payload);

      // 2. Upload thumbnail
      if (thumbnailFile) await imageApi.uploadMainImage(buildingId, thumbnailFile);

      // 3. Handle sub images
      const currentImages = subImages;
      const toDelete = originalSubImages.filter(old => !currentImages.some(newImg => newImg.id === old.id));
      const toUpdate = currentImages.filter(img => img.id);
      const toUpload = currentImages.filter(img => img.isNew && img.file);

      for (const img of toDelete) if (img.id) await imageApi.deleteSubImage(img.id);
      for (const img of toUpdate) if (img.id) await imageApi.updateSubImage(img.id, { title: img.title, description: img.description });
      for (const img of toUpload) if (img.file) await imageApi.uploadSubImage(buildingId, img.file, img.title, img.description);

      onSuccess();
      onClose();
    } catch (err: any) {
      setErrors({ submit: err.response?.data?.message || "Có lỗi xảy ra khi cập nhật" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  // Loading state
  if (isLoadingData) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4">
            <div className="flex items-center gap-2"><Building2 size={20} /><h2 className="text-xl font-semibold">Sửa tòa nhà</h2></div>
          </div>
          <div className="p-6"><BuildingEditSkeleton /></div>
        </div>
      </div>,
      document.body
    );
  }

  if (error) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
          <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4 flex justify-between">
            <div className="flex items-center gap-2"><Building2 size={20} /><h2 className="text-xl font-semibold">Sửa tòa nhà</h2></div>
            <button onClick={handleClose} className="p-2 hover:bg-white/20 rounded-full"><X size={20} /></button>
          </div>
          <div className="p-6"><BuildingEditError error={error} onRetry={loadData} onClose={handleClose} /></div>
        </div>
      </div>,
      document.body
    );
  }

  if (!form) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4 flex justify-between z-10">
          <div className="flex items-center gap-2"><Building2 size={20} /><h2 className="text-xl font-semibold">Sửa tòa nhà</h2></div>
          <button onClick={handleClose} className="p-2 hover:bg-white/20 rounded-full"><X size={20} /></button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <BuildingEditHeader building={form} onFieldChange={handleFieldChange} errors={errors} />
          <BuildingEditThumbnail thumbnail={thumbnailPreview || form.thumbnail} name={form.name} onThumbnailChange={handleThumbnailChange} loading={loading} error={imageErrors.thumbnail} />
          <BuildingEditImageGallery 
  images={subImages} 
  loading={loading} 
  error={imageErrors.subImages} 
  onAddImages={handleAddSubImages} 
  onRemoveImage={handleRemoveSubImage} 
  onUpdateImage={handleUpdateSubImage} 
/>

          {/* Address */}
          <BuildingEditInfoSection title="Địa chỉ" icon={MapPin}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm text-gray-500">Tỉnh/Thành phố</label>
                <select value={form.provinceId || ""} onChange={(e) => handleFieldChange("provinceId", e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">-- Chọn --</option>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                </select>{errors.provinceId && <p className="text-xs text-red-500">{errors.provinceId}</p>}
              </div>
              <div><label className="text-sm text-gray-500">Xã/Phường</label>
                <select value={form.wardCode || ""} onChange={(e) => handleFieldChange("wardCode", e.target.value)} className="w-full px-3 py-2 border rounded-lg" disabled={!form.provinceId || loadingWards}>
                  <option value="">-- Chọn --</option>{wards.map(w => <option key={w.code} value={w.code}>{w.name}</option>)}
                </select>{errors.wardCode && <p className="text-xs text-red-500">{errors.wardCode}</p>}
              </div>
              <div className="md:col-span-2"><label className="text-sm text-gray-500">Đường/Số nhà</label>
                <input type="text" value={form.street || ""} onChange={(e) => handleFieldChange("street", e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                {errors.street && <p className="text-xs text-red-500">{errors.street}</p>}
              </div>
              <div className="md:col-span-2"><label className="text-sm text-gray-500">Google Maps</label>
                <input type="text" value={form.googleMapLink || ""} onChange={(e) => handleFieldChange("googleMapLink", e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="https://maps.google.com/..." />
              </div>
              {form.googleMapLink && <div className="md:col-span-2"><BuildingMiniMap address={getDisplayAddress(form)} googleMapLink={form.googleMapLink} /></div>}
            </div>
          </BuildingEditInfoSection>

          {/* Area & Rent */}
          <BuildingEditInfoSection title="Diện tích & Loại hình thuê" icon={Home}>
            <div className="space-y-4">
              <div><label className="text-sm text-gray-500">Diện tích cho thuê (m²)</label>
                <input type="text" value={form.rentAreas?.join(", ") || ""} onChange={(e) => handleFieldChange("rentAreas", e.target.value.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v)))} placeholder="VD: 100, 200, 300" className="w-full px-3 py-2 border rounded-lg" />
                {errors.rentAreas && <p className="text-xs text-red-500">{errors.rentAreas}</p>}
              </div>
              <div><label className="text-sm text-gray-500">Loại hình thuê</label>
                <input type="text" value={form.rentTypeCodes?.join(", ") || ""} onChange={(e) => handleFieldChange("rentTypeCodes", e.target.value.split(",").map(v => v.trim().toUpperCase()).filter(v => v))} placeholder="VD: OFFICE, RETAIL" className="w-full px-3 py-2 border rounded-lg" />
                {errors.rentTypeCodes && <p className="text-xs text-red-500">{errors.rentTypeCodes}</p>}
              </div>
            </div>
          </BuildingEditInfoSection>

          {/* Basic Info */}
          <BuildingEditInfoSection title="Thông tin cơ bản" icon={Home} fields={[
            { label: "Kết cấu", value: form.structure || "—", onChange: (v: string) => handleFieldChange("structure", v) },
            { label: "Hướng", value: formatDirection(form.direction), onChange: (v: string) => handleFieldChange("direction", v) },
            { label: "Hạng", value: formatLevel(form.level), onChange: (v: string) => handleFieldChange("level", v) },
            { label: "Số tầng hầm", value: form.numberOfBasement?.toString() || "0", onChange: (v: string) => handleFieldChange("numberOfBasement", parseInt(v) || 0) },
            { label: "Diện tích sàn", value: formatArea(form.floorArea), onChange: (v: string) => handleFieldChange("floorArea", parseFloat(v) || 0) },
          ]} />

          {/* Cost */}
          <BuildingEditInfoSection title="Chi phí" icon={Wallet} fields={[
            { label: "Mô tả giá", value: form.rentPriceDescription || "—", onChange: (v: string) => handleFieldChange("rentPriceDescription", v) },
            { label: "Phí dịch vụ", value: formatPrice(form.serviceFee), onChange: (v: string) => handleFieldChange("serviceFee", parseFloat(v) || 0) },
            { label: "Phí ô tô", value: formatPrice(form.carFee), onChange: (v: string) => handleFieldChange("carFee", parseFloat(v) || 0) },
            { label: "Phí xe máy", value: formatPrice(form.motorFee), onChange: (v: string) => handleFieldChange("motorFee", parseFloat(v) || 0) },
            { label: "Phí ngoài giờ", value: formatPrice(form.overtimeFee), onChange: (v: string) => handleFieldChange("overtimeFee", parseFloat(v) || 0) },
            { label: "Tiền điện", value: form.electricityFee || "—", onChange: (v: string) => handleFieldChange("electricityFee", v) },
            { label: "Tiền nước", value: form.waterFee || "—", onChange: (v: string) => handleFieldChange("waterFee", v) },
            { label: "Hoa hồng", value: form.brokerageFee ? `${form.brokerageFee}%` : "—", onChange: (v: string) => handleFieldChange("brokerageFee", parseFloat(v) || 0) },
          ]} />

          {/* Contract */}
          <BuildingEditInfoSection title="Thông tin hợp đồng" icon={FileText} fields={[
            { label: "Đặt cọc", value: form.deposit || "—", onChange: (v: string) => handleFieldChange("deposit", v) },
            { label: "Thanh toán", value: form.payment || "—", onChange: (v: string) => handleFieldChange("payment", v) },
            { label: "Thời hạn thuê", value: form.rentTime || "—", onChange: (v: string) => handleFieldChange("rentTime", v) },
            { label: "Trang trí", value: form.decorationTime || "—", onChange: (v: string) => handleFieldChange("decorationTime", v) },
          ]} />

          {/* Management */}
          <BuildingEditInfoSection title="Thông tin quản lý" icon={User} fields={[
            { label: "Tên quản lý", value: form.managerName || "—", onChange: (v: string) => handleFieldChange("managerName", v) },
            { label: "SĐT quản lý", value: formatPhoneNumber(form.managerPhone), onChange: (v: string) => handleFieldChange("managerPhone", v) },
          ]} />

          {/* Note */}
          <BuildingEditInfoSection title="Ghi chú" icon={ClipboardList}>
            <textarea value={form.note || ""} onChange={(e) => handleFieldChange("note", e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg" placeholder="Nhập ghi chú..." />
          </BuildingEditInfoSection>

          {errors.submit && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{errors.submit}</div>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={handleClose} disabled={loading} className="px-6 py-2.5 border rounded-lg hover:bg-gray-50">Hủy bỏ</button>
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg flex items-center gap-2">
              {loading ? <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>Đang lưu...</> : <><Save size={18} />Cập nhật</>}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Helper functions
const formatPrice = (price?: number) => price ? `${price.toLocaleString()} ₫` : "—";
const ParkingIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>;
const DropletIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>;