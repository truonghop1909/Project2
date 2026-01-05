import { useEffect, useState } from "react";
import { assignmentService } from "../services/assignment.service";
import { StaffAssignment } from "../types/assignment.type";

export const useAssignment = (buildingId: number) => {
  const [staffs, setStaffs] = useState<StaffAssignment[]>([]);

  useEffect(() => {
    if (!buildingId) return;

    assignmentService
      .loadStaff(buildingId)
      .then(res => setStaffs(res.data));
  }, [buildingId]);


  const toggleStaff = (staffId: number) => {
    setStaffs(prev =>
      prev.map(s =>
        s.staffId === staffId
          ? { ...s, checked: !s.checked }
          : s
      )
    );
  };

  const save = async () => {
    const staffIds = staffs
      .filter(s => s.checked)
      .map(s => s.staffId);

    await assignmentService.assignBuilding({
      buildingId,
      staffIds,
    });
  };


  return { staffs, toggleStaff, save };
};
