// src/app/dashboard/staff/buildings/my-buildings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useBuilding } from "@/features/building/hooks/useBuilding";
import BuildingTable from "@/features/building/components/table/BuildingTable";
import BuildingModalHub from "@/features/building/components/modal/BuildingModalHub";
import BuildingDetailModal from "@/features/building/components/detail/BuildingDetailModal";
import BuildingFilter from "@/features/building/components/search/BuildingFilter";
import { BUILDING_PERMISSIONS } from "@/features/building/permissions";

export default function MyBuildingsPage() {
  const {
    myBuildings,
    fetchMyBuildings,
    unassignBuilding,
  } = useBuilding("STAFF");

  const [viewId, setViewId] = useState<number | null>(null);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyBuildings();
  }, [fetchMyBuildings]);

  const handleSearch = (params: any) => {
    fetchMyBuildings(params);
  };

  const reloadData = async () => {
    await fetchMyBuildings();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tòa nhà được giao</h1>
        <button
          onClick={() => {/* mở modal tạo */}}
          className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium"
        >
          + Thêm tòa nhà
        </button>
      </div>

      <BuildingFilter onSearch={handleSearch} />

      <BuildingTable
        buildings={myBuildings ?? []}
        permission={{
          ...BUILDING_PERMISSIONS.STAFF,
          canTake: false,      // không hiển thị nút "Nhận quản lý"
          canUnassign: true,   // hiển thị nút "Bỏ quản lý"
        }}
        onView={(id) => setViewId(id)}
        onEdit={(id) => setEditBuildingId(id)}
        onUnassign={unassignBuilding}
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