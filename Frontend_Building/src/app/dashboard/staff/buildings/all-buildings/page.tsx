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
    allBuildings,
    fetchMyBuildings,
    fetchAllBuildings,
    assignBuilding,
  } = useBuilding("STAFF");

  const [viewId, setViewId] = useState<number | null>(null);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyBuildings();   // lấy danh sách đã giao để filter
    fetchAllBuildings();
  }, [fetchMyBuildings, fetchAllBuildings]);

  // Chỉ hiển thị tòa nhà chưa được giao cho staff này
  const availableBuildings = useMemo(() => {
    const myIds = new Set((myBuildings ?? []).map((b) => b.id));
    return (allBuildings ?? []).filter((b) => !myIds.has(b.id));
  }, [myBuildings, allBuildings]);

  const handleSearch = (params: any) => {
    fetchAllBuildings(params);
  };

  const reloadData = async () => {
    await Promise.all([fetchMyBuildings(), fetchAllBuildings()]);
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
        permission={{
          ...BUILDING_PERMISSIONS.STAFF,
          canTake: true,     // hiển thị nút "Nhận quản lý"
          canUnassign: false, // không hiển thị nút "Bỏ quản lý"
        }}
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