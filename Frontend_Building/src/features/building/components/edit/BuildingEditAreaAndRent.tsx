import { useEffect, useState } from "react";
import { Section } from "@/components/ui";
import { BuildingDetail } from "../../types/building.type";
import { RentType } from "../../types/rentType.type";
import { getRentTypes } from "../../api/rentTypeService";

interface BuildingEditAreaAndRentProps {
  form: BuildingDetail;
  errors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

export function BuildingEditAreaAndRent({ form, errors, onFieldChange }: BuildingEditAreaAndRentProps) {
  const [rentTypes, setRentTypes] = useState<RentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [rentAreasInput, setRentAreasInput] = useState(
    form.rentAreas?.join(", ") || ""
  );

  useEffect(() => {
    const loadRentTypes = async () => {
      setLoading(true);
      try {
        const data = await getRentTypes();
        setRentTypes(data);
      } catch (error) {
        console.error("Lỗi tải loại hình thuê:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRentTypes();
  }, []);

  useEffect(() => {
    setRentAreasInput(form.rentAreas?.join(", ") || "");
  }, [form.rentAreas]);

  const handleRentTypeChange = (code: string, checked: boolean) => {
    const current = form.rentTypeCodes || [];
    const updated = checked ? [...current, code] : current.filter(c => c !== code);
    onFieldChange("rentTypeCodes", updated);
  };

  const handleRentAreasBlur = () => {
    const areas = rentAreasInput
      .split(",")
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v) && v > 0);
    onFieldChange("rentAreas", areas);
    setRentAreasInput(areas.join(", "));
  };

  const handleRentAreasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentAreasInput(e.target.value);
  };

  return (
    <Section title="Diện tích & Loại hình thuê">
      <div className="space-y-6">
        {/* Diện tích thuê */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diện tích cho thuê (m²)
          </label>
          <input
            type="text"
            value={rentAreasInput}
            onChange={handleRentAreasChange}
            onBlur={handleRentAreasBlur}
            placeholder="VD: 100, 200, 300"
            className={`block w-full px-3 py-2 border ${
              errors.rentAreas ? "border-red-300" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.rentAreas ? (
            <p className="mt-1 text-xs text-red-600">{errors.rentAreas}</p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">
              Nhập các diện tích cách nhau bằng dấu phẩy, ví dụ: 100, 200, 350
            </p>
          )}
        </div>

        {/* Loại hình thuê */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại hình thuê
          </label>
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-500">Đang tải...</span>
            </div>
          ) : rentTypes.length === 0 ? (
            <p className="text-sm text-gray-500">Không có dữ liệu loại hình thuê</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {rentTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-all duration-150 ${
                    (form.rentTypeCodes || []).includes(type.code)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={type.code}
                    checked={(form.rentTypeCodes || []).includes(type.code)}
                    onChange={(e) => handleRentTypeChange(type.code, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{type.name}</span>
                </label>
              ))}
            </div>
          )}
          {errors.rentTypeCodes && <p className="mt-1 text-xs text-red-600">{errors.rentTypeCodes}</p>}
        </div>
      </div>
    </Section>
  );
}