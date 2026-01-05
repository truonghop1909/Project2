"use client";

import { useBuilding } from "@/features/building/hooks/useBuilding";
import BuildingTable from "@/features/building/components/BuildingTable";
import BuildingSearchForm from "@/features/building/components/BuildingForm";
import { useState } from "react";
import AssignmentModal from "@/features/assignment/components/AssignmentModal";
import BuildingEditModal from "@/features/building/components/BuildingEditModal";
import BuildingCreateModal from "@/features/building/components/BuildingCreateModal";

export default function Home() {
  const {
    buildings,
    fetchBuildings,
    deleteBuilding,
  } = useBuilding();

  const [assignBuildingId, setAssignBuildingId] = useState<number | null>(null);
  const [editBuildingId, setEditBuildingId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-2xl font-semibold">
        Danh sách tòa nhà
      </h1>

      <div className="mb-4 bg-white p-4 shadow">
        <BuildingSearchForm onSearch={fetchBuildings} />
      </div>

      {/* 🔥 CREATE BUTTON */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowCreate(true)}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          + Thêm tòa nhà
        </button>
      </div>

      <div className="bg-white p-4 shadow">
        <BuildingTable
          buildings={buildings}
          onAssign={setAssignBuildingId}
          onEdit={setEditBuildingId}
          onDelete={deleteBuilding}
        />
      </div>

      {assignBuildingId && (
        <AssignmentModal
          buildingId={assignBuildingId}
          onClose={() => setAssignBuildingId(null)}
        />
      )}

      {editBuildingId && (
        <BuildingEditModal
          buildingId={editBuildingId}
          onClose={() => setEditBuildingId(null)}
          onSuccess={() => fetchBuildings()}
        />
      )}
      {showCreate && (
        <BuildingCreateModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            setShowCreate(false);
            fetchBuildings();
          }}
        />
      )}
    </div>
  );
}

