import { useState } from "react";
import { BuildingDetail } from "../types/building.type";
import { buildingApi } from "../api/building.api";


export const useBuildingForm = (onSuccess: () => void, onClose: () => void) => {
  const [form, setForm] = useState<Partial<BuildingDetail>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFullAddress = (street: string, ward: string, province: string) => {
    return `${street}, ${ward}, ${province}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name?.trim()) newErrors.name = "Tên tòa nhà không được để trống";
    if (!form.provinceId) newErrors.provinceId = "Vui lòng chọn Tỉnh/Thành phố";
    if (!form.wardCode) newErrors.wardCode = "Vui lòng chọn Xã/Phường";
    if (!form.street?.trim()) newErrors.street = "Vui lòng nhập địa chỉ cụ thể";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProvinceChange = (provinces: any[]) => (provinceCode: string) => {
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

  const handleWardChange = (wards: any[]) => (wardCode: string) => {
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
      // Cần truyền provinces từ ngoài vào, hoặc xử lý khác
      return;
    }
    
    if (name === 'wardCode') {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? undefined : Number(value)) : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const fullAddress = getFullAddress(
        form.street || '',
        form.wardName || '',
        form.provinceName || ''
      );
      
      const payload: Partial<BuildingDetail> = {};
      Object.entries({ ...form, address: fullAddress }).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          payload[key as keyof BuildingDetail] = value as never;
        }
      });

      await buildingApi.create(payload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    errors,
    handleChange,
    handleSubmit,
    handleProvinceChange,
    handleWardChange,
    setForm
  };
};