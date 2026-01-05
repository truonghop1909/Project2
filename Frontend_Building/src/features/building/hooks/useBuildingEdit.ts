// features/building/hooks/useBuildingEdit.ts
import { useEffect, useState } from "react";
import { buildingService } from "../services/building.service";
import { BuildingUpdate } from "../types/building.type";

export const useBuildingEdit = (buildingId: number) => {
  const [form, setForm] = useState<BuildingUpdate>({});
  const [loading, setLoading] = useState(false);

  useBuildingEdit(buildingId);

  return { form, setForm, loading };
};
