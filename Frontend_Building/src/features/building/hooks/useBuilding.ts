// features/building/hooks/useBuilding.ts
import { useCallback, useRef, useState } from "react";
import { buildingApi } from "../api/building.api";
import { Building, BuildingSearch } from "../types/building.type";

type RoleType = "ROLE_ADMIN" | "ROLE_STAFF";

export const useBuilding = (role: RoleType) => {
  // ✅ admin dùng allBuildings, staff dùng cả allBuildings + myBuildings
  const [allBuildings, setAllBuildings] = useState<Building[]>([]);
  const [myBuildings, setMyBuildings] = useState<Building[]>([]);

  const lastSearchAllRef = useRef<BuildingSearch | undefined>(undefined);
  const lastSearchMyRef = useRef<BuildingSearch | undefined>(undefined);

  // ✅ fetch tất cả (admin + staff đều dùng được)
  const fetchAllBuildings = useCallback((params?: BuildingSearch) => {
    lastSearchAllRef.current = params;
    return buildingApi.getAll(params).then((res) => setAllBuildings(res.data));
  }, []);

  // ✅ fetch của tôi (chỉ staff)
  const fetchMyBuildings = useCallback((params?: BuildingSearch) => {
    lastSearchMyRef.current = params;
    return buildingApi.getMyBuildings(params).then((res) => setMyBuildings(res.data));
  }, []);

  // ✅ Giữ tương thích code cũ: fetchBuildings
  // - admin: fetchAll
  // - staff: fetchMy
  const fetchBuildings = useCallback((params?: BuildingSearch) => {
    if (role === "ROLE_ADMIN") return fetchAllBuildings(params);
    return fetchMyBuildings(params);
  }, [role, fetchAllBuildings, fetchMyBuildings]);

  const deleteBuilding = useCallback(async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa tòa nhà này?")) return;
    try {
      await buildingApi.delete(id);
      alert("Xóa thành công");
      await fetchAllBuildings(lastSearchAllRef.current);
    } catch (error: any) {
      alert(error.response?.data?.message || "Không thể xóa tòa nhà");
    }
  }, [fetchAllBuildings]);

  const unassignBuilding = useCallback(async (id: number) => {
    if (!confirm("Bạn có chắc muốn bỏ quản lý tòa nhà này?")) return;
    try {
      await buildingApi.unassignCurrent(id);
      alert("Đã bỏ quản lý thành công");

      // staff: reload cả 2 bảng để UI đồng bộ
      if (role === "ROLE_STAFF") {
        await Promise.all([
          fetchMyBuildings(lastSearchMyRef.current),
          fetchAllBuildings(lastSearchAllRef.current),
        ]);
      } else {
        await fetchAllBuildings(lastSearchAllRef.current);
      }
    } catch {
      alert("Không thể bỏ quản lý");
    }
  }, [role, fetchAllBuildings, fetchMyBuildings]);
  const assignBuilding = useCallback(async (id: number) => {
    if (!confirm("Bạn có chắc muốn nhận quản lý tòa nhà này?")) return;

    try {
      await buildingApi.assignCurrent(id);
      alert("Nhận quản lý thành công");

      if (role === "ROLE_STAFF") {
        await Promise.all([
          fetchMyBuildings(lastSearchMyRef.current),
          fetchAllBuildings(lastSearchAllRef.current),
        ]);
      } else {
        await fetchAllBuildings(lastSearchAllRef.current);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Không thể nhận tòa nhà";
      alert(message);
    }
  }, [role, fetchAllBuildings, fetchMyBuildings]);
  return {
    // ✅ giữ cho admin cũ không hỏng
    buildings: role === "ROLE_ADMIN" ? allBuildings : myBuildings,
    fetchBuildings,

    // ✅ mới cho staff page
    allBuildings,
    myBuildings,
    fetchAllBuildings,
    fetchMyBuildings,

    deleteBuilding,
    unassignBuilding,
    assignBuilding,
  };
};