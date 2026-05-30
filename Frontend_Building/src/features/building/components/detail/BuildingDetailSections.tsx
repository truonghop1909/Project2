import { Home, MapPin, Wallet, FileText, User } from "lucide-react";
import { BuildingDetail } from "../../types/building.type";
import {
  formatArea,
  formatAreas,
  formatPrice,
  formatRentTypes,
  formatDirection,
  formatLevel,
  getDisplayAddress,
  formatPhoneNumber
} from "../../utils/building.utils";
import { BuildingMiniMap } from "./BuildingMiniMap";

export const getBuildingSections = (building: BuildingDetail) => {
  const formatRentAreas = (rentAreas?: number[]) =>
    rentAreas?.length ? rentAreas.map(a => a.toLocaleString()).join(', ') + ' m²' : '—';

  return [
    {
      title: "Thông tin cơ bản",
      icon: Home,
      fields: [
        { label: "Tên tòa nhà", value: building.name },
        { label: "Kết cấu", value: building.structure || "—" },
        { label: "Hướng", value: formatDirection(building.direction) },
        { label: "Hạng", value: formatLevel(building.level) },
        { label: "Số tầng hầm", value: building.numberOfBasement?.toLocaleString() || "0" },
        { label: "Diện tích sàn", value: formatArea(building.floorArea) },
      ]
    },
    {
      title: "Địa chỉ",
      icon: MapPin,
      fields: [
        { label: "Địa chỉ", value: getDisplayAddress(building), fullWidth: true },
        ...(building.googleMapLink ? [{
          label: "Bản đồ vị trí",
          value: <BuildingMiniMap address={getDisplayAddress(building)} googleMapLink={building.googleMapLink} />,
          fullWidth: true
        }] : [])
      ]
    },
    {
      title: "Diện tích & Loại hình thuê",
      icon: Home,
      fields: [
        { label: "Diện tích cho thuê", value: formatRentAreas(building.rentAreas) },
        { label: "Loại hình thuê", value: formatRentTypes(building.rentTypeCodes) },
      ]
    },
    {
      title: "Chi phí",
      icon: Wallet,
      fields: [
        { label: "Giá thuê", value: formatPrice(building.rentPrice) },
        { label: "Mô tả giá", value: building.rentPriceDescription || "—" },
        { label: "Phí dịch vụ", value: formatPrice(building.serviceFee) },
        { label: "Phí ô tô", value: formatPrice(building.carFee) },
        { label: "Phí xe máy", value: formatPrice(building.motorFee) },
        { label: "Phí ngoài giờ", value: formatPrice(building.overtimeFee) },
        { label: "Tiền điện", value: building.electricityFee ? `${building.electricityFee} ₫/kWh` : "—" },
        { label: "Tiền nước", value: building.waterFee ? `${building.waterFee} ₫/m³` : "—" },
        { label: "Hoa hồng", value: building.brokerageFee ? `${building.brokerageFee}%` : "—" },
      ]
    },
    {
      title: "Thông tin hợp đồng",
      icon: FileText,
      fields: [
        { label: "Đặt cọc", value: building.deposit || "—" },
        { label: "Thanh toán", value: building.payment || "—" },
        { label: "Thời hạn thuê", value: building.rentTime || "—" },
        { label: "Thời gian trang trí", value: building.decorationTime || "—" },
      ]
    },
    {
      title: "Thông tin quản lý",
      icon: User,
      fields: [
        { label: "Tên quản lý", value: building.managerName || "—" },
        { label: "Số điện thoại", value: formatPhoneNumber(building.managerPhone) },
      ]
    },
  ];
};