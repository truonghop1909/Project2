// types/building.type.ts
export interface SubImage {
  id?: number;
  image?: string;
  file?: File;
  preview: string;
  title: string;
  description: string;
  displayOrder?: number;
  isNew?: boolean;
  buildingId?: number;
}

export interface Building {
  id: number;
  name: string;
  street: string;
  provinceId: string;
  provinceName?: string;
  wardCode: string;
  wardName?: string;
  floorArea: number;
  rentPrice: number;
  serviceFee: number;
  managerName: string;
  managerPhone: string;
  brokerageFee: number;
  thumbnail?: string;
  address?: string;
}

/**
 * BuildingSearchDTO - KHỚP HOÀN TOÀN VỚI BACKEND
 */
export interface BuildingSearchDTO {
  id?: number;
  name?: string;
  address?: string;
  street?: string;
  provinceId?: string;
  provinceName?: string;
  wardCode?: string;
  wardName?: string;
  numberOfBasement?: number;
  floorArea?: number;
  direction?: string;
  level?: string;
  rentPrice?: number;
  serviceFee?: number;
  brokerageFee?: number;
  managerName?: string;
  managerPhone?: string;
  thumbnail?: string | null;
  floorAreaFrom?: number | null;
  floorAreaTo?: number | null;
  rentAreaFrom?: number | null;
  rentAreaTo?: number | null;
  rentPriceFrom?: number | null;
  rentPriceTo?: number | null;
  staffId?: number | null;
  rentTypes?: string[] | null;   // giữ lại vì backend trả về
  page?: number | null;
  size?: number | null;
  sortBy?: string | null;
  sortDirection?: string | null;
}

export interface BuildingDetail {
  id: number;
  street: string;
  provinceId: string;
  provinceName?: string;
  wardCode: string;
  wardName?: string;
  address?: string;
  name: string;
  structure?: string;
  direction?: string;
  level?: string;
  numberOfBasement?: number;
  floorArea?: number;
  rentPrice?: number;
  rentPriceDescription?: string;
  serviceFee?: number;
  carFee?: number;
  motorFee?: number;
  overtimeFee?: number;
  electricityFee?: string;
  waterFee?: string;
  thumbnail?: string;
  googleMapLink?: string;
  images?: SubImage[];
  deposit?: string;
  payment?: string;
  rentTime?: string;
  decorationTime?: string;
  managerName?: string;
  managerPhone?: string;
  brokerageFee?: number;
  note?: string;
  rentAreas?: number[];
  rentTypeCodes?: string[];      // giữ lại vì backend dùng để lưu
}

export interface UserDTO {
  id: number;
  fullname: string;
}

// Helper functions
export const formatFullAddress = (building: BuildingDetail): string => {
  const parts = [
    building.street,
    building.wardName,
    building.provinceName
  ].filter(Boolean);
  return parts.join(", ");
};

export const parseRentArea = (rentArea: string | null): number[] => {
  if (!rentArea) return [];
  return rentArea.split(",").map(area => parseFloat(area.trim())).filter(area => !isNaN(area));
};

export const formatRentArea = (rentAreas: number[]): string => {
  return rentAreas.join(", ");
};