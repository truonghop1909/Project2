"use client";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Building2, Save } from "lucide-react";
import { buildingApi, imageApi } from "../../api";
import { BuildingDetail } from "../../types/building.type";
import { useBuildingImages } from "../../hooks/useBuildingImages";
import { useProvinces, useWardsByProvince } from "../../hooks/useAddress";
import { BuildingEditHeader } from "./BuildingEditHeader";
import { BuildingEditThumbnail } from "./BuildingEditThumbnail";
import { BuildingEditImageGallery } from "./BuildingEditImageGallery";
import { BuildingEditForm } from "./BuildingEditForm";
import { BuildingEditSkeleton } from "./BuildingEditSkeleton";
import { BuildingEditError } from "./BuildingEditError";
import { useBuildingEditSubmit } from "./useBuildingEditSubmit";

interface BuildingEditModalProps {
  buildingId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BuildingEditModal({ buildingId, onClose, onSuccess }: BuildingEditModalProps) {
  const [form, setForm] = useState<BuildingDetail | null>(null);
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

  const loadData = useCallback(async () => {
    setIsLoadingData(true);
    setError(null);
    try {
      const buildingRes = await buildingApi.getById(buildingId);
      const b = buildingRes.data as BuildingDetail;
      setForm(b);
      if (b.thumbnail) setExistingThumbnail(imageApi.getImageUrl(b.thumbnail));
      const images = b.images || [];
      const existingSubImages = images.map((img: any) => ({
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      cleanup();
    };
  }, [cleanup]);

  const handleFieldChange = (field: string, value: any) => {
    setForm(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleProvinceChange = (provinceCode: string) => {
    if (!provinceCode) {
      setForm(prev => prev ? { ...prev, provinceId: "", provinceName: "", wardCode: "", wardName: "" } : null);
      return;
    }
    const selectedProvince = provinces.find(p => p.code === Number(provinceCode));
    setForm(prev => prev ? {
      ...prev,
      provinceId: provinceCode,
      provinceName: selectedProvince?.name || "",
      wardCode: "",
      wardName: "",
    } : null);
  };

  const handleWardChange = (wardCode: string) => {
    const selectedWard = wards.find(w => w.code === Number(wardCode));
    setForm(prev => prev ? {
      ...prev,
      wardCode,
      wardName: selectedWard?.name || "",
    } : null);
  };

  const { loading, errors: submitErrors, handleSubmit } = useBuildingEditSubmit(
    buildingId,
    form,
    thumbnailFile,
    subImages,
    originalSubImages,
    onSuccess,
    onClose
  );

  const handleClose = () => {
    cleanup();
    onClose();
  };

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
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4 flex justify-between z-10">
          <div className="flex items-center gap-2"><Building2 size={20} /><h2 className="text-xl font-semibold">Sửa tòa nhà</h2></div>
          <button onClick={handleClose} className="p-2 hover:bg-white/20 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6">
          <BuildingEditHeader building={form} onFieldChange={handleFieldChange} errors={submitErrors} />
          <BuildingEditThumbnail
            thumbnail={thumbnailPreview || form.thumbnail}
            name={form.name}
            onThumbnailChange={handleThumbnailChange}
            loading={loading}
            error={imageErrors.thumbnail}
          />
          <BuildingEditImageGallery
            images={subImages}
            loading={loadingImages}
            error={imageErrors.subImages}
            onAddImages={handleAddSubImages}
            onRemoveImage={handleRemoveSubImage}
            onUpdateImage={handleUpdateSubImage}
          />
          <BuildingEditForm
            form={form}
            errors={submitErrors}
            onFieldChange={handleFieldChange}
            provinces={provinces}
            wards={wards}
            loadingWards={loadingWards}
            onProvinceChange={handleProvinceChange}
            onWardChange={handleWardChange}
          />
          {submitErrors.submit && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{submitErrors.submit}</div>}
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