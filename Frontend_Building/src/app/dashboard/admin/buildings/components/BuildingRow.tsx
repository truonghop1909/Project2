"use client";

export default function BuildingRow({
  building,
  permission,
  onAssign,
  onEdit,
  onDelete,
  onView,
}: any) {
  const handleRowClick = () => {
    onView(building.id);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <tr
      onClick={handleRowClick}
      className="hover:bg-gray-50 transition cursor-pointer"
    >
      {/* TÊN */}
      <td className="px-6 py-4 font-medium">
        <div className="group relative inline-block">
          <span className="text-black group-hover:text-blue-600 transition">
            {building.name}
          </span>

          {/* Hover hint */}
          <div className="absolute left-0 top-full mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
            Click để xem chi tiết
          </div>
        </div>
      </td>

      {/* ĐỊA CHỈ */}
      <td className="px-6 py-4 text-gray-600">
        {building.address || "—"}
      </td>

      {/* TẦNG HẦM */}
      <td className="px-6 py-4 text-center">
        {building.numberOfBasement ?? "—"}
      </td>

      {/* DIỆN TÍCH */}
      <td className="px-6 py-4 text-center">
        {building.floorArea ?? "—"}
      </td>

      {/* GIÁ THUÊ */}
      <td className="px-6 py-4 text-center">
        {building.rentPrice
          ? building.rentPrice.toLocaleString() + " đ"
          : "—"}
      </td>

      {/* QUẢN LÝ */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          {building.managerName || "—"}
        </span>
      </td>

      {/* THAO TÁC */}
      <td
        className="px-6 py-4"
        onClick={stopPropagation}
      >
        <div className="flex justify-center gap-3 text-sm font-medium">
          {permission.canAssign && (
            <button
              onClick={() => onAssign(building.id)}
              className="text-blue-600 hover:underline"
            >
              Giao
            </button>
          )}

          {permission.canEdit && (
            <button
              onClick={() => onEdit(building.id)}
              className="text-yellow-600 hover:underline"
            >
              Sửa
            </button>
          )}

          {permission.canDelete && (
            <button
              onClick={() => onDelete(building.id)}
              className="text-red-600 hover:underline"
            >
              Xóa
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
