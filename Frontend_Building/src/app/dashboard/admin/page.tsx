"use client";

import { useEffect, useState } from "react";
import { statisticsApi } from "@/features/statistics/api/statistics.api";
import { AdminStatisticsDTO } from "@/features/statistics/types/statistics.type";
import { BarChartProvince } from "@/features/statistics/components/BarChartProvince";
import { PieCustomerStatus } from "@/features/statistics/components/PieCustomerStatus";
import { LineTransaction } from "@/features/statistics/components/LineTransaction";
import { TopTable } from "@/features/statistics/components/TopTable";
import StatCard from "../components/StatCard";

// Helper format tiền tệ (nếu chưa có, thêm vào utils/format.ts)
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStatisticsDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statisticsApi
      .getAdminDashboard()
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Lỗi tải thống kê:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div>
    );
  if (!stats)
    return (
      <div className="p-6 text-center text-red-500">
        Không thể tải dữ liệu thống kê
      </div>
    );

  // Chuẩn bị dữ liệu cho bảng
  const buildingColumns = [
    { header: "Tên tòa nhà", accessor: "name" },
    { header: "Tỉnh/TP", accessor: "provinceName" },
    { header: "Giá thuê (VND)", accessor: "rentPrice" },
  ];
  const buildingData = stats.top5HighestRentBuildings.map((b) => ({
    name: b.name,
    provinceName: b.provinceName,
    rentPrice: formatCurrency(b.rentPrice),
  }));

  const staffBuildingColumns = [
    { header: "Nhân viên", accessor: "staffName" },
    { header: "Số building", accessor: "totalBuildings" },
  ];
  const staffBuildingData = stats.top3StaffByBuildings.map((s) => ({
    staffName: s.staffName,
    totalBuildings: s.totalBuildings ?? 0,
  }));

  const staffCustomerColumns = [
    { header: "Nhân viên", accessor: "staffName" },
    { header: "Số khách hàng", accessor: "totalCustomers" },
  ];
  const staffCustomerData = stats.top3StaffByCustomers.map((s) => ({
    staffName: s.staffName,
    totalCustomers: s.totalCustomers ?? 0,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Admin</h1>

      {/* Hàng 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Tổng số tòa nhà" value={stats.totalBuildings} />
        <StatCard
          title="Tổng diện tích sàn"
          value={`${stats.totalFloorArea.toLocaleString()} m²`}
        />
        <StatCard
          title="Doanh thu kỳ vọng"
          value={formatCurrency(stats.totalExpectedRevenue)}
        />
        <StatCard title="Tổng khách hàng" value={stats.totalCustomers} />
        <StatCard title="Khách chờ duyệt" value={stats.pendingCustomers} />
        <StatCard title="Tổng giao dịch" value={stats.totalTransactions} />
        <StatCard
          title="Nhân viên hoạt động"
          value={stats.totalActiveStaff}
        />
        <StatCard
          title="Tỉ lệ sử dụng NV"
          value={`${stats.staffUtilizationRate.toFixed(1)}%`}
        />
        <StatCard title="Số ảnh đã upload" value={stats.totalImages} />
        <StatCard
          title="Tòa nhà có ảnh đại diện"
          value={stats.buildingsWithThumbnail}
        />
      </div>

      {/* Hàng 2: Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">
            Số lượng tòa nhà theo tỉnh
          </h2>
          <BarChartProvince data={stats.buildingsByProvince} />
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Trạng thái khách hàng</h2>
          <PieCustomerStatus
            pending={stats.pendingCustomers}
            approved={stats.approvedCustomers}
            rejected={stats.rejectedCustomers}
          />
        </div>
      </div>

      {/* Hàng 3: Giao dịch theo tháng */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">
          Số lượng giao dịch theo tháng
        </h2>
        <LineTransaction data={stats.transactionsByMonth} />
      </div>

      {/* Hàng 4: Các bảng top */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopTable
          title="Top 5 tòa nhà giá thuê cao nhất"
          data={buildingData}
          columns={buildingColumns}
        />
        <TopTable
          title="Top 3 nhân viên có nhiều building nhất"
          data={staffBuildingData}
          columns={staffBuildingColumns}
        />
        <TopTable
          title="Top 3 nhân viên có nhiều khách hàng nhất"
          data={staffCustomerData}
          columns={staffCustomerColumns}
        />
      </div>

      {/* Hàng 5: Thông tin bổ sung */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">
            Thời gian duyệt trung bình
          </h2>
          <p className="text-2xl">
            {stats.averageApprovalTimeHours.toFixed(1)} giờ
          </p>
          <p className="text-sm text-gray-500">
            ~ {(stats.averageApprovalTimeHours / 24).toFixed(1)} ngày
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Phân bố loại giao dịch</h2>
          <ul className="space-y-1">
            {Object.entries(stats.transactionsByType).map(([type, count]) => (
              <li key={type} className="flex justify-between">
                <span>{type}</span>
                <span className="font-medium">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}