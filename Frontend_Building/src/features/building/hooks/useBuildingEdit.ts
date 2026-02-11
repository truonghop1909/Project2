// features/building/hooks/useBuildingEdit.ts
import { useState } from "react";
import { buildingApi } from "../api/building.api";
import { BuildingUpdate, Building } from "../types/building.type";
import { mapBuildingDetailToUpdate } from "../mappers/building.mapper";

export const useBuildingEdit = () => {
  const [form, setForm] = useState<BuildingUpdate>({});
  const [loading, setLoading] = useState(false);

  const fetchBuilding = async (buildingId: number) => {
    if (!buildingId) return;

    setLoading(true);
    try {
      const res = await buildingApi.getById(buildingId);
      setForm(mapBuildingDetailToUpdate(res.data));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setForm({});

  return {
    form,
    setForm,
    loading,
    fetchBuilding,
    resetForm,
  };
};
