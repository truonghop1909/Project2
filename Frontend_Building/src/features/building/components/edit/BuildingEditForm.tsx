import { BuildingDetail } from "../../types/building.type";
import { BuildingEditBasicInfo } from "./BuildingEditBasicInfo";
import { BuildingEditAddress } from "./BuildingEditAddress";
import { BuildingEditAreaAndRent } from "./BuildingEditAreaAndRent";
import { BuildingEditCost } from "./BuildingEditCost";
import { BuildingEditContract } from "./BuildingEditContract";
import { BuildingEditManagement } from "./BuildingEditManagement";
import { BuildingEditNote } from "./BuildingEditNote";

interface BuildingEditFormProps {
  form: BuildingDetail;
  errors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
  provinces: any[];
  wards: any[];
  loadingWards: boolean;
  onProvinceChange: (value: string) => void;
  onWardChange: (value: string) => void;
}

export function BuildingEditForm({
  form,
  errors,
  onFieldChange,
  provinces,
  wards,
  loadingWards,
  onProvinceChange,
  onWardChange,
}: BuildingEditFormProps) {
  return (
    <div className="space-y-6">
      <BuildingEditBasicInfo form={form} errors={errors} onFieldChange={onFieldChange} />
      <BuildingEditAddress
        form={form}
        errors={errors}
        onFieldChange={onFieldChange}
        provinces={provinces}
        wards={wards}
        loadingWards={loadingWards}
        onProvinceChange={onProvinceChange}
        onWardChange={onWardChange}
      />
      <BuildingEditAreaAndRent form={form} errors={errors} onFieldChange={onFieldChange} />
      <BuildingEditCost form={form} onFieldChange={onFieldChange} />
      <BuildingEditContract form={form} onFieldChange={onFieldChange} />
      <BuildingEditManagement form={form} onFieldChange={onFieldChange} />
      <BuildingEditNote form={form} onFieldChange={onFieldChange} />
    </div>
  );
}