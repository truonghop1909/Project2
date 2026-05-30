import { Input, Select, Section } from "@/components/ui";
import { Navigation, Map } from "lucide-react";
import { Province, Ward } from "../../types/address.type";

interface BuildingFormAddressProps {
  form: any;
  errors: any;
  onChange: (e: any) => void;
  provinces: Province[];
  wards: Ward[];
  loadingWards: boolean;
  onProvinceChange: (value: string) => void;
  onWardChange: (value: string) => void;
}

export function BuildingFormAddress({
  form, errors, onChange, provinces, wards, loadingWards, onProvinceChange, onWardChange
}: BuildingFormAddressProps) {
  const provinceOptions = provinces.map(p => ({ value: String(p.code), label: p.name }));
  const wardOptions = wards.map(w => ({ value: String(w.code), label: w.name }));

  return (
    <Section title="Địa chỉ">
      <Input
        label="Số nhà / Tên đường"
        name="street"
        value={form.street || ''}
        onChange={onChange}
        required
        icon={Navigation}
        error={errors.street}
      />
      <Select
        label="Tỉnh / Thành phố"
        name="provinceId"
        value={form.provinceId || ''}
        options={[{ value: "", label: "-- Chọn Tỉnh/Thành phố --" }, ...provinceOptions]}
        onChange={(e) => onProvinceChange(e.target.value)}
        required
        icon={Map}
        error={errors.provinceId}
      />
      <Select
        label="Xã / Phường"
        name="wardCode"
        value={form.wardCode || ''}
        options={[{ value: "", label: "-- Chọn Xã/Phường --" }, ...wardOptions]}
        onChange={(e) => onWardChange(e.target.value)}
        disabled={loadingWards || !form.provinceId}
        required
        icon={Map}
        error={errors.wardCode}
      />
      <Input
        label="Google Map Link"
        name="googleMapLink"
        value={form.googleMapLink || ''}
        onChange={onChange}
        placeholder="https://maps.google.com/..."
        icon={Map}
      />
    </Section>
  );
}