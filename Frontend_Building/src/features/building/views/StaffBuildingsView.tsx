"use client";

import { useEffect, useMemo, useState } from "react";
import { useBuilding } from "@/features/building/hooks/useBuilding";
import BuildingDetailModal from "../components/detail/BuildingDetailModal";
import BuildingFilter from "../components/search/BuildingFilter";
import BuildingTable from "@/features/building/components/table/BuildingTable";
import BuildingModalHub from "@/features/building/components/modal/BuildingModalHub";
import { BUILDING_PERMISSIONS } from "@/features/building/permissions";

export default function StaffBuildingsPage() {
  const {
    myBuildings,
    allBuildings,
    fetchMyBuildings,
    fetchAllBuildings,
    unassignBuilding,
    assignBuilding,
    fetchBuildings, // nếu bạn muốn dùng lại
  } = useBuilding("ROLE_STAFF");

  const [viewId, setViewId] = useState<number | null>(null);

  // ✅ thêm state cho modal
  const [showCreate, setShowCreate] = useState(false);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyBuildings();
    fetchAllBuildings();
  }, [fetchMyBuildings, fetchAllBuildings]);

  const availableBuildings = useMemo(() => {
    const myIds = new Set((myBuildings ?? []).map((b) => b.id));
    return (allBuildings ?? []).filter((b) => !myIds.has(b.id));
  }, [myBuildings, allBuildings]);

  const handleSearch = (params: any) => {
    fetchMyBuildings(params);
    fetchAllBuildings(params);
  };

  const reloadBoth = async () => {
    // staff: reload cả 2 bảng để UI đồng bộ
    await Promise.all([fetchMyBuildings(), fetchAllBuildings()]);
  };

  return (
    <div className="space-y-8">
      {/* HEADER + nút tạo */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý tòa nhà</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          + Thêm tòa nhà
        </button>
      </div>

      {/* FILTER */}
      <BuildingFilter onSearch={handleSearch} />

      {/* ====== PHẦN 1: TÒA NHÀ ĐƯỢC GIAO ====== */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Tòa nhà được giao</h2>

        <BuildingTable
          buildings={myBuildings ?? []}
          // ✅ bảng này: cho sửa + bỏ quản lý, không cho nhận
          permission={{ ...BUILDING_PERMISSIONS.STAFF, canTake: false }}
          onView={(id) => setViewId(id)}
          onEdit={(id) => setEditBuildingId(id)}   // ✅ bật sửa
          onUnassign={unassignBuilding}
        />
      </div>

      {/* ====== PHẦN 2: TẤT CẢ TÒA NHÀ ====== */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Tất cả tòa nhà</h2>

        <BuildingTable
          buildings={availableBuildings}
          // ✅ bảng này: cho nhận + cho sửa, không cho bỏ
          permission={{
            ...BUILDING_PERMISSIONS.STAFF,
            canUnassign: false,
            canTake: true,
            // ✅ KHÔNG tắt canEdit nữa
          }}
          onView={(id) => setViewId(id)}
          onTake={assignBuilding}
          onEdit={(id) => setEditBuildingId(id)}  // ✅ thêm sửa ở bảng ALL
        />
      </div>

      {/* MODALS create/edit/assign */}
      <BuildingModalHub
        assignBuildingId={null}
        editBuildingId={editBuildingId}
        showCreate={showCreate}
        onCloseAssign={() => { }}
        onCloseEdit={() => setEditBuildingId(null)}
        onCloseCreate={() => setShowCreate(false)}
        onSuccess={reloadBoth}
      />

      {viewId !== null && (
        <BuildingDetailModal buildingId={viewId} onClose={() => setViewId(null)} />
      )}
    </div>
  );
}