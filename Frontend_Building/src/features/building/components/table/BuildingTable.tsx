"use client";

import { Building } from "@/features/building/types/building.type";
import { BuildingPermission } from "../../permissions";

interface Props {
  buildings: Building[];
  permission: BuildingPermission;

  // ✅ optional
  onAssign?: (buildingId: number) => void;
  onEdit?: (buildingId: number) => void;
  onDelete?: (buildingId: number) => void;

  // ✅ nếu staff cần xem chi tiết
  onView?: (buildingId: number) => void;
  onUnassign?: (buildingId: number) => void;
  onTake?: (buildingId: number) => void;
}

export default function BuildingTable({
  buildings,
  permission,
  onAssign,
  onEdit,
  onDelete,
  onView,
  onUnassign,
  onTake,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Tên</th>
            <th className="px-3 py-2 text-left">Địa chỉ</th>
            <th className="px-3 py-2 text-right">DT sàn</th>
            <th className="px-3 py-2 text-right">Giá thuê</th>
            <th className="px-3 py-2 text-right">Phí DV</th>
            <th className="px-3 py-2 text-left">QL</th>
            <th className="px-3 py-2 text-left">Điện thoại</th>
            <th className="px-3 py-2 text-right">Hoa hồng</th>
            <th className="px-3 py-2 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {buildings.map((b) => (
            <tr key={b.id} className="hover:bg-gray-50">
              <td className="px-3 py-2 max-w-[180px] truncate font-medium" title={b.name}>
                {b.name}
              </td>

              <td className="px-3 py-2 max-w-[260px] truncate text-gray-600" title={b.address}>
                {b.address}
              </td>

              <td className="px-3 py-2 text-right">{b.floorArea}</td>

              <td className="px-3 py-2 text-right">{formatMoney(b.rentPrice)}</td>

              <td className="px-3 py-2 text-right">{formatMoney(b.serviceFee)}</td>

              <td className="px-3 py-2 max-w-[150px] truncate" title={b.managerName}>
                {b.managerName}
              </td>

              <td className="px-3 py-2">{b.managerPhone}</td>

              <td className="px-3 py-2 text-right">{b.brokerageFee}%</td>

              <td className="px-3 py-2 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {/* ✅ VIEW (ai cũng có thể có) */}
                  {onView && (
                    <button
                      onClick={() => onView(b.id)}
                      className="rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-800"
                    >
                      Xem
                    </button>
                  )}

                  {/* ✅ ASSIGN */}
                  {permission.canAssign && onAssign && (
                    <button
                      onClick={() => onAssign(b.id)}
                      className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    >
                      Giao NV
                    </button>
                  )}

                  {/* ✅ EDIT */}
                  {permission.canEdit && onEdit && (
                    <button
                      onClick={() => onEdit(b.id)}
                      className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                  )}

                  {/* ✅ DELETE */}
                  {permission.canDelete && onDelete && (
                    <button
                      onClick={() => onDelete(b.id)}
                      className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  )}
                  {/* ✅ UNASSIGN */}
                  {permission.canUnassign && onUnassign && (
                    <button
                      onClick={() => onUnassign(b.id)}
                      className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                    >
                      Bỏ quản lý
                    </button>
                  )}
                  {/* ✅ TAKE (STAFF nhận tòa nhà) */}
                  {permission.canTake && onTake && (
                    <button
                      onClick={() => onTake(b.id)}
                      className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700"
                    >
                      Nhận quản lý
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatMoney(value: number) {
  if (value >= 1_000_000) return value.toLocaleString("vi-VN") + " đ";
  return value + " triệu";
}