// building/BuildingForm.tsx
import { Input, Select, NumberField, TextArea, Section } from '@/shared/components/ui'
import {
  Home, Building2, MapPin, Map, DollarSign, Car, Bike,
  Zap, Droplet, Percent, Calendar, User, Phone, FileText,
  Image, Layers, TrendingUp, Clock, Key, Star, Ruler,
  Wallet, ClipboardList, Navigation, Mail,
  Award, Wifi, Wind, Coffee, Dumbbell, ParkingCircle, Plus, Trash2
} from "lucide-react";

interface BuildingFormProps {
  form: any;
  errors: any;
  onChange: (e: any) => void;
  provinces: any[];
  wards: any[];
  loadingWards: boolean;
  onProvinceChange: (value: string) => void;
  onWardChange: (value: string) => void;
}

export const BuildingForm: React.FC<BuildingFormProps> = ({
  form, errors, onChange, provinces, wards,
  loadingWards, onProvinceChange, onWardChange
}) => {
  // Xử lý an toàn - đảm bảo luôn là array
  const provinceOptions = Array.isArray(provinces)
    ? provinces.map(p => ({ value: String(p.code), label: p.name }))
    : [];

  const wardOptions = Array.isArray(wards)
    ? wards.map(w => ({ value: String(w.code), label: w.name }))
    : [];

  // Xử lý rentAreas (danh sách diện tích thuê)
  const rentAreas = form.rentAreas || [];

  const handleAddRentArea = () => {
    const newRentAreas = [...rentAreas, undefined];
    // Gửi event với value là number[]
    onChange({
      target: {
        name: 'rentAreas',
        value: newRentAreas
      }
    } as any);  // Tạm thời dùng as any
  };

  const handleRemoveRentArea = (index: number) => {
    const newRentAreas = rentAreas.filter((_: any, i: number) => i !== index);
    onChange({
      target: { name: 'rentAreas', value: newRentAreas }
    });
  };

  const handleRentAreaChange = (index: number, value: number) => {
    const newRentAreas = [...rentAreas];
    newRentAreas[index] = value;
    onChange({
      target: { name: 'rentAreas', value: newRentAreas }
    });
  };

  // Xử lý rentTypeCodes (loại hình thuê)
  const rentTypeOptions = [
    { value: "OFFICE", label: "Văn phòng" },
    { value: "RETAIL", label: "Cửa hàng bán lẻ" },
    { value: "WAREHOUSE", label: "Kho xưởng" },
    { value: "COWORKING", label: "Coworking Space" },
    { value: "SERVICE", label: "Dịch vụ" },
  ];

  const handleRentTypeChange = (code: string, checked: boolean) => {
    const currentCodes = form.rentTypeCodes || [];
    let newCodes;
    if (checked) {
      newCodes = [...currentCodes, code];
    } else {
      newCodes = currentCodes.filter((c: string) => c !== code);
    }
    onChange({
      target: { name: 'rentTypeCodes', value: newCodes }
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50">

      {/* ==================== 1. THÔNG TIN CƠ BẢN ==================== */}
      <Section title="Thông tin cơ bản">
        <Input
          label="Tên tòa nhà"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="VD: Tòa nhà ABC Tower"
          required
          icon={Home}
          error={errors.name}
        />

        <Input
          label="Kết cấu"
          name="structure"
          value={form.structure}
          onChange={onChange}
          placeholder="VD: Bê tông cốt thép"
          icon={Layers}
          error={errors.structure}
        />

        {/* Hướng */}
        <Select
          label="Hướng"
          name="direction"
          value={form.direction || ''}
          options={[
            { value: "", label: "-- Chọn hướng --" },  // ← Thêm option trống
            { value: "EAST", label: "Đông" },
            { value: "WEST", label: "Tây" },
            { value: "SOUTH", label: "Nam" },
            { value: "NORTH", label: "Bắc" },
            { value: "SOUTHEAST", label: "Đông Nam" },
            { value: "SOUTHWEST", label: "Tây Nam" },
            { value: "NORTHEAST", label: "Đông Bắc" },
            { value: "NORTHWEST", label: "Tây Bắc" },
          ]}
          onChange={onChange}
          icon={TrendingUp}
          error={errors.direction}
        />

        {/* Hạng */}
        <Select
          label="Hạng"
          name="level"
          value={form.level || ''}
          options={[
            { value: "", label: "-- Chọn hạng --" },  // ← Thêm option trống
            { value: "A", label: "Hạng A - Cao cấp" },
            { value: "B", label: "Hạng B - Trung cấp" },
            { value: "C", label: "Hạng C - Phổ thông" },
          ]}
          onChange={onChange}
          icon={Star}
          error={errors.level}
        />
      </Section>

      {/* ==================== 2. ĐỊA CHỈ ==================== */}
      <Section title="Địa chỉ">
        <Input
          label="Số nhà / Tên đường"
          name="street"
          value={form.street}
          onChange={onChange}
          placeholder="VD: 123 Nguyễn Văn Linh"
          required
          icon={Navigation}
          error={errors.street}
        />

        <Select
          label="Tỉnh / Thành phố"
          name="provinceId"
          value={form.provinceId}
          options={[
            { value: "", label: "-- Chọn Tỉnh/Thành phố --" },  // Thêm option trống
            ...provinceOptions
          ]}
          onChange={(e) => onProvinceChange(e.target.value)}
          required
          icon={Map}
          error={errors.provinceId}
        />

        <Select
          label="Xã / Phường"
          name="wardCode"
          value={form.wardCode || ''}
          options={[
            { value: "", label: "-- Chọn Xã/Phường --" },
            ...wardOptions
          ]}
          onChange={(e) => onWardChange(e.target.value)}
          disabled={loadingWards || !form.provinceId}
          required
          icon={Map}
          error={errors.wardCode}
        />

        <Input
          label="Google Map Link"
          name="googleMapLink"
          value={form.googleMapLink}
          onChange={onChange}
          placeholder="https://maps.google.com/..."
          icon={Map}
          error={errors.googleMapLink}
        />
      </Section>

      {/* ==================== 3. THÔNG SỐ KỸ THUẬT ==================== */}
      <Section title="Thông số kỹ thuật">
        <NumberField
          label="Số tầng hầm"
          name="numberOfBasement"
          value={form.numberOfBasement}
          onChange={onChange}
          placeholder="0"
          icon={ParkingCircle}
          error={errors.numberOfBasement}
        />

        <NumberField
          label="Diện tích sàn"
          name="floorArea"
          value={form.floorArea}
          onChange={onChange}
          placeholder="VD: 500"
          icon={Ruler}
          unit="m²"
          error={errors.floorArea}
          required
        />

        {/* ===== RENT AREAS (DANH SÁCH DIỆN TÍCH THUÊ) ===== */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Home size={16} />
            Diện tích cho thuê (m²)
            <span className="text-red-500">*</span>
          </label>

          {rentAreas.map((area: number | undefined, index: number) => (
            <div key={index} className="flex gap-2">
              <NumberField
                label=""
                name={`rentArea_${index}`}
                value={area || ''}  // Nếu undefined thì hiển thị rỗng
                onChange={(e: any) => handleRentAreaChange(index, Number(e.target.value))}
                placeholder="Nhập diện tích"
                unit="m²"
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveRentArea(index)}
                className="mt-1 p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddRentArea}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
          >
            <Plus size={16} />
            Thêm diện tích cho thuê
          </button>

          {errors.rentAreas && (
            <p className="text-sm text-red-600">{errors.rentAreas}</p>
          )}
        </div>
      </Section>

      {/* ==================== 4. LOẠI HÌNH THUÊ ==================== */}
      <Section title="Loại hình thuê">
        <div className="space-y-2">
          {rentTypeOptions.map(option => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(form.rentTypeCodes || []).includes(option.value)}
                onChange={(e) => handleRentTypeChange(option.value, e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.rentTypeCodes && (
          <p className="text-sm text-red-600 mt-1">{errors.rentTypeCodes}</p>
        )}
      </Section>

      {/* ==================== 5. GIÁ CẢ & PHÍ DỊCH VỤ ==================== */}
      <Section title="Giá cả & Phí dịch vụ">
        <NumberField
          label="Giá thuê"
          name="rentPrice"
          value={form.rentPrice}
          onChange={onChange}
          placeholder="VD: 50000000"
          icon={Wallet}
          unit="VNĐ"
          error={errors.rentPrice}
          required
        />

        <Input
          label="Mô tả giá"
          name="rentPriceDescription"
          value={form.rentPriceDescription}
          onChange={onChange}
          placeholder="VD: Đã bao gồm phí quản lý"
          icon={ClipboardList}
          error={errors.rentPriceDescription}
        />

        <NumberField
          label="Phí dịch vụ"
          name="serviceFee"
          value={form.serviceFee}
          onChange={onChange}
          placeholder="VD: 2000000"
          icon={DollarSign}
          unit="VNĐ"
          error={errors.serviceFee}
        />

        <NumberField
          label="Phí ô tô"
          name="carFee"
          value={form.carFee}
          onChange={onChange}
          placeholder="VD: 500000"
          icon={Car}
          unit="VNĐ"
          error={errors.carFee}
        />

        <NumberField
          label="Phí xe máy"
          name="motorFee"
          value={form.motorFee}
          onChange={onChange}
          placeholder="VD: 100000"
          icon={Bike}
          unit="VNĐ"
          error={errors.motorFee}
        />

        <NumberField
          label="Phí ngoài giờ"
          name="overtimeFee"
          value={form.overtimeFee}
          onChange={onChange}
          placeholder="VD: 100000"
          icon={Clock}
          unit="VNĐ"
          error={errors.overtimeFee}
        />
      </Section>

      {/* ==================== 6. TIỆN ÍCH ==================== */}
      <Section title="Tiện ích">
        <NumberField
          label="Tiền điện"
          name="electricityFee"
          value={form.electricityFee}
          onChange={onChange}
          placeholder="VD: 3500"
          icon={Zap}
          unit="VNĐ/kWh"  // Thêm unit
          error={errors.electricityFee}
        />

        <NumberField
          label="Tiền nước"
          name="waterFee"
          value={form.waterFee}
          onChange={onChange}
          placeholder="VD: 25000"
          icon={Droplet}
          unit="VNĐ/m³"  // Thêm unit
          error={errors.waterFee}
        />
      </Section>

      {/* ==================== 7. THÔNG TIN HỢP ĐỒNG ==================== */}
      <Section title="Thông tin hợp đồng">
        <Input
          label="Đặt cọc"
          name="deposit"
          value={form.deposit}
          onChange={onChange}
          placeholder="VD: 3 tháng"
          icon={Key}
          error={errors.deposit}
        />

        <Input
          label="Thanh toán"
          name="payment"
          value={form.payment}
          onChange={onChange}
          placeholder="VD: Theo quý"
          icon={Calendar}
          error={errors.payment}
        />

        <Input
          label="Thời hạn thuê"
          name="rentTime"
          value={form.rentTime}
          onChange={onChange}
          placeholder="VD: 5 năm"
          icon={Calendar}
          error={errors.rentTime}
        />

        <Input
          label="Thời gian setup"
          name="decorationTime"
          value={form.decorationTime}
          onChange={onChange}
          placeholder="VD: 1 tháng"
          icon={Clock}
          error={errors.decorationTime}
        />
      </Section>

      {/* ==================== 8. THÔNG TIN QUẢN LÝ ==================== */}
      <Section title="Thông tin quản lý">
        <Input
          label="Tên quản lý"
          name="managerName"
          value={form.managerName}
          onChange={onChange}
          placeholder="Họ và tên"
          icon={User}
          error={errors.managerName}
        />

        <Input
          label="Số điện thoại"
          name="managerPhone"
          value={form.managerPhone}
          onChange={onChange}
          placeholder="VD: 0912345678"
          icon={Phone}
          error={errors.managerPhone}
        />
      </Section>

      {/* ==================== 9. HOA HỒNG & THÔNG TIN KHÁC ==================== */}
      <Section title="Hoa hồng & Thông tin khác">
        <NumberField
          label="Hoa hồng"
          name="brokerageFee"
          value={form.brokerageFee}
          onChange={onChange}
          placeholder="VD: 5"
          icon={Award}
          unit="%"
          error={errors.brokerageFee}
        />

        <TextArea
          label="Ghi chú"
          name="note"
          value={form.note}
          onChange={onChange}
          rows={3}
          placeholder="Nhập ghi chú..."
          icon={ClipboardList}
          error={errors.note}
        />
      </Section>

    </div>
  );
};