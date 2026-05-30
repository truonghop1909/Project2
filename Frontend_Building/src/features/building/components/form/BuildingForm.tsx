import { BuildingFormBasicInfo } from "./BuildingFormBasicInfo";
import { BuildingFormAddress } from "./BuildingFormAddress";
import { BuildingFormTechnical } from "./BuildingFormTechnical";
import { BuildingFormRentType } from "./BuildingFormRentType";
import { BuildingFormCost } from "./BuildingFormCost";
import { BuildingFormUtilities } from "./BuildingFormUtilities";
import { BuildingFormContract } from "./BuildingFormContract";
import { BuildingFormManagement } from "./BuildingFormManagement";
import { BuildingFormBrokerage } from "./BuildingFormBrokerage";

export const BuildingForm = ({
  form, errors, onChange, provinces, wards, loadingWards,
  onProvinceChange, onWardChange,
  handleRentAreaChange, handleAddRentArea, handleRemoveRentArea
}: any) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50">
      <BuildingFormBasicInfo form={form} errors={errors} onChange={onChange} />
      <BuildingFormAddress
        form={form} errors={errors} onChange={onChange}
        provinces={provinces} wards={wards} loadingWards={loadingWards}
        onProvinceChange={onProvinceChange} onWardChange={onWardChange}
      />
      <BuildingFormTechnical
        form={form} errors={errors} onChange={onChange}
        handleRentAreaChange={handleRentAreaChange}
        handleAddRentArea={handleAddRentArea}
        handleRemoveRentArea={handleRemoveRentArea}
      />
      <BuildingFormRentType form={form} onChange={onChange} errors={errors} />
      <BuildingFormCost form={form} onChange={onChange} errors={errors} />
      <BuildingFormUtilities form={form} onChange={onChange} errors={errors} />
      <BuildingFormContract form={form} onChange={onChange} />
      <BuildingFormManagement form={form} onChange={onChange} />
      <BuildingFormBrokerage form={form} onChange={onChange} errors={errors} />
    </div>
  );
};