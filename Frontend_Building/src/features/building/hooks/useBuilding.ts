// features/building/hooks/useBuilding.ts

import { useCallback, useRef, useState } from "react";
import { buildingApi } from "../api/building.api";
import { BuildingSearchDTO } from "../types/building.type";
import { PageResponse, createPageResponse } from "@/shared/types/pagination.type";

type RoleType = "ADMIN" | "STAFF";

export const useBuilding = (role: RoleType) => {
  const [allBuildings, setAllBuildings] = useState<BuildingSearchDTO[]>([]);
  const [myBuildings, setMyBuildings] = useState<BuildingSearchDTO[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Phân trang state
  const [allPagination, setAllPagination] = useState<PageResponse<BuildingSearchDTO>>({
    content: [],
    page: 1,
    size: 12,
    totalElements: 0,
    totalPages: 1,
    first: true,
    last: true
  });
  
  const [myPagination, setMyPagination] = useState<PageResponse<BuildingSearchDTO>>({
    content: [],
    page: 1,
    size: 12,
    totalElements: 0,
    totalPages: 1,
    first: true,
    last: true
  });

  const lastSearchAllRef = useRef<BuildingSearchDTO | undefined>(undefined);
  const lastSearchMyRef = useRef<BuildingSearchDTO | undefined>(undefined);

  // ✅ Phân trang phía client
  const paginateData = (data: BuildingSearchDTO[], page: number, size: number): PageResponse<BuildingSearchDTO> => {
    const start = (page - 1) * size;
    const end = start + size;
    const content = data.slice(start, end);
    const totalElements = data.length;
    
    return createPageResponse(content, page, size, totalElements);
  };

  // ✅ fetch tất cả
  const fetchAllBuildings = useCallback(async (params?: BuildingSearchDTO) => {
    setLoading(true);
    lastSearchAllRef.current = params;
    
    try {
      const response = await buildingApi.getAll(params);
      const buildings = response.data as BuildingSearchDTO[];
      setAllBuildings(buildings);
      
      const page = params?.page || 1;
      const size = params?.size || 12;
      const paginated = paginateData(buildings, page, size);
      setAllPagination(paginated);
    } catch (error) {
      console.error("Lỗi khi fetch all buildings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ fetch của tôi
  const fetchMyBuildings = useCallback(async (params?: BuildingSearchDTO) => {
    setLoading(true);
    lastSearchMyRef.current = params;
    
    try {
      const response = await buildingApi.getMyBuildings(params);
      const buildings = response.data as BuildingSearchDTO[];
      setMyBuildings(buildings);
      
      const page = params?.page || 1;
      const size = params?.size || 12;
      const paginated = paginateData(buildings, page, size);
      setMyPagination(paginated);
    } catch (error) {
      console.error("Lỗi khi fetch my buildings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Điều khiển phân trang - all buildings
  const goToAllPage = useCallback((page: number) => {
    if (page < 1 || page > allPagination.totalPages) return;
    const paginated = paginateData(allBuildings, page, allPagination.size);
    setAllPagination(paginated);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [allBuildings, allPagination.size, allPagination.totalPages]);

  const changeAllPageSize = useCallback((size: number) => {
    const paginated = paginateData(allBuildings, 1, size);
    setAllPagination(paginated);
  }, [allBuildings]);

  // ✅ Điều khiển phân trang - my buildings
  const goToMyPage = useCallback((page: number) => {
    if (page < 1 || page > myPagination.totalPages) return;
    const paginated = paginateData(myBuildings, page, myPagination.size);
    setMyPagination(paginated);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [myBuildings, myPagination.size, myPagination.totalPages]);

  const changeMyPageSize = useCallback((size: number) => {
    const paginated = paginateData(myBuildings, 1, size);
    setMyPagination(paginated);
  }, [myBuildings]);

  // ✅ Giữ tương thích code cũ
  const fetchBuildings = useCallback((params?: BuildingSearchDTO) => {
    if (role === "ADMIN") return fetchAllBuildings(params);
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

      if (role === "STAFF") {
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

      if (role === "STAFF") {
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
    // Dữ liệu gốc
    allBuildings,
    myBuildings,
    
    // Dữ liệu đã phân trang (dùng để hiển thị)
    paginatedAllBuildings: allPagination.content,
    paginatedMyBuildings: myPagination.content,
    
    // Phân trang state
    allPagination,
    myPagination,
    loading,
    
    // Actions
    fetchAllBuildings,
    fetchMyBuildings,
    fetchBuildings,
    goToAllPage,
    goToMyPage,
    changeAllPageSize,
    changeMyPageSize,
    deleteBuilding,
    unassignBuilding,
    assignBuilding,
    
    // Giữ cho code cũ
    buildings: role === "ADMIN" ? allPagination.content : myPagination.content,
  };
};