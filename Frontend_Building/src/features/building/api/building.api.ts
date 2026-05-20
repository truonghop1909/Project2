// src/features/building/api/building.api.ts

import { axiosClient } from "@/shared/services/axiosClient";
import {
  BuildingDetail,
  BuildingSearch,
  BuildingSearchDTO,
  UserDTO
} from "../types/building.type";

export const buildingApi = {
  // ==================== PUBLIC APIS (Không cần token) ====================
  
  /**
   * Lấy danh sách tòa nhà công khai (cho trang chủ)
   */
  getPublicBuildings: (params?: BuildingSearch) =>
    axiosClient.get<BuildingSearchDTO[]>("/public/buildings", { params }),

  /**
   * Lấy chi tiết tòa nhà công khai (cho khách hàng)
   */
  getPublicBuildingById: (id: number) =>
    axiosClient.get<BuildingDetail>(`/public/buildings/${id}`),

  // ==================== AUTHENTICATED APIS (Cần token) ====================

  /**
   * Lấy danh sách tòa nhà theo điều kiện tìm kiếm (cho admin/staff)
   */
  getAll: (params?: BuildingSearch) =>
    axiosClient.get<BuildingSearchDTO[]>("/building", { params }),

  /**
   * Lấy chi tiết tòa nhà theo ID (cho admin/staff)
   */
  getById: (id: number) =>
    axiosClient.get<BuildingDetail>(`/building/${id}`),

  /**
   * Tạo mới tòa nhà
   */
  create: (payload: Partial<BuildingDetail>) =>
    axiosClient.post<BuildingDetail>("/building", payload),

  /**
   * Cập nhật thông tin tòa nhà
   */
  update: (id: number, payload: Partial<BuildingDetail>) =>
    axiosClient.put<BuildingDetail>(`/building/${id}`, payload),

  /**
   * Xóa tòa nhà
   */
  delete: (id: number) =>
    axiosClient.delete(`/building/${id}`),

  /**
   * Lấy danh sách tòa nhà của nhân viên hiện tại
   */
  getMyBuildings: (params?: BuildingSearch) =>
    axiosClient.get<BuildingSearchDTO[]>("/building/my-building", { params }),

  // ==================== STAFF ASSIGNMENT ====================

  /**
   * Gán tòa nhà cho nhân viên hiện tại
   */
  assignCurrent: (buildingId: number) =>
    axiosClient.post(`/building/${buildingId}/assignment/current`),

  /**
   * Hủy gán tòa nhà cho nhân viên hiện tại
   */
  unassignCurrent: (buildingId: number) =>
    axiosClient.delete(`/building/${buildingId}/assignment/current`),

  /**
   * Lấy danh sách nhân viên được gán cho tòa nhà
   */
  getAssignedStaff: (buildingId: number) =>
    axiosClient.get<UserDTO[]>(`/building/${buildingId}/staff`),
};