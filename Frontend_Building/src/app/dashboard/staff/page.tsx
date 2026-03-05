"use client";

import RecentActivity from "../components/RecentActivity";
import StatCard from "../components/StatCard";



export default function StaffDashboardPage() {
  const activities = [
    { content: "Bạn được giao tòa A", time: "5 phút trước" },
    { content: "Cập nhật trạng thái khách B", time: "1 giờ trước" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">
        Dashboard Staff
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          title="Tòa nhà được giao"
          value={8}
        />
        <StatCard
          title="Khách đang xử lý"
          value={14}
        />
        <StatCard
          title="Hợp đồng sắp hết hạn"
          value={3}
        />
      </div>

      <RecentActivity
        title="Hoạt động của tôi"
        activities={activities}
      />
    </div>
  );
}
