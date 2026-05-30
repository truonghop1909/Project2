import { Input, Section } from "@/components/ui";
import { Key, Calendar, Clock } from "lucide-react";

export function BuildingFormContract({ form, onChange }: any) {
  return (
    <Section title="Thông tin hợp đồng">
      <Input label="Đặt cọc" name="deposit" value={form.deposit} onChange={onChange} placeholder="VD: 3 tháng" icon={Key} />
      <Input label="Thanh toán" name="payment" value={form.payment} onChange={onChange} placeholder="VD: Theo quý" icon={Calendar} />
      <Input label="Thời hạn thuê" name="rentTime" value={form.rentTime} onChange={onChange} placeholder="VD: 5 năm" icon={Calendar} />
      <Input label="Thời gian setup" name="decorationTime" value={form.decorationTime} onChange={onChange} placeholder="VD: 1 tháng" icon={Clock} />
    </Section>
  );
}