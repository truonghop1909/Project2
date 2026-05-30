export type BuildingPermission = {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAssign: boolean;
  canUnassign?: boolean;  // cho phép admin hủy giao, staff tự bỏ quản lý
  canTake?: boolean;      // chỉ staff nhận quản lý
};

export type BuildingRole = "ADMIN" | "STAFF";

export const BUILDING_PERMISSIONS: Record<BuildingRole, BuildingPermission> = {
  ADMIN: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canAssign: true,
    canUnassign: false,   
    canTake: false,      // admin không nhận quản lý
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