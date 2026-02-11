"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/authApi";
import { setAuthToken } from "@/features/services/axiosClient";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  roles?: string[] | string;
  authorities?: string[] | string;
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(form);
      const token = res.data.accessToken;

      if (!token) {
        alert("Không nhận được token");
        return;
      }

      localStorage.setItem("token", token);
      setAuthToken(token);

      // 🔥 Decode JWT để redirect theo role
      const decoded = jwtDecode<JwtPayload>(token);
      const rawRoles =
        decoded.roles ?? decoded.authorities ?? [];
      const roles = Array.isArray(rawRoles)
        ? rawRoles
        : [rawRoles];

      if (roles.includes("ROLE_ADMIN")) {
        router.replace("/dashboard/admin");
      } else if (roles.includes("ROLE_STAFF")) {
        router.replace("/dashboard/staff");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Sai tài khoản hoặc mật khẩu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Đăng nhập hệ thống
        </h1>

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-sm text-center mt-4">
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Đăng ký
          </a>
        </p>
      </form>
    </div>
  );
}
