"use client";

import { useEffect, useState } from "react";
import { statisticsApi } from "@/features/statistics/api/statistics.api";
import { TopStaffTransactionDTO } from "@/features/statistics/types/statistics.type";
import { Users, Trophy } from "lucide-react";

export function TopStaffSection() {
  const [staffs, setStaffs] = useState<TopStaffTransactionDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statisticsApi.getTop5StaffByTransactions()
      .then(res => setStaffs(res.data))
      .catch(err => console.error("Lỗi tải top staff:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Đang tải...</div>;
  if (staffs.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">👨‍💼 Nhân viên giao dịch xuất sắc</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {staffs.map((staff, idx) => (
          <div key={staff.staffId} className="bg-white rounded-xl shadow-md p-6 text-center transform hover:scale-105 transition duration-300">
            <div className="relative">
              {idx === 0 && <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />}
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            </div>
            <div className="text-xl font-semibold text-gray-800">{staff.staffName}</div>
            <div className="text-3xl font-bold text-green-600 my-2">{staff.transactionCount}</div>
            <div className="text-sm text-gray-500">giao dịch</div>
            {idx === 0 && <div className="mt-2 text-xs font-semibold text-yellow-600">🥇 Quán quân</div>}
            {idx === 1 && <div className="mt-2 text-xs font-semibold text-gray-500">🥈 Á quân</div>}
            {idx === 2 && <div className="mt-2 text-xs font-semibold text-amber-600">🥉 Hạng ba</div>}
          </div>
        ))}
      </div>
    </section>
  );
}