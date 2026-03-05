import { axiosClient } from "@/shared/services/axiosClient";
import { AssignmentCustomerDTO, StaffAssignmentDTO } from "../types/customer.type";

/**
 * ==============================
 * ASSIGNMENT CUSTOMER API
 * ==============================
 */
export const assignmentCustomerApi = {
  /** 📌 GET /customer/{customerId}/staffs */
  loadStaffs: (customerId: number) =>
    axiosClient.get<StaffAssignmentDTO[]>(`/customer/${customerId}/staffs`),

  /** 📌 POST /customer/assignment */
  assign: (payload: AssignmentCustomerDTO) =>
    axiosClient.post<void>("/customer/assignment", payload),

  /** ✅ STAFF - POST /customer/{customerId}/assignment/current */
  assignCurrent: (customerId: number) =>
    axiosClient.post<void>(`/customer/${customerId}/assignment/current`),

  /** ✅ STAFF - DELETE /customer/{customerId}/assignment/current */
  unassignCurrent: (customerId: number) =>
    axiosClient.delete<void>(`/customer/${customerId}/assignment/current`),
};