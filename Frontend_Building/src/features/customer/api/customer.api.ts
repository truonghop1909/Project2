import { axiosClient } from "@/shared/services/axiosClient";
import {
  CustomerDTO,
  CustomerRequestDTO,
  CustomerSearchDTO,
} from "../types/customer.type";

export const customerApi = {
  /** ADMIN: GET /api/customer/admin/search */
  searchForAdmin: (params?: CustomerSearchDTO) =>
    axiosClient.get<CustomerDTO[]>("/customer/admin/search", { params }),

  /** STAFF: GET /api/customer/staff/search */
  searchForStaff: (params?: CustomerSearchDTO) =>
    axiosClient.get<CustomerDTO[]>("/customer/staff/search", { params }),

  /** ADMIN / STAFF: GET /api/customer/{id} */
  getById: (id: number) =>
    axiosClient.get<CustomerDTO>(`/customer/${id}`),

  /** PUBLIC: POST /api/customer/public */
  createPublic: (payload: CustomerRequestDTO) =>
    axiosClient.post<CustomerDTO>("/customer/public", payload),

  /** ADMIN / STAFF: POST /api/customer */
  createInternal: (payload: CustomerRequestDTO) =>
    axiosClient.post<CustomerDTO>("/customer", payload),

  /** ADMIN / STAFF: PUT /api/customer/{id} */
  update: (id: number, payload: CustomerRequestDTO) =>
    axiosClient.put<CustomerDTO>(`/customer/${id}`, payload),

  /** STAFF / ADMIN: GET /api/customer/staff/my-customers */
  getMyCustomers: () =>
    axiosClient.get<CustomerDTO[]>("/customer/staff/my-customers"),

  /** ADMIN: PUT /api/customer/{id}/approve */
  approve: (id: number) =>
    axiosClient.put(`/customer/${id}/approve`),

  /** ADMIN: PUT /api/customer/{id}/reject */
  reject: (id: number) =>
    axiosClient.put(`/customer/${id}/reject`),
};