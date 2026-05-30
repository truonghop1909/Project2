import { useState } from "react";
import { buildingApi, imageApi } from "../../api";
import { BuildingDetail } from "../../types/building.type";
import { SubImageItem } from "../building/BuildingSubImagesUpload";

export function useBuildingEditSubmit(
  buildingId: number,
  form: BuildingDetail | null,
  thumbnailFile: File | null,
  subImages: SubImageItem[],
  originalSubImages: SubImageItem[],
  onSuccess: () => void,
  onClose: () => void
) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  return { loading, errors, handleSubmit };
}