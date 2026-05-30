import { NumberField, Input, Section } from "@/components/ui";
import { Wallet, DollarSign, Car, Bike, Clock, ClipboardList } from "lucide-react";

export function BuildingFormCost({ form, onChange, errors }: any) {
  return (
    <Section title="Giá cả & Phí dịch vụ">
      <NumberField label="Giá thuê" name="rentPrice" value={form.rentPrice} onChange={onChange} unit="VNĐ" required icon={Wallet} error={errors.rentPrice} />
      <Input label="Mô tả giá" name="rentPriceDescription" value={form.rentPriceDescription} onChange={onChange} icon={ClipboardList} />
      <NumberField label="Phí dịch vụ" name="serviceFee" value={form.serviceFee} onChange={onChange} unit="VNĐ" icon={DollarSign} />
      <NumberField label="Phí ô tô" name="carFee" value={form.carFee} onChange={onChange} unit="VNĐ" icon={Car} />
      <NumberField label="Phí xe máy" name="motorFee" value={form.motorFee} onChange={onChange} unit="VNĐ" icon={Bike} />
      <NumberField label="Phí ngoài giờ" name="overtimeFee" value={form.overtimeFee} onChange={onChange} unit="VNĐ" icon={Clock} />
    </Section>
  );
}