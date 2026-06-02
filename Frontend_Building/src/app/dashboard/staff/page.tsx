"use client";

import { useEffect, useState } from "react";
import { statisticsApi } from "@/features/statistics/api/statistics.api";
import { StaffStatisticsDTO } from "@/features/statistics/types/statistics.type";
import { formatCurrency } from "@/utils/format";
import StatCard from "../components/StatCard";

export default function StaffDashboardPage() {
  const [stats, setStats] = useState<StaffStatisticsDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statisticsApi
      .getStaffStatistics()
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Lỗi tải thống kê staff:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div>;
  if (!stats)
    return <div className="p-6 text-center text-red-500">Không thể tải dữ liệu</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard của {stats.staffName}</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Số building được giao" value={stats.assignedBuildingsCount} />
        <StatCard title="Số khách hàng được giao" value={stats.assignedCustomersCount} />
        <StatCard title="Số giao dịch đã thực hiện" value={stats.transactionsCount} />
        <StatCard title="Doanh thu từ building được giao" value={formatCurrency(stats.totalRevenueFromAssignedBuildings)} />
      </div>

      {/* Recent Customers & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">5 khách hàng mới nhất</h2>
          {stats.recentCustomers.length === 0 ? (
            <p className="text-gray-500">Chưa có khách hàng nào được giao</p>
          ) : (
            <ul className="divide-y">
              {stats.recentCustomers.map((c) => (
                <li key={c.id} className="py-2 flex justify-between">
                  <span>{c.fullname}</span>
                  <span className="text-sm text-gray-500">{c.phone}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">5 giao dịch gần nhất</h2>
          {stats.recentTransactions.length === 0 ? (
            <p className="text-gray-500">Chưa có giao dịch nào</p>
          ) : (
            <ul className="divide-y">
              {stats.recentTransactions.map((t) => (
                <li key={t.id} className="py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{t.transactionTypeName}</span>
                    <span className="text-sm text-gray-500">
                      {t.date ? new Date(t.date).toLocaleDateString("vi-VN") : "Chưa có ngày"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{t.note}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}