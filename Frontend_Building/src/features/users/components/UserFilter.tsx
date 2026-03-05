"use client";

import { useState } from "react";

export default function UserFilter({ onSearch }: any) {
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex items-center gap-4">
        {/* Search */}
        <input
          placeholder="Tìm username / email"
          className="h-10 w-64 rounded-lg border px-4 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Role */}
        <select
          className="h-10 rounded-lg border px-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Tất cả quyền</option>
          <option value="ADMIN">ADMIN</option>
          <option value="STAFF">STAFF</option>
        </select>

        {/* Status */}
        <select
          className="h-10 rounded-lg border px-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="1">Hoạt động</option>
          <option value="0">Bị khóa</option>
        </select>

        {/* Button */}
        <button
          onClick={() =>
            onSearch({
              keyword,
              role,
              status: status ? Number(status) : null,
            })
          }
          className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium
                     hover:bg-gray-800"
        >
          Lọc
        </button>
      </div>
    </div>
  );
}
