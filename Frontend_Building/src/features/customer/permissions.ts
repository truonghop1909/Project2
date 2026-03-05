export type CustomerPermission = {
  canCreate: boolean;
  canEdit: boolean;
  canAssign: boolean;
  canViewTransactions: boolean;
  // backend chưa có delete -> không đưa
  // ✅ thêm cho staff page
  canUnassign?: boolean;
  canTake?: boolean;
};

export type CustomerRole = "ADMIN" | "STAFF";

export const CUSTOMER_PERMISSIONS: Record<CustomerRole, CustomerPermission> = {
  ADMIN: {
    canCreate: true,
    canEdit: true,
    canAssign: true,
    canViewTransactions: true,
  },
  STAFF: {
    canCreate: true,
    canEdit: true,
    canUnassign: true,
    canAssign: false, // staff tự nhận bằng assignCurrent/unassignCurrent
    canViewTransactions: true,
  },
};