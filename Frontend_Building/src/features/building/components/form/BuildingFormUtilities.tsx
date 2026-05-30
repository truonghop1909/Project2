import { NumberField, Section } from "@/components/ui";
import { Zap, Droplet } from "lucide-react";

export function BuildingFormUtilities({ form, onChange, errors }: any) {
  return (
    <Section title="Tiện ích">
      <NumberField label="Tiền điện" name="electricityFee" value={form.electricityFee} onChange={onChange} unit="₫/kWh" icon={Zap} error={errors.electricityFee} />
      <NumberField label="Tiền nước" name="waterFee" value={form.waterFee} onChange={onChange} unit="₫/m³" icon={Droplet} error={errors.waterFee} />
    </Section>
  );
}