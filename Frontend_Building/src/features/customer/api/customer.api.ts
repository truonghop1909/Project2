import { axiosClient } from "@/shared/services/axiosClient";
import { CustomerDTO, CustomerRequestDTO, CustomerSearchDTO } from "../types/customer.type";

export const customerApi = {

  /** 📌 GET /customer/search */
  search: (params?: CustomerSearchDTO) =>
    axiosClient.get<CustomerDTO[]>("/customer/search", { params }),

  /** 📌 GET /customer/{id} */
  getById: (id: number) =>
    axiosClient.get<CustomerDTO>(`/customer/${id}`),

  /** 📌 POST /customer/public */
  createPublic: (payload: CustomerRequestDTO) =>
    axiosClient.post<CustomerDTO>("/customer/public", payload),

  /** 📌 PUT /customer/{id} */
  update: (id: number, payload: CustomerRequestDTO) =>
    axiosClient.put<CustomerDTO>(`/customer/${id}`, payload),
  
  getMyCustomers: (params?: CustomerSearchDTO) =>
    axiosClient.get<CustomerDTO[]>("/customer/my-customers", { params }),
};