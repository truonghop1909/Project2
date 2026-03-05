import { useEffect, useState } from "react";
import { assignmentApi } from "../api/assignment.api";
import { StaffAssignment } from "../types/assignment.type";

export const useAssignment = (buildingId: number) => {
  const [staffs, setStaffs] = useState<StaffAssignment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!buildingId) return;

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await assignmentApi.getAssignedStaff(buildingId);

      setStaffs(res.data);
    } catch (err) {
      console.error("Load staff failed", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
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

    await assignmentApi.assignBuilding({
      buildingId,
      staffIds,
    });
  };

  return {
    staffs,
    loading,
    toggleStaff,
    save,
  };
};
