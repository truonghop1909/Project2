"use client";
import { Building2, Users, UserCheck, FileText } from "lucide-react";

export default function ReportsPage() {
  // Dữ liệu tượng trưng
  const stats = [
    { title: "Tổng số tòa nhà", value: 128, icon: Building2, change: "+5", color: "blue" },
    { title: "Tổng số khách hàng", value: 342, icon: Users, change: "+12", color: "green" },
    { title: "Nhân viên đang hoạt động", value: 24, icon: UserCheck, change: "0", color: "yellow" },
    { title: "Yêu cầu chờ duyệt", value: 8, icon: FileText, change: "+3", color: "red" },
  ];

  const recentRequests = [
    { id: 1, name: "Nguyễn Văn A", phone: "0912345678", demand: "Thuê văn phòng 50m²", status: "pending" },
    { id: 2, name: "Trần Thị B", phone: "0987654321", demand: "Thuê mặt bằng kinh doanh", status: "pending" },
    { id: 3, name: "Lê Văn C", phone: "0909090909", demand: "Thuê kho xưởng 200m²", status: "approved" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Báo cáo & Thống kê</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            yellow: "bg-yellow-100 text-yellow-600",
            red: "bg-red-100 text-red-600",
          };
          return (
            <div key={stat.title} className="bg-white rounded-xl border p-5 shadow-sm hover:shadow transition">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold mt-4">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-800">Yêu cầu liên hệ gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Khách hàng</th>
                <th className="px-6 py-3 text-left">SĐT</th>
                <th className="px-6 py-3 text-left">Nhu cầu</th>
                <th className="px-6 py-3 text-left">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{req.name}</td>
                  <td className="px-6 py-3">{req.phone}</td>
                  <td className="px-6 py-3">{req.demand}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      req.status === "pending" 
                        ? "bg-yellow-100 text-yellow-700" 
                        : "bg-green-100 text-green-700"
                    }`}>
                      {req.status === "pending" ? "Chờ duyệt" : "Đã duyệt"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t text-center text-sm text-gray-500">
          <button className="text-blue-600 hover:underline">Xem tất cả yêu cầu →</button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Biểu đồ tương tác (demo)</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          [Biểu đồ doanh thu / số lượng khách hàng theo tháng]
        </div>
      </div>
    </div>
  );
}