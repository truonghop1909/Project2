// src/app/dashboard/staff/buildings/all-buildings/page.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
import { useBuilding } from "@/features/building/hooks/useBuilding";
import BuildingTable from "@/features/building/components/table/BuildingTable";
import BuildingModalHub from "@/features/building/components/modal/BuildingModalHub";
import BuildingDetailModal from "@/features/building/components/detail/BuildingDetailModal";
import BuildingFilter from "@/features/building/components/search/BuildingFilter";
import { BUILDING_PERMISSIONS } from "@/features/building/permissions";

export default function AllBuildingsPage() {
  const {
    myBuildings,
    paginatedAllBuildings,  // ✅ Dùng dữ liệu đã phân trang
    allPagination,
    loading,
    fetchMyBuildings,
    fetchAllBuildings,
    assignBuilding,
    goToAllPage,
    changeAllPageSize,
  } = useBuilding("STAFF");

  const [viewId, setViewId] = useState<number | null>(null);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchMyBuildings();
    fetchAllBuildings(filters);
  }, [fetchMyBuildings, fetchAllBuildings, filters]);

  // Lấy danh sách ID đã giao
  const myBuildingIds = useMemo(() => {
    return new Set((myBuildings ?? []).map((b) => b.id));
  }, [myBuildings]);

  // Lọc ra tòa nhà chưa được giao (từ dữ liệu đã phân trang)
  const availableBuildings = useMemo(() => {
    return (paginatedAllBuildings ?? []).filter((b) => !myBuildingIds.has(b.id));
  }, [paginatedAllBuildings, myBuildingIds]);

  const handleSearch = (params: any) => {
    setFilters(params);
    fetchAllBuildings(params);
  };

  const reloadData = async () => {
    await Promise.all([fetchMyBuildings(), fetchAllBuildings(filters)]);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tất cả tòa nhà</h1>
        <button
          onClick={() => {/* mở modal tạo */}}
          className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium"
        >
          + Thêm tòa nhà
        </button>
      </div>

      <BuildingFilter onSearch={handleSearch} />

      <BuildingTable
        buildings={availableBuildings}
        loading={loading}
        permission={{
          ...BUILDING_PERMISSIONS.STAFF,
          canTake: true,
          canUnassign: false,
        }}
        pagination={allPagination}
        onPageChange={goToAllPage}
        onPageSizeChange={changeAllPageSize}
        showPagination={true}
        onView={(id) => setViewId(id)}
        onEdit={(id) => setEditBuildingId(id)}
        onTake={assignBuilding}
      />

      <BuildingModalHub
        assignBuildingId={null}
        editBuildingId={editBuildingId}
        showCreate={false}
        onCloseAssign={() => {}}
        onCloseEdit={() => setEditBuildingId(null)}
        onCloseCreate={() => {}}
        onSuccess={reloadData}
      />

      {viewId !== null && (
        <BuildingDetailModal buildingId={viewId} onClose={() => setViewId(null)} />
      )}
    </div>
  );
}