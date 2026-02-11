export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">
        Dashboard Admin
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Tòa nhà"
          value={128}
          note="+5 tháng này"
        />
        <StatCard
          title="Nhân viên"
          value={24}
          note="Đang hoạt động"
        />
        <StatCard
          title="Khách thuê"
          value={342}
          note="+12 mới"
        />
        <StatCard
          title="Doanh thu"
          value="2.4 tỷ"
          note="Tháng này"
        />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3">
            Thông báo hệ thống
          </h3>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>• Backup dữ liệu lúc 02:00</li>
            <li>• 3 tòa nhà sắp hết hợp đồng</li>
            <li>• 1 nhân viên mới đăng ký</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* IMPORT */
import RecentActivity from "../components/RecentActivity";
import StatCard from "../components/StatCard";

