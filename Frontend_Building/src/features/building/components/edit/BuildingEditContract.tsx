import { FileText } from "lucide-react";
import { Input, Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";

interface BuildingEditContractProps {
  form: BuildingDetail;
  onFieldChange: (field: string, value: any) => void;
}

export function BuildingEditContract({ form, onFieldChange }: BuildingEditContractProps) {
  return (
    <Section title="Thông tin hợp đồng" icon={FileText}>
      <Input
        label="Đặt cọc"
        name="deposit"
        value={form.deposit || ""}
        onChange={(e) => onFieldChange("deposit", e.target.value)}
      />
      <Input
        label="Thanh toán"
        name="payment"
        value={form.payment || ""}
        onChange={(e) => onFieldChange("payment", e.target.value)}
      />
      <Input
        label="Thời hạn thuê"
        name="rentTime"
        value={form.rentTime || ""}
        onChange={(e) => onFieldChange("rentTime", e.target.value)}
      />
      <Input
        label="Thời gian trang trí"
        name="decorationTime"
        value={form.decorationTime || ""}
        onChange={(e) => onFieldChange("decorationTime", e.target.value)}
      />
    </Section>
  );
}