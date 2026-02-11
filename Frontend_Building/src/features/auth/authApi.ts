import { axiosClient } from "@/shared/services/axiosClient";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  // Backend returns `accessToken` (LoginResponseDTO)
  accessToken?: string;
  // keep `token` for compatibility if any code expects it
  token?: string;
}

export const login = (data: LoginRequest) =>
  axiosClient.post<LoginResponse>("/auth/login", data);

export const register = (data: LoginRequest) =>
  axiosClient.post("/auth/register", data);
