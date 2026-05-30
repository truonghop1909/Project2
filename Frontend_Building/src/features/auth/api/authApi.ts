import { axiosClient } from "@/shared/services/axiosClient";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;   // thay vì token
  tokenType: string;
  role: string;
  userId: number;
  username: string;
}

export const authApi = {
  login: (data: LoginRequest) =>
    axiosClient.post<LoginResponse>("/auth/login", data),

  logout: () =>
    axiosClient.post("/auth/logout"),

  getMe: () =>
    axiosClient.get<{ id: number; username: string; role: string }>("/auth/me"),

  register: (data: LoginRequest) =>
    axiosClient.post("/auth/register", data),
};