import { axiosClient } from "@/shared/services/axiosClient";
import { Building, BuildingDetail, BuildingSearch, BuildingUpdate } from "../types/building.type";

/**
 * ==============================
 * BUILDING API
 * ==============================
 * Chứa toàn bộ API liên quan đến quản lý tòa nhà
 */
export const buildingApi = {
  /** 📌 ADMIN - GET /building */
  getAll: (params?: BuildingSearch) =>
    axiosClient.get<Building[]>("/building", { params }),

  /** 📌 ADMIN + STAFF - GET /building/{id} */
  getById: (id: number) =>
    axiosClient.get<BuildingDetail>(`/building/${id}`),

  /** 📌 ADMIN - POST /building */
  create: (data: any) =>
    axiosClient.post("/building", data),

  /** 📌 ADMIN - PUT /building/{id} */
  update(id: number, payload: BuildingUpdate) {
    return axiosClient.put(`/building/${id}`, payload);
  },

  /** 📌 ADMIN - DELETE /building/{id} */
  delete: (id: number) =>
    axiosClient.delete(`/building/${id}`),

  /** 📌 STAFF - GET /building/my-building */
  getMyBuildings: (params?: BuildingSearch) =>
    axiosClient.get<Building[]>("/building/my-building", { params }),

  /** ✅ 📌 STAFF - POST /building/{buildingId}/assignment/current */
  assignCurrent: (buildingId: number) =>
    axiosClient.post(`/building/${buildingId}/assignment/current`),

  /** 📌 STAFF - DELETE /building/{buildingId}/assignment/current */
  unassignCurrent: (buildingId: number) =>
    axiosClient.delete(`/building/${buildingId}/assignment/current`),
};