import { MapPin } from "lucide-react";
import { Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";
import { getDisplayAddress } from "../../utils/building.utils";
import { BuildingMiniMap } from "../detail/BuildingMiniMap";

interface BuildingEditAddressProps {
  form: BuildingDetail;
  errors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
  provinces: any[];
  wards: any[];
  loadingWards: boolean;
  onProvinceChange: (value: string) => void;
  onWardChange: (value: string) => void;
}

export function BuildingEditAddress({
  form,
  errors,
  onFieldChange,
  provinces,
  wards,
  loadingWards,
  onProvinceChange,
  onWardChange,
}: BuildingEditAddressProps) {
  return (
    <Section title="Địa chỉ" icon={MapPin}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500">Tỉnh/Thành phố</label>
          <select
            value={form.provinceId || ""}
            onChange={(e) => onProvinceChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">-- Chọn --</option>
            {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
          </select>
          {errors.provinceId && <p className="text-xs text-red-500">{errors.provinceId}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-500">Xã/Phường</label>
          <select
            value={form.wardCode || ""}
            onChange={(e) => onWardChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            disabled={!form.provinceId || loadingWards}
          >
            <option value="">-- Chọn --</option>
            {wards.map(w => <option key={w.code} value={w.code}>{w.name}</option>)}
          </select>
          {errors.wardCode && <p className="text-xs text-red-500">{errors.wardCode}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-500">Đường/Số nhà</label>
          <input
            type="text"
            value={form.street || ""}
            onChange={(e) => onFieldChange("street", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.street && <p className="text-xs text-red-500">{errors.street}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-500">Google Maps</label>
          <input
            type="text"
            value={form.googleMapLink || ""}
            onChange={(e) => onFieldChange("googleMapLink", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://maps.google.com/..."
          />
        </div>
        {form.googleMapLink && (
          <div className="md:col-span-2">
            <BuildingMiniMap address={getDisplayAddress(form)} googleMapLink={form.googleMapLink} />
          </div>
        )}
      </div>
    </Section>
  );
}