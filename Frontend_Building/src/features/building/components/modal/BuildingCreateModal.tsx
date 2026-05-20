// components/building/BuildingCreateModal.tsx
"use client";

import { useState } from "react";
import { X, Building2, AlertCircle } from "lucide-react";
import { buildingApi } from "../../api/building.api";
import { useProvinces, useWardsByProvince } from "../../hooks/useAddress";
import { BuildingDetail } from "../../types/building.type";
import { BuildingAddressPreview } from "../building/BuildingAddressPreview";
import { BuildingForm } from "../form/BuildingForm";
import BuildingSubImagesUpload from "../building/BuildingSubImagesUpload";
import BuildingThumbnailUpload from "../building/BuildingThumbnailUpload";
import { useBuildingImages } from "../../hooks/useBuildingImages";
import { imageApi } from "../../api/image.api";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const getFullAddress = (street: string, wardName: string, provinceName: string) => {
  const parts = [];
  if (street) parts.push(street);
  if (wardName) parts.push(wardName);
  if (provinceName) parts.push(provinceName);
  return parts.join(", ");
};

export default function BuildingCreateModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState<Partial<BuildingDetail>>({
    rentAreas: [],
    rentTypeCodes: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // SỬA: useBuildingImages nhận object options với maxSubImages
  const {
    thumbnailFile,
    thumbnailPreview,
    subImages,
    errors: imageErrors,
    handleThumbnailChange,
    handleAddSubImages,
    handleRemoveSubImage,
    handleUpdateSubImage,
    cleanup
  } = useBuildingImages({ maxSubImages: 3 }); // ← SỬA: truyền object

  const { provinces } = useProvinces();
  const { wards, loading: loadingW } = useWardsByProvince(
    form.provinceId && form.provinceId !== '' ? Number(form.provinceId) : null
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name?.trim()) newErrors.name = "Tên tòa nhà không được để trống";
    if (!form.provinceId) newErrors.provinceId = "Vui lòng chọn Tỉnh/Thành phố";
    if (!form.wardCode) newErrors.wardCode = "Vui lòng chọn Xã/Phường";
    if (!form.street?.trim()) newErrors.street = "Vui lòng nhập địa chỉ cụ thể";

    // Validate rentAreas
    if (!form.rentAreas || form.rentAreas.length === 0) {
      newErrors.rentAreas = "Vui lòng nhập ít nhất một diện tích cho thuê";
    } else if (form.rentAreas.some(area => area <= 0)) {
      newErrors.rentAreas = "Diện tích cho thuê phải lớn hơn 0";
    }

    // Validate rentTypeCodes
    if (!form.rentTypeCodes || form.rentTypeCodes.length === 0) {
      newErrors.rentTypeCodes = "Vui lòng chọn ít nhất một loại hình thuê";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProvinceChange = (provinceCode: string) => {
    // Nếu chọn option trống, reset tất cả
    if (!provinceCode) {
      setForm(prev => ({
        ...prev,
        provinceId: '',
        provinceName: '',
        wardCode: '',
        wardName: '',
      }));
      setErrors(prev => ({ ...prev, provinceId: '', wardCode: '' }));
      return;
    }

    const selectedProvince = provinces.find(p => p.code === Number(provinceCode));
    setForm(prev => ({
      ...prev,
      provinceId: provinceCode,
      provinceName: selectedProvince?.name || '',
      wardCode: '',
      wardName: '',
    }));
    setErrors(prev => ({ ...prev, provinceId: '', wardCode: '' }));
  };

  const handleWardChange = (wardCode: string) => {
    // Nếu chọn option trống
    if (!wardCode) {
      setForm(prev => ({
        ...prev,
        wardCode: '',
        wardName: '',
      }));
      setErrors(prev => ({ ...prev, wardCode: '' }));
      return;
    }

    const selectedWard = wards.find(w => w.code === Number(wardCode));
    setForm(prev => ({
      ...prev,
      wardCode: wardCode,
      wardName: selectedWard?.name || '',
    }));
    setErrors(prev => ({ ...prev, wardCode: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (name === 'provinceId') {
      handleProvinceChange(value);
      return;
    }
    if (name === 'wardCode') {
      handleWardChange(value);
      return;
    }

    // Xử lý rentAreas (từ BuildingForm đã gửi number[])
    if (name === 'rentAreas') {
      setForm((prev) => ({
        ...prev,
        rentAreas: value as unknown as number[],
      }));
      if (errors.rentAreas) setErrors(prev => ({ ...prev, rentAreas: '' }));
      return;
    }

    // Xử lý rentTypeCodes (từ BuildingForm gửi string[])
    if (name === 'rentTypeCodes') {
      setForm((prev) => ({
        ...prev,
        rentTypeCodes: value as unknown as string[],
      }));
      if (errors.rentTypeCodes) setErrors(prev => ({ ...prev, rentTypeCodes: '' }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? undefined : Number(value)) : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // SỬA: Kiểm tra image.file và image.isNew trước khi upload
  const uploadSubImages = async (buildingId: number) => {
    for (const image of subImages) {
      // Chỉ upload ảnh mới có file và được đánh dấu isNew
      if (image.file && image.isNew) {
        await imageApi.uploadSubImage(buildingId, image.file, image.title, image.description);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const fullAddress = getFullAddress(form.street || '', form.wardName || '', form.provinceName || '');

      const payload: Partial<BuildingDetail> = {
        name: form.name,
        street: form.street,
        provinceId: form.provinceId,
        provinceName: form.provinceName,
        wardCode: form.wardCode,
        wardName: form.wardName,
        address: fullAddress,
        structure: form.structure,
        numberOfBasement: form.numberOfBasement,
        floorArea: form.floorArea,
        direction: form.direction,
        level: form.level,
        rentPrice: form.rentPrice,
        rentPriceDescription: form.rentPriceDescription,
        serviceFee: form.serviceFee,
        carFee: form.carFee,
        motorFee: form.motorFee,
        overtimeFee: form.overtimeFee,
        electricityFee: form.electricityFee,
        waterFee: form.waterFee,
        deposit: form.deposit,
        payment: form.payment,
        rentTime: form.rentTime,
        decorationTime: form.decorationTime,
        managerName: form.managerName,
        managerPhone: form.managerPhone,
        brokerageFee: form.brokerageFee,
        note: form.note,
        googleMapLink: form.googleMapLink,
        rentAreas: form.rentAreas,
        rentTypeCodes: form.rentTypeCodes,
      };

      // ✅ Loại bỏ các field undefined hoặc null
      Object.keys(payload).forEach(key => {
        const value = payload[key as keyof BuildingDetail];
        if (value === undefined || value === null || value === '') {
          delete payload[key as keyof BuildingDetail];
        }
      });

      // ✅ Loại bỏ các mảng rỗng (nếu không muốn gửi)
      if (payload.rentAreas && payload.rentAreas.length === 0) {
        delete payload.rentAreas;
      }
      if (payload.rentTypeCodes && payload.rentTypeCodes.length === 0) {
        delete payload.rentTypeCodes;
      }

      // Debug log (chỉ khi development)
      if (process.env.NODE_ENV === 'development') {
        console.log("=== SENDING PAYLOAD ===");
        console.log(JSON.stringify(payload, null, 2));
        console.log("=======================");
      }

      // ✅ Tạo building
      const createResponse = await buildingApi.create(payload);
      const buildingId = createResponse.data?.id;

      if (!buildingId) {
        throw new Error("Không thể lấy được ID của tòa nhà vừa tạo");
      }

      // ✅ Upload ảnh chính (thumbnail)
      if (thumbnailFile) {
        try {
          await imageApi.uploadMainImage(buildingId, thumbnailFile);
        } catch (uploadError) {
          console.error("Upload thumbnail thất bại:", uploadError);
          setErrors(prev => ({ ...prev, thumbnailWarning: "Upload ảnh đại diện thất bại, bạn có thể upload sau" }));
        }
      }

      // ✅ Upload ảnh con (sub images) - chỉ upload ảnh mới
      if (subImages.length > 0) {
        try {
          await uploadSubImages(buildingId);
        } catch (uploadError) {
          console.error("Upload ảnh con thất bại:", uploadError);
          setErrors(prev => ({ ...prev, subImagesWarning: "Một số ảnh con upload thất bại" }));
        }
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Lỗi khi tạo:", error);

      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.data?.errors) {
        const fieldErrors: Record<string, string> = {};
        error.response.data.errors.forEach((err: any) => {
          fieldErrors[err.field || err.name] = err.message || err.defaultMessage;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ submit: "Có lỗi xảy ra khi tạo tòa nhà. Vui lòng thử lại." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[900px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 size={24} />
            <div>
              <h3 className="text-xl font-bold">Thêm tòa nhà mới</h3>
              <p className="text-sm text-blue-100 mt-0.5">Điền đầy đủ thông tin bên dưới</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/20 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50">
          <BuildingThumbnailUpload
            thumbnailPreview={thumbnailPreview}
            onFileChange={handleThumbnailChange}
            error={imageErrors.thumbnail}
            disabled={loading}
          />

          <BuildingSubImagesUpload
            images={subImages}
            onAddImages={handleAddSubImages}
            onRemoveImage={handleRemoveSubImage}
            onUpdateImage={handleUpdateSubImage}
            error={imageErrors.subImages}
            disabled={loading}
          />

          <BuildingForm
            form={form}
            errors={errors}
            onChange={handleChange}
            provinces={provinces}
            wards={wards}
            loadingWards={loadingW}
            onProvinceChange={handleProvinceChange}
            onWardChange={handleWardChange}
          />

          <BuildingAddressPreview
            street={form.street}
            wardName={form.wardName}
            provinceName={form.provinceName}
          />

          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} className="text-red-600" />
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
          <button onClick={handleClose} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Đang xử lý...
              </div>
            ) : (
              "Thêm tòa nhà"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}