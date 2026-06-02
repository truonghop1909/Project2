import { axiosClient } from "@/shared/services/axiosClient";
import { AdminStatisticsDTO, StaffStatisticsDTO } from "../types/statistics.type";

export const statisticsApi = {
  getAdminDashboard: () =>
    axiosClient.get<AdminStatisticsDTO>("/statistics/admin/dashboard"),

  getStaffStatistics: () =>
    axiosClient.get<StaffStatisticsDTO>("/statistics/staff/me"),
};