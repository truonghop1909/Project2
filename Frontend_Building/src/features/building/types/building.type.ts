export interface Building {
  id: number;
  name: string;
  address: string;

  floorArea: number;
  rentPrice: number;
  serviceFee: number;

  managerName: string;
  managerPhone: string;

  brokerageFee: number;
  rentArea: string | null;
}

export interface BuildingSearch {
  name?: string;
  district?: string;
  ward?: string;
  street?: string;
  numberOfBasement?: number;

  floorAreaFrom?: number;
  floorAreaTo?: number;

  direction?: string;
  level?: string;

  rentPriceFrom?: number;
  rentPriceTo?: number;

  rentAreaFrom?: number;
  rentAreaTo?: number;

  staffId?: number;
  rentTypes?: string[];

  // pagination & sort
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

// building-update.type.ts
export interface BuildingUpdate {
    name?: string;
    districtId?: number;
    ward?: string;
    street?: string;
    structure?: string;
    direction?: string;
    level?: string;

    numberOfBasement?: number;
    floorArea?: number;
    rentPrice?: number;
    rentPriceDescription?: string;

    serviceFee?: number;
    carFee?: number;
    motorFee?: number;
    overtimeFee?: number;
    electricityFee?: string;
    waterFee?: string;

    deposit?: string;
    payment?: string;
    rentTime?: string;
    decorationTime?: string;

    managerName?: string;
    managerPhone?: string;

    brokerageFee?: number;
    note?: string;

    rentAreas?: number[];
    rentTypeCodes?: string[];
}
// Dùng cho GET /building/{id} (EDIT FORM)
export interface BuildingDetail {
  id: number;

  name: string;
  districtId: number;
  ward: string;
  street: string;
  structure?: string;
  direction?: string;
  level?: string;

  numberOfBasement?: number;
  floorArea?: number;
  rentPrice?: number;
  rentPriceDescription?: string;

  serviceFee?: number;
  carFee?: number;
  motorFee?: number;
  overtimeFee?: number;
  electricityFee?: string;
  waterFee?: string;

  deposit?: string;
  payment?: string;
  rentTime?: string;
  decorationTime?: string;

  managerName?: string;
  managerPhone?: string;
  brokerageFee?: number;
  note?: string;

  rentAreas?: number[];
  rentTypeCodes?: string[];
}
