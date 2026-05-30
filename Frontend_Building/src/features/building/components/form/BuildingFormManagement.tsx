import { Input, Section } from "@/components/ui";
import { User, Phone } from "lucide-react";

export function BuildingFormManagement({ form, onChange }: any) {
  return (
    <Section title="Thông tin quản lý">
      <Input label="Tên quản lý" name="managerName" value={form.managerName} onChange={onChange} icon={User} />
      <Input label="Số điện thoại" name="managerPhone" value={form.managerPhone} onChange={onChange} icon={Phone} />
    </Section>
  );
}