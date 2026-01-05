export interface StaffAssignment {
  staffId: number;
  fullname: string;
  checked: boolean;
}

export interface AssignmentRequest {
  buildingId: number;
  staffIds: number[];
}
