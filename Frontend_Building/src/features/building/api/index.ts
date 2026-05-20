// api/index.ts
export { buildingApi } from "./building.api";
export { imageApi} from "./image.api";

// Re-export types
export type {
  Building,
  BuildingDetail,
  BuildingSearch,
  BuildingSearchDTO,
  UserDTO,
  SubImage
} from "../types/building.type";