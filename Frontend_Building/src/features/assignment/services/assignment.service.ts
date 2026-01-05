import { axiosClient } from "@/shared/services/axiosClient";
import { StaffAssignment, AssignmentRequest } from "../types/assignment.type";

export const assignmentService = {
  loadStaff: (buildingId: number) =>
    axiosClient.get<StaffAssignment[]>(
      `/buildings/${buildingId}/staffs`
    ),

  assignBuilding: (data: AssignmentRequest) =>
    axiosClient.post("/buildings/assignment", data),
};
