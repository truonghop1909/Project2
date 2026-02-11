"use client";

import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserFilter from "./components/UserFilter";
import { userApi } from "@/features/users/api/user.api";
import { UserDTO } from "@/features/users/types/user";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (filter = {}) => {
    try {
      setLoading(true);
      const res = await userApi.search(filter);
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  /** 🔥 CẬP NHẬT USER TRONG LIST – KHÔNG RELOAD */
  const handleUpdateUser = (updatedUser: UserDTO) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      )
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Quản lý người dùng
      </h1>

      <UserFilter onSearch={fetchUsers} />

      <UserTable
        users={users}
        loading={loading}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
