import { BuildingSearchDTO } from "../../types/building.type";

interface BuildingTableRowProps {
  building: BuildingSearchDTO;
  permission: any;
  onView?: (id: number) => void;
  onAssign?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onUnassign?: (id: number) => void;
  onTake?: (id: number) => void;
}

function formatNumber(value?: number | null): string {
  if (!value && value !== 0) return "—";
  return value.toLocaleString("vi-VN");
}

function formatCurrency(value?: number | null): string {
  if (!value && value !== 0) return "—";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} triệu`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} nghìn`;
  return `${value.toLocaleString("vi-VN")} đ`;
}

export function BuildingTableRow({ building, permission, onView, onAssign, onEdit, onDelete, onUnassign, onTake }: BuildingTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-3 py-2 max-w-[180px] truncate font-medium" title={building.name || ""}>
        {building.name || "—"}
      </td>
      <td className="px-3 py-2 max-w-[260px] truncate text-gray-600" title={building.address || ""}>
        {building.address || "—"}
      </td>
      <td className="px-3 py-2 text-right">{formatNumber(building.floorArea)} m²</td>
      <td className="px-3 py-2 text-right">{formatCurrency(building.rentPrice)}</td>
      <td className="px-3 py-2 text-right">{formatCurrency(building.serviceFee)}</td>
      <td className="px-3 py-2 max-w-[150px] truncate" title={building.managerName || ""}>
        {building.managerName || "—"}
      </td>
      <td className="px-3 py-2">{building.managerPhone || "—"}</td>
      <td className="px-3 py-2 text-right">{building.brokerageFee ? `${building.brokerageFee}%` : "—"}</td>
      <td className="px-3 py-2 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {onView && (
            <button onClick={() => onView(building.id!)} className="rounded bg-gray-700 px-2 py-1 text-white hover:bg-gray-800 transition text-xs">
              Xem
            </button>
          )}
          {permission.canAssign && onAssign && (
            <button onClick={() => onAssign(building.id!)} className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600 transition text-xs">
              Giao NV
            </button>
          )}
          {permission.canEdit && onEdit && (
            <button onClick={() => onEdit(building.id!)} className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 transition text-xs">
              Sửa
            </button>
          )}
          {permission.canDelete && onDelete && (
            <button onClick={() => onDelete(building.id!)} className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 transition text-xs">
              Xóa
            </button>
          )}
          {permission.canUnassign && onUnassign && (
            <button onClick={() => onUnassign(building.id!)} className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700 transition text-xs">
              Bỏ quản lý
            </button>
          )}
          {permission.canTake && onTake && (
            <button onClick={() => onTake(building.id!)} className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700 transition text-xs">
              Nhận quản lý
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}