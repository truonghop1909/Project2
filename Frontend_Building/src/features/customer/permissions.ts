export type CustomerPermission = {
  canCreate: boolean;
  canEdit: boolean;
  canAssign: boolean;
  canViewTransactions: boolean;
  // backend chưa có delete -> không đưa
  // ✅ thêm cho staff page
  canUnassign?: boolean;
  canTake?: boolean;
  canApprove?: boolean;
  canReject?: boolean;
};

export type CustomerRole = "ADMIN" | "STAFF";

export const CUSTOMER_PERMISSIONS: Record<CustomerRole, CustomerPermission> = {
  ADMIN: {
    canCreate: true,
    canEdit: true,
    canAssign: true,
    canViewTransactions: true,
    canApprove: true,
    canReject: true,
  },
  STAFF: {
    canCreate: false,
    canEdit: false,
    canUnassign: true,
    canAssign: false, // staff tự nhận bằng assignCurrent/unassignCurrent
    canViewTransactions: true,
    canApprove: false,
    canReject: false,
  },
};