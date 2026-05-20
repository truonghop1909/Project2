// types/building.type.ts
export interface SubImage {
  id?: number;           // ID của ảnh (từ backend, có thể undefined khi chưa lưu)
  image?: string;        // Đường dẫn ảnh từ backend (optional vì ảnh mới chưa có)
  file?: File;           // File ảnh (chỉ có khi là ảnh mới chưa upload)
  preview: string;       // URL preview (blob cho ảnh mới, hoặc URL từ server cho ảnh cũ)
  title: string;         // Tiêu đề ảnh (có thể là chuỗi rỗng)
  description: string;   // Mô tả ảnh (có thể là chuỗi rỗng)
  displayOrder?: number; // Thứ tự hiển thị
  isNew?: boolean;       // Đánh dấu là ảnh mới (chưa có trong database)
  buildingId?: number;   // ID của tòa nhà
}

export interface Building {
  id: number;
  name: string;
  street: string;           // Đường/Số nhà
  provinceId: string;       // Mã tỉnh
  provinceName?: string;    // Tên tỉnh
  wardCode: string;         // Mã phường/xã
  wardName?: string;        // Tên phường/xã
  floorArea: number;
  rentPrice: number;
  serviceFee: number;
  managerName: string;
  managerPhone: string;
  brokerageFee: number;
  thumbnail?: string;
  address?: string;         // Computed field: street, wardName, provinceName
}

export interface BuildingSearch {
  // ===== THÔNG TIN CƠ BẢN =====
  name?: string;
  street?: string;
  
  // ===== ĐỊA CHỈ MỚI (cho frontend) =====
  provinceId?: string;      // Mã tỉnh
  wardCode?: string;        // Mã phường/xã
  
  // ===== THÔNG SỐ KỸ THUẬT =====
  numberOfBasement?: number;
  floorAreaFrom?: number;
  floorAreaTo?: number;
  direction?: string;
  level?: string;
  rentPriceFrom?: number;
  rentPriceTo?: number;
  rentAreaFrom?: number;
  rentAreaTo?: number;
  
  // ===== LOẠI HÌNH THUÊ =====
  rentTypes?: string[];
  
  // ===== NHÂN VIÊN =====
  staffId?: number;
  
  // ===== PHÂN TRANG & SẮP XẾP =====
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface BuildingDetail {
  id: number;

  // ===== ĐỊA CHỈ =====
  street: string;
  provinceId: string;
  provinceName?: string;
  wardCode: string;
  wardName?: string;
  
  // ===== ĐỊA CHỈ CŨ (cho backward compatibility) =====
  districtId?: number;
  districtName?: string;
  ward?: string;
  address?: string;         // Computed full address

  // ===== THÔNG TIN CƠ BẢN =====
  name: string;
  structure?: string;
  direction?: string;
  level?: string;

  // ===== DIỆN TÍCH & GIÁ =====
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

  // ===== HÌNH ẢNH =====
  thumbnail?: string;
  googleMapLink?: string;
  images?: SubImage[];

  // ===== HỢP ĐỒNG =====
  deposit?: string;
  payment?: string;
  rentTime?: string;
  decorationTime?: string;

  // ===== QUẢN LÝ =====
  managerName?: string;
  managerPhone?: string;

  // ===== HOA HỒNG & GHI CHÚ =====
  brokerageFee?: number;
  note?: string;

  // ===== QUAN HỆ =====
  rentAreas?: number[];
  rentTypeCodes?: string[];
}

export interface UserDTO {
  id: number;
  fullname: string;
}

// DTO cho danh sách building (search results)
export interface BuildingSearchDTO {
  id: number;
  name: string;
  address: string;
  floorArea: number;
  rentPrice: number;
  serviceFee: number;
  managerName: string;
  managerPhone: string;
  brokerageFee: number;
  rentArea: string | null;
  thumbnail?: string;
}

// Enum cho loại hình thuê
export enum RentType {
  OFFICE = "OFFICE",
  RETAIL = "RETAIL",
  WAREHOUSE = "WAREHOUSE",
  COWORKING = "COWORKING",
  SERVICE = "SERVICE"
}

// Helper function để format địa chỉ đầy đủ
export const formatFullAddress = (building: BuildingDetail): string => {
  const parts = [
    building.street,
    building.wardName,
    building.provinceName
  ].filter(Boolean);
  return parts.join(", ");
};

// Helper để parse rentArea string thành number[]
export const parseRentArea = (rentArea: string | null): number[] => {
  if (!rentArea) return [];
  return rentArea.split(",").map(area => parseFloat(area.trim())).filter(area => !isNaN(area));
};

// Helper để format rentArea từ number[] thành string
export const formatRentArea = (rentAreas: number[]): string => {
  return rentAreas.join(", ");
};

// Helper lấy label cho rent type
export const getRentTypeLabel = (code: string): string => {
  const labels: Record<string, string> = {
    OFFICE: "Văn phòng",
    RETAIL: "Cửa hàng bán lẻ",
    WAREHOUSE: "Kho xưởng",
    COWORKING: "Coworking Space",
    SERVICE: "Dịch vụ"
  };
  return labels[code] || code;
};