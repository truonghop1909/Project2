import { axiosClient } from "@/shared/services/axiosClient";
import { District } from "../types/dictrict.type";

export const districtApi = {
  getAll() {
    return axiosClient.get<District[]>("/districts");
  },
};
