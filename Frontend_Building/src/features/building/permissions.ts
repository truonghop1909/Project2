export type BuildingPermission = {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAssign: boolean;
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
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canAssign: false,
  },
};
