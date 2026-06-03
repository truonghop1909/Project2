export interface MonthlyCountDTO {
  month: string;
  count: number;
}

export interface TopBuildingDTO {
  buildingId: number;
  name: string;
  rentPrice: number;
  provinceName: string;
}

export interface TopStaffDTO {
  staffId: number;
  staffName: string;
  totalBuildings?: number | null;
  totalCustomers?: number | null;
  totalAssignments?: number | null;
}

export interface AdminStatisticsDTO {
  totalBuildings: number;
  totalFloorArea: number;
  totalExpectedRevenue: number;
  buildingsByProvince: Record<string, number>;
  top5HighestRentBuildings: TopBuildingDTO[];
  totalCustomers: number;
  pendingCustomers: number;
  approvedCustomers: number;
  rejectedCustomers: number;
  newCustomersByMonth: MonthlyCountDTO[];
  averageApprovalTimeHours: number;
  totalTransactions: number;
  transactionsByMonth: MonthlyCountDTO[];
  transactionsByType: Record<string, number>;
  totalActiveStaff: number;
  top3StaffByBuildings: TopStaffDTO[];
  top3StaffByCustomers: TopStaffDTO[];
  staffUtilizationRate: number;
  totalImages: number;
  buildingsWithThumbnail: number;
}

import { CustomerDTO } from "@/features/customer/types/customer.type";
import { TransactionDTO } from "@/features/customer/types/customer.type";

export interface StaffStatisticsDTO {
  staffId: number;
  staffName: string;
  assignedBuildingsCount: number;
  assignedCustomersCount: number;
  transactionsCount: number;
  totalRevenueFromAssignedBuildings: number;
  recentCustomers: CustomerDTO[];
  recentTransactions: TransactionDTO[];
}

export interface PublicStatisticsDTO {
  totalBuildings: number;
  minRentPrice: number;
  maxRentPrice: number;
  avgRentPrice: number;
  buildingsByProvince: Record<string, number>;
  top5HighestRentBuildings: TopBuildingDTO[];
}

export interface TopStaffTransactionDTO {
  staffId: number;
  staffName: string;
  transactionCount: number;
}