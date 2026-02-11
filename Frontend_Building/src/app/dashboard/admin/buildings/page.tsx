"use client";

import { useState } from "react";
import AuthGuard from "@/features/auth/components/AuthGuard";
import { useBuilding } from "@/features/building/hooks/useBuilding";
import { BUILDING_PERMISSIONS } from "@/features/building/permissions";

import BuildingTable from "./components/BuildingTable";
import BuildingFilter from "./components/BuildingFilter";
import BuildingModal from "./components/BuildingModal";
import BuildingDetailModal from "./components/BuildingDetailModal";

export default function BuildingPage() {
  const {
    buildings,
    fetchBuildings,
    deleteBuilding,
  } = useBuilding();
  const [viewBuildingId, setViewBuildingId] = useState<number | null>(null);
  const [assignBuildingId, setAssignBuildingId] = useState<number | null>(null);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <AuthGuard requiredRole="ADMIN">
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">
              Danh sách tòa nhà
            </h1>

            <button
              onClick={() => setShowCreate(true)}
              className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium
                         hover:bg-gray-800 transition"
            >
              + Thêm tòa nhà
            </button>
          </div>

          {/* FILTER */}
          <BuildingFilter onSearch={fetchBuildings} />

          {/* TABLE */}
          <BuildingTable
            buildings={buildings}
            permission={BUILDING_PERMISSIONS.ADMIN}
            onAssign={setAssignBuildingId}
            onEdit={setEditBuildingId}
            onDelete={deleteBuilding}
            onView={setViewBuildingId}
          />


        </div>

        {/* MODALS */}
        <BuildingModal
          assignBuildingId={assignBuildingId}
          editBuildingId={editBuildingId}
          showCreate={showCreate}
          onCloseAssign={() => setAssignBuildingId(null)}
          onCloseEdit={() => setEditBuildingId(null)}
          onCloseCreate={() => setShowCreate(false)}
          onSuccess={fetchBuildings}
        />
        {viewBuildingId && (
          <BuildingDetailModal
            buildingId={viewBuildingId}
            onClose={() => setViewBuildingId(null)}
          />
        )}

      </div>
    </AuthGuard>
  );
}
