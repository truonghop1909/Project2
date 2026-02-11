import { axiosClient } from "../../../shared/services/axiosClient";
import { UserDTO } from "../types/user";

export const userApi = {
  search: (payload: any) =>
    axiosClient.post<UserDTO[]>("/users/search", payload),

  toggleStatus: (id: number) =>
    axiosClient.put<UserDTO>(`/users/${id}/toggle-status`),

  updateRoles: (id: number, roles: string[]) =>
    axiosClient.put<UserDTO>(`/users/${id}/roles`, {
      roleCodes: roles,
    }),
};
