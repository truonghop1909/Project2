import { Wallet } from "lucide-react";
import { NumberField, Input, Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";

interface BuildingEditCostProps {
  form: BuildingDetail;
  onFieldChange: (field: string, value: any) => void;
}

const formatPrice = (price?: number) => (price ? `${price.toLocaleString()} ₫` : "—");

export function BuildingEditCost({ form, onFieldChange }: BuildingEditCostProps) {
  return (
    <Section title="Chi phí" icon={Wallet}>
      <NumberField
        label="Giá thuê"
        name="rentPrice"
        value={form.rentPrice}
        onChange={(e) => onFieldChange("rentPrice", parseFloat(e.target.value) || 0)}
        unit="VNĐ"
      />
      <Input
        label="Mô tả giá"
        name="rentPriceDescription"
        value={form.rentPriceDescription || ""}
        onChange={(e) => onFieldChange("rentPriceDescription", e.target.value)}
      />
      <NumberField
        label="Phí dịch vụ"
        name="serviceFee"
        value={form.serviceFee}
        onChange={(e) => onFieldChange("serviceFee", parseFloat(e.target.value) || 0)}
        unit="VNĐ"
      />
      <NumberField
        label="Phí ô tô"
        name="carFee"
        value={form.carFee}
        onChange={(e) => onFieldChange("carFee", parseFloat(e.target.value) || 0)}
        unit="VNĐ"
      />
      <NumberField
        label="Phí xe máy"
        name="motorFee"
        value={form.motorFee}
        onChange={(e) => onFieldChange("motorFee", parseFloat(e.target.value) || 0)}
        unit="VNĐ"
      />
      <NumberField
        label="Phí ngoài giờ"
        name="overtimeFee"
        value={form.overtimeFee}
        onChange={(e) => onFieldChange("overtimeFee", parseFloat(e.target.value) || 0)}
        unit="VNĐ"
      />
      <NumberField
        label="Tiền điện"
        name="electricityFee"
        value={form.electricityFee}
        onChange={(e) => onFieldChange("electricityFee", e.target.value)}
        unit="₫/kWh"
      />
      <NumberField
        label="Tiền nước"
        name="waterFee"
        value={form.waterFee}
        onChange={(e) => onFieldChange("waterFee", e.target.value)}
        unit="₫/m³"
      />
      <NumberField
        label="Hoa hồng"
        name="brokerageFee"
        value={form.brokerageFee}
        onChange={(e) => onFieldChange("brokerageFee", parseFloat(e.target.value) || 0)}
        unit="%"
      />
    </Section>
  );
}