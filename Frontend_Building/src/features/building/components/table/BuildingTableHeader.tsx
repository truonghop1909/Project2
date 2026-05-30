export function BuildingTableHeader() {
  return (
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="px-3 py-2 text-left">Tên</th>
        <th className="px-3 py-2 text-left">Địa chỉ</th>
        <th className="px-3 py-2 text-right">DT sàn (m²)</th>
        <th className="px-3 py-2 text-right">Giá thuê</th>
        <th className="px-3 py-2 text-right">Phí DV</th>
        <th className="px-3 py-2 text-left">QL</th>
        <th className="px-3 py-2 text-left">Điện thoại</th>
        <th className="px-3 py-2 text-right">Hoa hồng</th>
        <th className="px-3 py-2 text-center">Thao tác</th>
      </tr>
    </thead>
  );
}