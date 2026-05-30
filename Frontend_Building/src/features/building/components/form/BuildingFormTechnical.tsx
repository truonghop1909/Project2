import { NumberField, Section } from "@/components/ui";
import { ParkingCircle, Ruler, Home, Plus, Trash2 } from "lucide-react";

export function BuildingFormTechnical({ form, errors, onChange, handleRentAreaChange, handleAddRentArea, handleRemoveRentArea }: any) {
  const rentAreas = form.rentAreas || [];
  return (
    <Section title="Thông số kỹ thuật">
      <NumberField label="Số tầng hầm" name="numberOfBasement" value={form.numberOfBasement} onChange={onChange} placeholder="0" icon={ParkingCircle} />
      <NumberField label="Diện tích sàn" name="floorArea" value={form.floorArea} onChange={onChange} unit="m²" required icon={Ruler} error={errors.floorArea} />
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700"><Home size={16} /> Diện tích cho thuê (m²)<span className="text-red-500">*</span></label>
        {rentAreas.map((area: number, idx: number) => (
          <div key={idx} className="flex gap-2">
            <NumberField name={`rentArea_${idx}`} value={area} onChange={(e: any) => handleRentAreaChange(idx, Number(e.target.value))} placeholder="Nhập diện tích" unit="m²" className="flex-1" />
            <button type="button" onClick={() => handleRemoveRentArea(idx)} className="mt-1 p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
          </div>
        ))}
        <button type="button" onClick={handleAddRentArea} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"><Plus size={16} /> Thêm diện tích</button>
        {errors.rentAreas && <p className="text-sm text-red-600">{errors.rentAreas}</p>}
      </div>
    </Section>
  );
}