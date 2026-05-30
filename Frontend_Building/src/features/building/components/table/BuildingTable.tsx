"use client";

import { BuildingSearchDTO } from "@/features/building/types/building.type";
import { BuildingPermission } from "../../permissions";
import { Pagination } from "@/shared/components/ui/Pagination";

interface Props {
  buildings: BuildingSearchDTO[];
  permission: BuildingPermission;
  loading?: boolean;
  
  // Pagination props
  pagination?: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPagination?: boolean;

  // Actions
  onAssign?: (buildingId: number) => void;
  onEdit?: (buildingId: number) => void;
  onDelete?: (buildingId: number) => void;
  onView?: (buildingId: number) => void;
  onUnassign?: (buildingId: number) => void;
  onTake?: (buildingId: number) => void;
}

export default function BuildingTable({
  buildings,
  permission,
  loading = false,
  pagination,
  onPageChange,
  onPageSizeChange,
  showPagination = true,
  onAssign,
  onEdit,
  onDelete,
  onView,
  onUnassign,
  onTake,
}: Props) {
  // Hiển thị loading
  if (loading) {
    return (
      <div className="rounded-lg border bg-white">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
                <td className="px-3 py-2 max-w-[180px] truncate font-medium" title={b.name || ""}>
                  {b.name || "—"}
                </td>
                <td className="px-3 py-2 max-w-[260px] truncate text-gray-600" title={b.address || ""}>
                  {b.address || "—"}
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
                <td className="px-3 py-2 max-w-[150px] truncate" title={b.managerName || ""}>
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
                    {onView && (
                      <button
                        onClick={() => onView(b.id!)}
                        className="rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-800 transition text-xs"
                      >
                        Xem
                      </button>
                    )}
                    {permission.canAssign && onAssign && (
                      <button
                        onClick={() => onAssign(b.id!)}
                        className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 transition text-xs"
                      >
                        Giao NV
                      </button>
                    )}
                    {permission.canEdit && onEdit && (
                      <button
                        onClick={() => onEdit(b.id!)}
                        className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 transition text-xs"
                      >
                        Sửa
                      </button>
                    )}
                    {permission.canDelete && onDelete && (
                      <button
                        onClick={() => onDelete(b.id!)}
                        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 transition text-xs"
                      >
                        Xóa
                      </button>
                    )}
                    {permission.canUnassign && onUnassign && (
                      <button
                        onClick={() => onUnassign(b.id!)}
                        className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700 transition text-xs"
                      >
                        Bỏ quản lý
                      </button>
                    )}
                    {permission.canTake && onTake && (
                      <button
                        onClick={() => onTake(b.id!)}
                        className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700 transition text-xs"
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

      {/* Phân trang */}
      {showPagination && pagination && onPageChange && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          pageSize={pagination.size}
          totalElements={pagination.totalElements}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showSizeChanger={true}
        />
      )}
      
      {/* Hiển thị thông tin phân trang đơn giản khi chỉ có 1 trang */}
      {showPagination && pagination && pagination.totalPages === 1 && pagination.totalElements > 0 && (
        <div className="text-center text-sm text-gray-500 py-2">
          Hiển thị {buildings.length} / {pagination.totalElements} kết quả
        </div>
      )}
    </div>
  );
}

// ==================== HELPER FUNCTIONS ====================

function formatNumber(value?: number | null): string {
  if (!value && value !== 0) return "—";
  return value.toLocaleString("vi-VN");
}

function formatCurrency(value?: number | null): string {
  if (!value && value !== 0) return "—";
  
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  }
  
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} triệu`;
  }
  
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)} nghìn`;
  }
  
  return `${value.toLocaleString("vi-VN")} đ`;
}