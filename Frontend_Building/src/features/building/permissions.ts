export type BuildingPermission = {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAssign: boolean;
  canUnassign?: boolean;
  canTake?: boolean;
};

export type BuildingRole = "ADMIN" | "STAFF";

export const BUILDING_PERMISSIONS: Record<
  BuildingRole,
  BuildingPermission
> = {
  ADMIN: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canAssign: true,
  },
  STAFF: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canAssign: false,
    canUnassign: true,
    canTake: true,
  },
};
