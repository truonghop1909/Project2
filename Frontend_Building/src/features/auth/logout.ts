import { setAuthToken } from "@/shared/services/axiosClient";

export const logout = () => {
  localStorage.removeItem("token");
  setAuthToken(undefined);
  window.location.href = "/login";
};
