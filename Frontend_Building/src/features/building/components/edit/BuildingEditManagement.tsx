import { User } from "lucide-react";
import { Input, Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";

interface BuildingEditManagementProps {
  form: BuildingDetail;
  onFieldChange: (field: string, value: any) => void;
}

export function BuildingEditManagement({ form, onFieldChange }: BuildingEditManagementProps) {
  return (
    <Section title="Thông tin quản lý" icon={User}>
      <Input
        label="Tên quản lý"
        name="managerName"
        value={form.managerName || ""}
        onChange={(e) => onFieldChange("managerName", e.target.value)}
      />
      <Input
        label="Số điện thoại"
        name="managerPhone"
        value={form.managerPhone || ""}
        onChange={(e) => onFieldChange("managerPhone", e.target.value)}
      />
    </Section>
  );
}