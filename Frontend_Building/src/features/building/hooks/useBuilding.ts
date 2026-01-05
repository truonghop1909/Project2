// features/building/hooks/useBuilding.ts
import { useState } from "react";
import { buildingService } from "../services/building.service";
import { Building, BuildingSearch } from "../types/building.type";

export const useBuilding = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [lastSearch, setLastSearch] = useState<BuildingSearch>();

  const fetchBuildings = (params?: BuildingSearch) => {
    setLastSearch(params);
    buildingService.getAll(params).then(res => {
      setBuildings(res.data);
    });
  };

  const deleteBuilding = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa tòa nhà này?")) return;

    await buildingService.delete(id);

    // reload đúng danh sách đang search
    fetchBuildings(lastSearch);
  };

  return {
    buildings,
    fetchBuildings,
    deleteBuilding,
  };
};
