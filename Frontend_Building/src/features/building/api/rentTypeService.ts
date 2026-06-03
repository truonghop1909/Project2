import { axiosClient } from "@/shared/services/axiosClient";
import { RentType } from "../types/rentType.type";

export const getRentTypes = async (): Promise<RentType[]> => {
  const response = await axiosClient.get<RentType[]>("/rent-types");
  return response.data;
};