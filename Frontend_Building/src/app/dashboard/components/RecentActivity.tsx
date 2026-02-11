export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h3 className="font-semibold mb-4 text-gray-800">
        Hoạt động gần đây
      </h3>

      <ul className="space-y-3 text-sm">
        <li className="flex justify-between text-gray-700">
          <span>
            Admin tạo tòa nhà mới
          </span>
          <span className="text-gray-400">
            2 phút trước
          </span>
        </li>

        <li className="flex justify-between text-gray-700">
          <span>
            Staff A giao khách cho tòa B
          </span>
          <span className="text-gray-400">
            30 phút trước
          </span>
        </li>

        <li className="flex justify-between text-gray-700">
          <span>
            Cập nhật giá thuê tòa C
          </span>
          <span className="text-gray-400">
            Hôm qua
          </span>
        </li>
      </ul>
    </div>
  );
}
