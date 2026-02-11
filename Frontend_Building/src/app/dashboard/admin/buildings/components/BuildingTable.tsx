"use client";

import BuildingRow from "./BuildingRow";

export default function BuildingTable({
  buildings,
  permission,
  onAssign,
  onEdit,
  onDelete,
  onView,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border w-full overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 text-left">Tên</th>
            <th className="px-6 py-3 text-left">Địa chỉ</th>
            <th className="px-6 py-3 text-center">Tầng hầm</th>
            <th className="px-6 py-3 text-center">Diện tích</th>
            <th className="px-6 py-3 text-center">Giá thuê</th>
            <th className="px-6 py-3 text-center">Quản lý</th>
            <th className="px-6 py-3 text-center">Thao tác</th>
          </tr>
        </thead>


        <tbody>
          {buildings.map((b: any) => (
            <BuildingRow
              key={b.id}
              building={b}
              permission={permission}
              onAssign={onAssign}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
