"use client";

import AssignmentModal from "@/features/assignment/components/AssignmentModal";
import BuildingCreateModal from "@/features/building/components/modal/BuildingCreateModal";
import BuildingEditModal from "@/features/building/components/modal/BuildingEditModal";

interface Props {
  assignBuildingId: number | null;
  editBuildingId: number | null;
  showCreate: boolean;
  onCloseAssign: () => void;
  onCloseEdit: () => void;
  onCloseCreate: () => void;
  onSuccess: () => void;
}

export default function BuildingModalHub({
  assignBuildingId,
  editBuildingId,
  showCreate,
  onCloseAssign,
  onCloseEdit,
  onCloseCreate,
  onSuccess,
}: Props) {
  return (
    <>
      {assignBuildingId !== null && (
        <AssignmentModal
          buildingId={assignBuildingId}
          onClose={() => {
            onCloseAssign();
            onSuccess();
          }}
        />
      )}

      {editBuildingId !== null && (
        <BuildingEditModal
          buildingId={editBuildingId}
          onClose={onCloseEdit}
          onSuccess={onSuccess}
        />
      )}

      {showCreate && (
        <BuildingCreateModal onClose={onCloseCreate} onSuccess={onSuccess} />
      )}
    </>
  );
}