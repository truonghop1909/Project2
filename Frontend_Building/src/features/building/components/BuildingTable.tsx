"use client";

import { Building } from "@/features/building/types/building.type";

interface Props {
  buildings: Building[];
  onAssign: (buildingId: number) => void;
  onEdit: (buildingId: number) => void;
  onDelete: (buildingId: number) => void;
}

export default function BuildingTable({
  buildings,
  onAssign,
  onEdit,
  onDelete,
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
              {/* TÊN */}
              <td className="px-3 py-2 max-w-[180px] truncate font-medium"
                title={b.name}>
                {b.name}
              </td>

              {/* ĐỊA CHỈ */}
              <td className="px-3 py-2 max-w-[260px] truncate text-gray-600"
                title={b.address}>
                {b.address}
              </td>

              {/* DT SÀN */}
              <td className="px-3 py-2 text-right">
                {b.floorArea}
              </td>

              {/* GIÁ THUÊ */}
              <td className="px-3 py-2 text-right">
                {formatMoney(b.rentPrice)}
              </td>

              {/* PHÍ DV */}
              <td className="px-3 py-2 text-right">
                {formatMoney(b.serviceFee)}
              </td>

              {/* QL */}
              <td className="px-3 py-2 max-w-[150px] truncate"
                title={b.managerName}>
                {b.managerName}
              </td>

              {/* ĐIỆN THOẠI */}
              <td className="px-3 py-2">
                {b.managerPhone}
              </td>

              {/* HOA HỒNG */}
              <td className="px-3 py-2 text-right">
                {b.brokerageFee}%
              </td>

              {/* ACTION */}
              <td className="px-3 py-2 text-center space-x-2">
                <button
                  onClick={() => {
                    console.log("CLICK GIAO NV:", b.id);
                    onAssign(b.id)
                  }
                  }
                  className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                >
                  Giao NV
                </button>
                <button
                  onClick={() => onEdit(b.id)}
                  className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                >
                  Sửa
                </button>

                <button
                  onClick={() => onDelete(b.id)}
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  Xóa
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= HELPER ================= */
function formatMoney(value: number) {
  if (value >= 1_000_000) {
    return value.toLocaleString("vi-VN") + " đ";
  }
  return value + " triệu";
}
