"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { authApi, LoginRequest } from "../api/authApi";

interface User {
  id: number;
  username: string;
  role: string;
}

interface JwtPayload {
  sub: string;          // username
  userId: number;
  roles: string[];      // ví dụ ["ROLE_STAFF"]
  iat: number;
  authorities?: string[] | string;
  exp: number;
}

const extractUserFromToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const rawRoles = decoded.roles ?? decoded.authorities ?? [];
    const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];

    // Giống code login cũ: kiểm tra sự tồn tại của ADMIN hoặc STAFF
    let role = "USER";
    if (roles.some(r => r === "ADMIN" || r === "ROLE_ADMIN")) {
      role = "ADMIN";
    } else if (roles.some(r => r === "STAFF" || r === "ROLE_STAFF")) {
      role = "STAFF";
    }

    return {
      id: decoded.userId,
      username: decoded.sub,
      role: role,
    };
  } catch {
    return null;
  }
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Khôi phục session từ cookie và decode token
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      const userData = extractUserFromToken(storedToken);
      if (userData) {
        setToken(storedToken);
        setUser(userData);
      } else {
        Cookies.remove("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    const res = await authApi.login(credentials);
    const newToken = res.data.accessToken;
    Cookies.set("token", newToken, { expires: 7, path: "/" });
    const userData = extractUserFromToken(newToken);
    setToken(newToken);
    setUser(userData);

    // Redirect dựa trên role
    if (userData?.role === "ADMIN") router.push("/dashboard/admin");
    else if (userData?.role === "STAFF") router.push("/dashboard/staff");
    else router.push("/dashboard");
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.warn("Logout API failed", error);
    } finally {
      Cookies.remove("token", { path: "/" });
      setToken(null);
      setUser(null);
      router.push("/login");
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAdmin: user?.role === "ADMIN",
    isStaff: user?.role === "STAFF",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}