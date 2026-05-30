import { Home } from "lucide-react";
import { Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";

interface BuildingEditAreaAndRentProps {
  form: BuildingDetail;
  errors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

export function BuildingEditAreaAndRent({ form, errors, onFieldChange }: BuildingEditAreaAndRentProps) {
  return (
    <Section title="Diện tích & Loại hình thuê" icon={Home}>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Diện tích cho thuê (m²)</label>
          <input
            type="text"
            value={form.rentAreas?.join(", ") || ""}
            onChange={(e) => onFieldChange("rentAreas", e.target.value.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v)))}
            placeholder="VD: 100, 200, 300"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.rentAreas && <p className="text-xs text-red-500">{errors.rentAreas}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-500">Loại hình thuê</label>
          <input
            type="text"
            value={form.rentTypeCodes?.join(", ") || ""}
            onChange={(e) => onFieldChange("rentTypeCodes", e.target.value.split(",").map(v => v.trim().toUpperCase()).filter(v => v))}
            placeholder="VD: OFFICE, RETAIL"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.rentTypeCodes && <p className="text-xs text-red-500">{errors.rentTypeCodes}</p>}
        </div>
      </div>
    </Section>
  );
}