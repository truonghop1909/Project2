"use client";

import { Building, BuildingSearchDTO } from "@/features/building/types/building.type";
import { BuildingPermission } from "../../permissions";

interface Props {
  buildings: Building[] | BuildingSearchDTO[];  // 👈 nhận cả 2 kiểu
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
            <th className="px-3 py-2 text-right">DT sàn (m²)</th>
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

              <td className="px-3 py-2 text-right">
                {formatNumber(b.floorArea)} m²
              </td>

              <td className="px-3 py-2 text-right">
                {formatCurrency(b.rentPrice)}
              </td>

              <td className="px-3 py-2 text-right">
                {formatCurrency(b.serviceFee)}
              </td>

              <td className="px-3 py-2 max-w-[150px] truncate" title={b.managerName}>
                {b.managerName || "—"}
              </td>

              <td className="px-3 py-2">
                {b.managerPhone || "—"}
              </td>

              <td className="px-3 py-2 text-right">
                {b.brokerageFee ? `${b.brokerageFee}%` : "—"}
              </td>

              <td className="px-3 py-2 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {/* ✅ VIEW (ai cũng có thể có) */}
                  {onView && (
                    <button
                      onClick={() => onView(b.id)}
                      className="rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-800 transition"
                    >
                      Xem
                    </button>
                  )}

                  {/* ✅ ASSIGN */}
                  {permission.canAssign && onAssign && (
                    <button
                      onClick={() => onAssign(b.id)}
                      className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 transition"
                    >
                      Giao NV
                    </button>
                  )}

                  {/* ✅ EDIT */}
                  {permission.canEdit && onEdit && (
                    <button
                      onClick={() => onEdit(b.id)}
                      className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 transition"
                    >
                      Sửa
                    </button>
                  )}

                  {/* ✅ DELETE */}
                  {permission.canDelete && onDelete && (
                    <button
                      onClick={() => onDelete(b.id)}
                      className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 transition"
                    >
                      Xóa
                    </button>
                  )}
                  
                  {/* ✅ UNASSIGN */}
                  {permission.canUnassign && onUnassign && (
                    <button
                      onClick={() => onUnassign(b.id)}
                      className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700 transition"
                    >
                      Bỏ quản lý
                    </button>
                  )}
                  
                  {/* ✅ TAKE (STAFF nhận tòa nhà) */}
                  {permission.canTake && onTake && (
                    <button
                      onClick={() => onTake(b.id)}
                      className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700 transition"
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
      
      {/* Hiển thị khi không có dữ liệu */}
      {buildings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không có dữ liệu tòa nhà
        </div>
      )}
    </div>
  );
}

// Helper functions
function formatNumber(value?: number): string {
  if (!value && value !== 0) return "—";
  return value.toLocaleString("vi-VN");
}

function formatCurrency(value?: number): string {
  if (!value && value !== 0) return "—";
  
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  }
  
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} triệu`;
  }
  
  return `${value.toLocaleString("vi-VN")} đ`;
}

// Nếu bạn muốn format chính xác theo kiểu cũ:
function formatMoneyLegacy(value?: number): string {
  if (!value && value !== 0) return "—";
  
  if (value >= 1_000_000) {
    return value.toLocaleString("vi-VN") + " đ";
  }
  return value + " triệu";
}