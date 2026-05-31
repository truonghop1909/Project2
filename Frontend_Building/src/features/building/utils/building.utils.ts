import { BACKEND_URL, FALLBACK_IMAGE, RENT_TYPE_MAP, DIRECTION_MAP, LEVEL_MAP } from "../../constants/building.constants";
import { BuildingDetail } from "../types/building.type";

export { FALLBACK_IMAGE };

export const getImageUrl = (path?: string): string => {
  if (!path) return FALLBACK_IMAGE;

  // Loại bỏ prefix /uploads/ nếu có, sau đó kiểm tra nếu phần còn lại là URL
  let cleanPath = path;
  if (cleanPath.startsWith('/uploads/')) {
    cleanPath = cleanPath.substring(9); // bỏ '/uploads/'
  }

  // Nếu sau khi loại bỏ, nó bắt đầu bằng http:// hoặc https:// -> trả về nguyên bản
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }

  // Nếu vẫn là relative path (bắt đầu bằng /) -> ghép BACKEND_URL
  if (cleanPath.startsWith('/')) {
    return `${BACKEND_URL}${cleanPath}`;
  }

  // Fallback: nếu không bắt đầu bằng /, coi là tên file và ghép /uploads/
  return `${BACKEND_URL}/uploads/${cleanPath}`;
};

export const formatPrice = (price?: number): string => {
  if (!price && price !== 0) return "—";
  return `${price.toLocaleString()} ₫`;
};

export const formatArea = (area?: number): string => {
  if (!area && area !== 0) return "—";
  return `${area.toLocaleString()} m²`;
};

export const formatAreas = (areas?: number[]): string => {
  if (!areas || areas.length === 0) return "—";
  return areas.map(area => formatArea(area)).join(", ");
};

export const formatRentTypes = (types?: string[]): string => {
  if (!types || types.length === 0) return "—";
  return types.map(type => RENT_TYPE_MAP[type] || type).join(", ");
};

export const formatDirection = (direction?: string): string => {
  if (!direction) return "—";
  return DIRECTION_MAP[direction] || direction;
};

export const formatLevel = (level?: string): string => {
  if (!level) return "—";
  return LEVEL_MAP[level] || level;
};

export const getDisplayAddress = (building: BuildingDetail): string => {
  if (building.address) return building.address;
  const parts = [building.street, building.wardName, building.provinceName].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
};

export const formatPhoneNumber = (phone?: string): string => {
  if (!phone) return "—";
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
};

export const formatUtilityPrice = (price?: number | string, unit?: string): string => {
  if (!price && price !== 0) return "—";
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return "—";
  return `${numPrice.toLocaleString()} ${unit || ""}`;
};