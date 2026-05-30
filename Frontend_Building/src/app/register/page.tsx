// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/features/auth/api/authApi";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      await authApi.register({ username: form.username, password: form.password });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">Đăng ký tài khoản</h1>
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">{error}</div>}
        <input className="w-full mb-4 px-4 py-2 border rounded" placeholder="Tên đăng nhập" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
        <input type="password" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Mật khẩu" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <input type="password" className="w-full mb-4 px-4 py-2 border rounded" placeholder="Xác nhận mật khẩu" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} required />
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-400">{loading ? "Đang xử lý..." : "Đăng ký"}</button>
        <p className="text-sm text-center mt-4">Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a></p>
      </form>
    </div>
  );
}