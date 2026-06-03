import { axiosClient } from "@/shared/services/axiosClient";
import { AdminStatisticsDTO, PublicStatisticsDTO, StaffStatisticsDTO, TopBuildingDTO, TopStaffTransactionDTO } from "../types/statistics.type";

export const statisticsApi = {
  getAdminDashboard: () =>
    axiosClient.get<AdminStatisticsDTO>("/statistics/admin/dashboard"),

  getStaffStatistics: () =>
    axiosClient.get<StaffStatisticsDTO>("/statistics/staff/me"),

  getPublicStatistics: () =>
    axiosClient.get<PublicStatisticsDTO>("/public/statistics"),

  getTop5HighestRentBuildings: () =>
    axiosClient.get<TopBuildingDTO[]>("/public/statistics/top-buildings"),
  getTopBuildingsByProvinces: (provinces: string[], limit = 5) =>
    axiosClient.get<Record<string, TopBuildingDTO[]>>("/public/statistics/top-buildings-by-province", {
      params: { provinces: provinces.join(','), limit }
    }),
  getTop5StaffByTransactions: () =>
    axiosClient.get<TopStaffTransactionDTO[]>("/public/statistics/top-staff-transactions"),
};