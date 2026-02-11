"use client";

import { useState } from "react";
import { UserDTO } from "@/features/users/types/user";
import { userApi } from "@/features/users/api/user.api";
import UserRoleModal from "./UserRoleModal";

interface Props {
  user: UserDTO;
  onUpdateUser: (user: UserDTO) => void;
}

export default function UserRow({ user, onUpdateUser }: Props) {
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const toggleStatus = async () => {
    try {
      setLoadingStatus(true);
      const res = await userApi.toggleStatus(user.id);

      // ✅ Update UI ngay khi backend trả user data
      if (res.data) {
        onUpdateUser(res.data);
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Lỗi: Không thể thay đổi trạng thái người dùng");
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-6 py-4 font-medium">{user.username}</td>

        <td className="px-6 py-4 text-gray-600">
          {user.email || "—"}
        </td>

        <td className="px-6 py-4 text-center">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {user.roles?.length > 0 ? user.roles.join(", ") : "—"}
          </span>
        </td>

        <td className="px-6 py-4 text-center">
          {user.status === 1 ? (
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
              Hoạt động
            </span>
          ) : (
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
              Bị khóa
            </span>
          )}
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="text-blue-600 hover:underline text-sm font-medium disabled:opacity-50"
              disabled={loadingStatus}
            >
              Quyền
            </button>

            <button
              onClick={toggleStatus}
              disabled={loadingStatus}
              className={`min-w-[80px] text-center text-sm font-medium disabled:opacity-50 ${user.status === 1
                  ? "text-red-600 hover:underline"
                  : "text-green-600 hover:underline"
                }`}
            >

              {loadingStatus ? "Đang xử lý..." : user.status === 1 ? "Khóa" : "Mở"}
            </button>
          </div>
        </td>
      </tr>

      {open && (
        <UserRoleModal
          user={user}
          onClose={() => setOpen(false)}
          onUpdateUser={onUpdateUser}
        />
      )}
    </>
  );
}

