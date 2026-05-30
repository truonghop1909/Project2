import { Home } from "lucide-react";
import { Input, NumberField, Select, Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";
import { formatArea, formatDirection, formatLevel } from "../../utils/building.utils";

interface BuildingEditBasicInfoProps {
  form: BuildingDetail;
  errors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

const directionOptions = [
  { value: "", label: "-- Chọn hướng --" },
  { value: "EAST", label: "Đông" },
  { value: "WEST", label: "Tây" },
  { value: "SOUTH", label: "Nam" },
  { value: "NORTH", label: "Bắc" },
  { value: "SOUTHEAST", label: "Đông Nam" },
  { value: "SOUTHWEST", label: "Tây Nam" },
  { value: "NORTHEAST", label: "Đông Bắc" },
  { value: "NORTHWEST", label: "Tây Bắc" },
];

const levelOptions = [
  { value: "", label: "-- Chọn hạng --" },
  { value: "A", label: "Hạng A - Cao cấp" },
  { value: "B", label: "Hạng B - Trung cấp" },
  { value: "C", label: "Hạng C - Phổ thông" },
];

export function BuildingEditBasicInfo({ form, errors, onFieldChange }: BuildingEditBasicInfoProps) {
  return (
    <Section title="Thông tin cơ bản" icon={Home}>
      <Input
        label="Tên tòa nhà"
        name="name"
        value={form.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
        required
        error={errors.name}
      />
      <Input
        label="Kết cấu"
        name="structure"
        value={form.structure || ""}
        onChange={(e) => onFieldChange("structure", e.target.value)}
        placeholder="VD: Bê tông cốt thép"
      />
      <Select
        label="Hướng"
        name="direction"
        value={form.direction || ""}
        options={directionOptions}
        onChange={(e) => onFieldChange("direction", e.target.value)}
      />
      <Select
        label="Hạng"
        name="level"
        value={form.level || ""}
        options={levelOptions}
        onChange={(e) => onFieldChange("level", e.target.value)}
      />
      <NumberField
        label="Số tầng hầm"
        name="numberOfBasement"
        value={form.numberOfBasement}
        onChange={(e) => onFieldChange("numberOfBasement", parseInt(e.target.value) || 0)}
        min={0}
      />
      <NumberField
        label="Diện tích sàn"
        name="floorArea"
        value={form.floorArea}
        onChange={(e) => onFieldChange("floorArea", parseFloat(e.target.value) || 0)}
        unit="m²"
        required
      />
    </Section>
  );
}