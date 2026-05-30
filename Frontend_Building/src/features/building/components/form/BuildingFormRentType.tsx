import { Section } from "@/components/ui";

export function BuildingFormRentType({ form, onChange, errors }: any) {
  const rentTypeOptions = [
    { value: "OFFICE", label: "Văn phòng" },
    { value: "RETAIL", label: "Cửa hàng bán lẻ" },
    { value: "WAREHOUSE", label: "Kho xưởng" },
    { value: "COWORKING", label: "Coworking Space" },
    { value: "SERVICE", label: "Dịch vụ" },
  ];
  const handleChange = (code: string, checked: boolean) => {
    const current = form.rentTypeCodes || [];
    const newCodes = checked ? [...current, code] : current.filter((c: string) => c !== code);
    onChange({ target: { name: 'rentTypeCodes', value: newCodes } });
  };
  return (
    <Section title="Loại hình thuê">
      <div className="space-y-2">
        {rentTypeOptions.map(opt => (
          <label key={opt.value} className="flex items-center gap-2">
            <input type="checkbox" checked={(form.rentTypeCodes || []).includes(opt.value)} onChange={(e) => handleChange(opt.value, e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
      {errors.rentTypeCodes && <p className="text-sm text-red-600 mt-1">{errors.rentTypeCodes}</p>}
    </Section>
  );
}