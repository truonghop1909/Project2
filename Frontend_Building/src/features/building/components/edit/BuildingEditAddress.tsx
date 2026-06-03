import { MapPin, Search } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
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
  const [provinceSearch, setProvinceSearch] = useState("");
  const [wardSearch, setWardSearch] = useState("");
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showWardDropdown, setShowWardDropdown] = useState(false);
  const provinceRef = useRef<HTMLDivElement>(null);
  const wardRef = useRef<HTMLDivElement>(null);

  // Lọc provinces theo từ khóa
  const filteredProvinces = useMemo(() => {
    if (!provinceSearch.trim()) return provinces;
    return provinces.filter(p => 
      p.name.toLowerCase().includes(provinceSearch.toLowerCase())
    );
  }, [provinces, provinceSearch]);

  // Lọc wards theo từ khóa
  const filteredWards = useMemo(() => {
    if (!wardSearch.trim()) return wards;
    return wards.filter(w => 
      w.name.toLowerCase().includes(wardSearch.toLowerCase())
    );
  }, [wards, wardSearch]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (provinceRef.current && !provinceRef.current.contains(event.target as Node)) {
        setShowProvinceDropdown(false);
      }
      if (wardRef.current && !wardRef.current.contains(event.target as Node)) {
        setShowWardDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Chọn tỉnh
  const selectProvince = (code: string, name: string) => {
    onProvinceChange(code);
    setProvinceSearch(name);
    setShowProvinceDropdown(false);
  };

  // Chọn phường
  const selectWard = (code: string, name: string) => {
    onWardChange(code);
    setWardSearch(name);
    setShowWardDropdown(false);
  };

  // Khi form.provinceId thay đổi từ bên ngoài (load dữ liệu), cập nhật search text
  useEffect(() => {
    if (form.provinceId && provinces.length) {
      const province = provinces.find(p => p.code === form.provinceId);
      if (province) setProvinceSearch(province.name);
    } else {
      setProvinceSearch("");
    }
  }, [form.provinceId, provinces]);

  useEffect(() => {
    if (form.wardCode && wards.length) {
      const ward = wards.find(w => w.code === form.wardCode);
      if (ward) setWardSearch(ward.name);
    } else {
      setWardSearch("");
    }
  }, [form.wardCode, wards]);

  return (
    <Section title="Địa chỉ" icon={MapPin}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tỉnh/Thành phố với tìm kiếm */}
        <div ref={provinceRef} className="relative">
          <label className="text-sm text-gray-500">Tỉnh/Thành phố</label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={provinceSearch}
              onChange={(e) => {
                setProvinceSearch(e.target.value);
                setShowProvinceDropdown(true);
                // Nếu xóa text, reset provinceId
                if (!e.target.value) onProvinceChange("");
              }}
              onFocus={() => setShowProvinceDropdown(true)}
              className="w-full pl-8 pr-3 py-2 border rounded-lg"
              placeholder="Nhập tên tỉnh/thành phố..."
            />
          </div>
          {showProvinceDropdown && filteredProvinces.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredProvinces.map(p => (
                <li
                  key={p.code}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectProvince(p.code, p.name)}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
          {errors.provinceId && <p className="text-xs text-red-500">{errors.provinceId}</p>}
        </div>

        {/* Xã/Phường với tìm kiếm */}
        <div ref={wardRef} className="relative">
          <label className="text-sm text-gray-500">Xã/Phường</label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={wardSearch}
              onChange={(e) => {
                setWardSearch(e.target.value);
                setShowWardDropdown(true);
                if (!e.target.value) onWardChange("");
              }}
              onFocus={() => form.provinceId && setShowWardDropdown(true)}
              disabled={!form.provinceId}
              className="w-full pl-8 pr-3 py-2 border rounded-lg disabled:bg-gray-100"
              placeholder={form.provinceId ? "Nhập tên xã/phường..." : "Chọn tỉnh trước"}
            />
          </div>
          {showWardDropdown && filteredWards.length > 0 && !loadingWards && (
            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredWards.map(w => (
                <li
                  key={w.code}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectWard(w.code, w.name)}
                >
                  {w.name}
                </li>
              ))}
            </ul>
          )}
          {loadingWards && <p className="text-xs text-gray-500">Đang tải...</p>}
          {errors.wardCode && <p className="text-xs text-red-500">{errors.wardCode}</p>}
        </div>

        {/* Đường/Số nhà */}
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

        {/* Google Maps */}
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