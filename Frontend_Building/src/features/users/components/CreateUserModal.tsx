"use client";

import { useState } from "react";
import { userApi } from "../api/user.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateUserModal({ isOpen, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role: "STAFF",     // mặc định STAFF
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await userApi.createUser({
        username: form.username,
        password: form.password,
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        roleCodes: [form.role],   // gửi ["STAFF"] hoặc ["ADMIN"]
      });
      onSuccess();   // reload danh sách
      onClose();     // đóng modal
    } catch (err: any) {
      setError(err.response?.data?.message || "Tạo thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Thêm nhân viên</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên đăng nhập *</label>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu *</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vai trò</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            >
              <option value="STAFF">Nhân viên (STAFF)</option>
              <option value="ADMIN">Quản trị viên (ADMIN)</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Đang tạo..." : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}