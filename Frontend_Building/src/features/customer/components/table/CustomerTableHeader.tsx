export function CustomerTableHeader() {
  return (
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-3 py-2 text-left">Họ tên</th>
        <th className="px-3 py-2 text-left">SĐT</th>
        <th className="px-3 py-2 text-left">Email</th>
        <th className="px-3 py-2 text-left">Nhu cầu</th>
        <th className="px-3 py-2 text-left">Ghi chú</th>
        <th className="px-3 py-2 text-left">Trạng thái</th>
        <th className="px-3 py-2 text-center w-[320px]">Thao tác</th>
      </tr>
    </thead>
  );
}