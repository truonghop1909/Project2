import { axiosClient } from "@/shared/services/axiosClient";
import { TransactionDTO } from "../types/customer.type";

/**
 * ==============================
 * TRANSACTION API
 * ==============================
 */
export const transactionApi = {
  /** 📌 POST /customer/{customerId}/transactions */
  create: (customerId: number, payload: TransactionDTO) =>
    axiosClient.post<void>(`/customer/${customerId}/transactions`, payload),

  /** 📌 STAFF - GET /customer/{customerId}/transactions */
  getForStaff: (customerId: number) =>
    axiosClient.get<TransactionDTO[]>(`/customer/${customerId}/transactions`),

  /** 📌 ADMIN - GET /customer/{customerId}/transactions/admin */
  getForAdmin: (customerId: number) =>
    axiosClient.get<TransactionDTO[]>(`/customer/${customerId}/transactions/admin`),
};