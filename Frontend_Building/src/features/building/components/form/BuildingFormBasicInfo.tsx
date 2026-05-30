import { Input, Section, Select } from "@/components/ui";
import { Home, Layers, TrendingUp, Star } from "lucide-react";

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

export function BuildingFormBasicInfo({ form, errors, onChange }: any) {
  return (
    <Section title="Thông tin cơ bản">
      <Input label="Tên tòa nhà" name="name" value={form.name || ''} onChange={onChange} required icon={Home} error={errors.name} />
      <Input label="Kết cấu" name="structure" value={form.structure || ''} onChange={onChange} placeholder="VD: Bê tông cốt thép" icon={Layers} />
      <Select label="Hướng" name="direction" value={form.direction || ''} options={directionOptions} onChange={onChange} icon={TrendingUp} />
      <Select label="Hạng" name="level" value={form.level || ''} options={levelOptions} onChange={onChange} icon={Star} />
    </Section>
  );
}