import { setAuthToken } from "@/features/services/axiosClient";

export const logout = () => {
  localStorage.removeItem("token");
  setAuthToken(undefined);
  window.location.href = "/login";
};
