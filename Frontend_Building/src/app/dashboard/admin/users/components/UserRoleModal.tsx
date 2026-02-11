"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { UserDTO } from "@/features/users/types/user";
import { userApi } from "@/features/users/api/user.api";

interface UserRoleModalProps {
  user: UserDTO;
  onClose: () => void;
  onUpdateUser: (user: UserDTO) => void;
}

const ALL_ROLES = ["ROLE_ADMIN", "ROLE_STAFF"];

export default function UserRoleModal({
  user,
  onClose,
  onUpdateUser,
}: UserRoleModalProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<string[]>(user.roles ?? []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await userApi.updateRoles(user.id, roles);

      // ✅ Safe update: chỉ update nếu backend trả user data
      if (res.data) {
        onUpdateUser(res.data);
      }
      onClose();
    } catch (error) {
      console.error("Error updating roles:", error);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-80 space-y-4 rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-lg">
          Chỉnh quyền:{" "}
          <span className="text-blue-600">{user.username}</span>
        </h3>

        <div className="space-y-2">
          {ALL_ROLES.map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={roles.includes(role)}
                onChange={() => toggleRole(role)}
              />
              {role.replace("ROLE_", "")}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-3 py-1 rounded border"
            onClick={onClose}
            disabled={loading}
          >
            Hủy
          </button>

          <button
            className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
