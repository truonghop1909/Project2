"use client";

import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import UserFilter from "../components/UserFilter";
import CreateUserModal from "../components/CreateUserModal";
import { userApi } from "@/features/users/api/user.api";
import { UserDTO } from "@/features/users/types/user";
import { Pagination } from "@/components/common";

export default function AdminUsersView() {
  const [allUsers, setAllUsers] = useState<UserDTO[]>([]);      // toàn bộ dữ liệu từ API
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Phân trang state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = async (filter = {}) => {
    try {
      setLoading(true);
      const res = await userApi.search(filter);
      setAllUsers(res.data);
      setCurrentPage(1); // reset về trang đầu khi tìm kiếm mới
    } finally {
      setLoading(false);
    }
  };

  // Tính toán dữ liệu phân trang
  const totalElements = allUsers.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleUpdateUser = (updatedUser: UserDTO) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý nhân viên</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          + Thêm nhân viên
        </button>
      </div>

      <UserFilter onSearch={fetchUsers} />

      <UserTable
        users={paginatedUsers}
        loading={loading}
        onUpdateUser={handleUpdateUser}
      />

      {/* Phân trang */}
      {!loading && totalElements > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalElements={totalElements}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          showSizeChanger={true}
        />
      )}

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => fetchUsers()}
      />
    </div>
  );
}