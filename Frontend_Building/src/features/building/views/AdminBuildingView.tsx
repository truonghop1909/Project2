"use client";

import { useEffect, useMemo, useState } from "react";
import { useBuilding } from "@/features/building/hooks/useBuilding";
import { BUILDING_PERMISSIONS } from "@/features/building/permissions";
import BuildingFilter from "../components/search/BuildingFilter";
import BuildingModalHub from "../components/modal/BuildingModalHub";
import BuildingDetailModal from "../components/detail/BuildingDetailModal";
import BuildingTable from "@/features/building/components/table/BuildingTable";

export default function AdminBuildingPage() {
  const {
    paginatedAllBuildings,      // dữ liệu đã cắt theo trang hiện tại
    allPagination,              // thông tin phân trang
    fetchAllBuildings,
    goToAllPage,
    changeAllPageSize,
    unassignBuilding,
    deleteBuilding,
    loading,
  } = useBuilding("ADMIN");      // ✅ dùng "ADMIN"

  const [viewBuildingId, setViewBuildingId] = useState<number | null>(null);
  const [assignBuildingId, setAssignBuildingId] = useState<number | null>(null);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Load dữ liệu lần đầu
  useEffect(() => {
    fetchAllBuildings();
  }, [fetchAllBuildings]);

  // Reload sau khi tạo/sửa/giao/xóa
  const reloadData = () => fetchAllBuildings();

  // Chia làm 2 mảng: đã giao (có managerName) và chưa giao
  const assignedBuildings = useMemo(
    () => paginatedAllBuildings.filter((b) => b.managerName && b.managerName.trim() !== ""),
    [paginatedAllBuildings]
  );
  const unassignedBuildings = useMemo(
    () => paginatedAllBuildings.filter((b) => !b.managerName || b.managerName.trim() === ""),
    [paginatedAllBuildings]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Quản lý tòa nhà (Admin)
          </h1>
          <button
            onClick={() => setShowCreate(true)}
            className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            + Thêm tòa nhà
          </button>
        </div>

        {/* FILTER */}
        <BuildingFilter onSearch={fetchAllBuildings} />

        {/* BẢNG 1: TÒA NHÀ ĐÃ GIAO */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Tòa nhà đã được giao</h2>
          <BuildingTable
            buildings={assignedBuildings}
            permission={BUILDING_PERMISSIONS.ADMIN}
            loading={loading}
            pagination={allPagination}
            onPageChange={goToAllPage}
            onPageSizeChange={changeAllPageSize}
            onAssign={(id) => setAssignBuildingId(id)}     // giao lại cho staff khác
            onUnassign={unassignBuilding}                  // hủy giao
            onEdit={(id) => setEditBuildingId(id)}
            onDelete={deleteBuilding}
            onView={setViewBuildingId}
          />
        </div>

        {/* BẢNG 2: TÒA NHÀ CHƯA GIAO */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Tòa nhà chưa được giao</h2>
          <BuildingTable
            buildings={unassignedBuildings}
            permission={BUILDING_PERMISSIONS.ADMIN}
            loading={loading}
            pagination={allPagination}
            onPageChange={goToAllPage}
            onPageSizeChange={changeAllPageSize}
            onAssign={(id) => setAssignBuildingId(id)}     // giao cho staff
            onEdit={(id) => setEditBuildingId(id)}
            onDelete={deleteBuilding}
            onView={setViewBuildingId}
          />
        </div>
      </div>

      {/* MODAL HUB */}
      <BuildingModalHub
        assignBuildingId={assignBuildingId}
        editBuildingId={editBuildingId}
        showCreate={showCreate}
        onCloseAssign={() => setAssignBuildingId(null)}
        onCloseEdit={() => setEditBuildingId(null)}
        onCloseCreate={() => setShowCreate(false)}
        onSuccess={reloadData}
      />

      {/* MODAL CHI TIẾT */}
      {viewBuildingId !== null && (
        <BuildingDetailModal
          buildingId={viewBuildingId}
          onClose={() => setViewBuildingId(null)}
        />
      )}
    </div>
  );
}