import { BuildingDetail, BuildingUpdate } from "../types/building.type";

export const mapBuildingDetailToUpdate = (
  b: BuildingDetail
): BuildingUpdate => ({
  name: b.name,
  street: b.street,
  ward: b.ward,
  districtId: b.districtId,
  structure: b.structure,
  direction: b.direction,
  level: b.level,

  numberOfBasement: b.numberOfBasement,
  floorArea: b.floorArea,
  rentPrice: b.rentPrice,
  rentPriceDescription: b.rentPriceDescription,

  serviceFee: b.serviceFee,
  carFee: b.carFee,
  motorFee: b.motorFee,
  overtimeFee: b.overtimeFee,
  electricityFee: b.electricityFee,
  waterFee: b.waterFee,

  deposit: b.deposit,
  payment: b.payment,
  rentTime: b.rentTime,
  decorationTime: b.decorationTime,

  managerName: b.managerName,
  managerPhone: b.managerPhone,
  brokerageFee: b.brokerageFee,
  note: b.note,

  rentAreas: b.rentAreas,
  rentTypeCodes: b.rentTypeCodes,
});
