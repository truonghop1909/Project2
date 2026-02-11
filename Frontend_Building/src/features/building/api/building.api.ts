import { axiosClient } from "@/shared/services/axiosClient";
import { Building, BuildingDetail, BuildingSearch, BuildingUpdate } from "../types/building.type";

export const buildingApi = {
  getAll: (params?: BuildingSearch) =>
    axiosClient.get<Building[]>("/building", { params }),

  getById: (id: number) =>
    axiosClient.get<BuildingDetail>(`/building/${id}`),

  create: (data: any) =>
    axiosClient.post("/building", data),

  update(id: number, payload: BuildingUpdate) {
    return axiosClient.put(`/building/${id}`, payload);
  },
  delete: (id: number) =>
    axiosClient.delete(`/building/${id}`),
};
