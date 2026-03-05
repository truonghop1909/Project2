import { axiosClient } from "@/shared/services/axiosClient";

export const assignmentApi = {
  getAssignedStaff(buildingId: number) {
  return axiosClient.get(`/building/${buildingId}/staffs`);
},


  assignBuilding(data: {
    buildingId: number;
    staffIds: number[];
  }) {
    return axiosClient.post("/building/assignment", data);
  },
};
