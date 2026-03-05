import { axiosClient } from "@/shared/services/axiosClient";
import { TransactionTypeDTO } from "../types/customer.type";

export const transactionTypeApi = {
  getAll: () => axiosClient.get<TransactionTypeDTO[]>("/transaction-types"),
};