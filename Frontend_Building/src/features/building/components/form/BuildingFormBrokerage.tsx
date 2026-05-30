import { NumberField, TextArea, Section } from "@/components/ui";
import { Award, ClipboardList } from "lucide-react";

export function BuildingFormBrokerage({ form, onChange, errors }: any) {
  return (
    <Section title="Hoa hồng & Thông tin khác">
      <NumberField label="Hoa hồng" name="brokerageFee" value={form.brokerageFee} onChange={onChange} unit="%" icon={Award} error={errors.brokerageFee} />
      <TextArea label="Ghi chú" name="note" value={form.note} onChange={onChange} rows={3} icon={ClipboardList} error={errors.note} />
    </Section>
  );
}