export const BACKEND_URL = "http://localhost:8083";
export const FALLBACK_IMAGE = "https://placehold.co/800x500?text=No+Image";

export const RENT_TYPE_MAP: Record<string, string> = {
  OFFICE: "Văn phòng",
  RETAIL: "Cửa hàng bán lẻ",
  WAREHOUSE: "Kho xưởng",
  COWORKING: "Coworking Space",
  SERVICE: "Dịch vụ",
};

export const DIRECTION_MAP: Record<string, string> = {
  EAST: "Đông",
  WEST: "Tây",
  SOUTH: "Nam",
  NORTH: "Bắc",
  SOUTHEAST: "Đông Nam",
  SOUTHWEST: "Tây Nam",
  NORTHEAST: "Đông Bắc",
  NORTHWEST: "Tây Bắc",
};

export const LEVEL_MAP: Record<string, string> = {
  A: "Hạng A - Cao cấp",
  B: "Hạng B - Trung cấp",
  C: "Hạng C - Phổ thông",
};