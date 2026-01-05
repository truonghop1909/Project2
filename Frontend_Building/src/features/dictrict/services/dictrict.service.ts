import { axiosClient } from "@/shared/services/axiosClient";
import { District } from "../types/dictrict.type";

export const districtService = {
  getAll() {
    return axiosClient.get<District[]>("/districts");
  },
};
