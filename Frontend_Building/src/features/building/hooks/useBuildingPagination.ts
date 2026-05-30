// src/features/building/hooks/useBuildingPagination.ts

import { useState, useCallback, useEffect, useRef } from "react";
import { buildingApi } from "../api/building.api";
import { BuildingSearchDTO } from "../types/building.type";

interface UseBuildingPaginationOptions {
  initialPage?: number;
  initialSize?: number;
  autoLoad?: boolean;
  publicMode?: boolean;       // ✅ Thêm option này
}

export function useBuildingPagination(options: UseBuildingPaginationOptions = {}) {
  const { 
    initialPage = 1, 
    initialSize = 12, 
    autoLoad = true,
    publicMode = false        // ✅ Mặc định false (chế độ có auth)
  } = options;
  
  const [buildings, setBuildings] = useState<BuildingSearchDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BuildingSearchDTO>({});
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: initialSize,
    totalElements: 0,
    totalPages: 1,
    first: true,
    last: false
  });

  // Chỉ dùng cho client pagination (khi publicMode = false và chưa có API paged)
  const [allBuildings, setAllBuildings] = useState<BuildingSearchDTO[]>([]);

  const isMounted = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelPreviousRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
  };

  // Hàm phân trang client (dùng cho authenticated nếu API chưa hỗ trợ page/size)
  const applyClientPagination = useCallback((data: BuildingSearchDTO[], page: number, size: number) => {
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedData = data.slice(start, end);
    const totalElements = data.length;
    const totalPages = Math.ceil(totalElements / size) || 1;
    setBuildings(paginatedData);
    setPagination({
      page,
      size,
      totalElements,
      totalPages,
      first: page === 1,
      last: page === totalPages,
    });
  }, []);

  const loadBuildings = useCallback(async (
    page: number = pagination.page,
    searchFilters: BuildingSearchDTO = filters
  ) => {
    if (!isMounted.current) return;
    
    setLoading(true);
    setError(null);
    cancelPreviousRequest();
    
    try {
      const cleanedFilters: BuildingSearchDTO = {};
      Object.entries(searchFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          cleanedFilters[key as keyof BuildingSearchDTO] = value;
        }
      });
      
      if (publicMode) {
        // ===== Public mode: gọi API có phân trang server =====
        const params = { ...cleanedFilters, page, size: pagination.size };
        const response = await buildingApi.getPublicBuildings(params);
        const data = response.data;
        setBuildings(data.content || []);
        setPagination({
          page: data.page,
          size: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          first: data.first,
          last: data.last,
        });
      } else {
        // ===== Authenticated mode: dùng getAll (client pagination) =====
        // Nếu sau này có API paged (ví dụ buildingApi.getBuildingsPaged), thay thế đoạn này
        const response = await buildingApi.getAll(cleanedFilters);
        let data = response.data;
        if (!Array.isArray(data)) data = [];
        setAllBuildings(data);
        applyClientPagination(data, page, pagination.size);
      }
    } catch (err: any) {
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') return;
      if (isMounted.current) {
        setError("Không thể tải danh sách tòa nhà");
        console.error(err);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [pagination.page, pagination.size, filters, publicMode, applyClientPagination]);

  // Khi page/size thay đổi ở chế độ authenticated (client pagination)
  useEffect(() => {
    if (!publicMode && allBuildings.length > 0) {
      applyClientPagination(allBuildings, pagination.page, pagination.size);
    }
  }, [pagination.page, pagination.size, publicMode, allBuildings, applyClientPagination]);

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    if (publicMode) {
      loadBuildings(page);
    } else {
      // Client pagination: chỉ cần cập nhật page state, useEffect sẽ xử lý
      setPagination(prev => ({ ...prev, page }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadBuildings, pagination.totalPages, publicMode]);

  const changePageSize = useCallback((size: number) => {
    if (publicMode) {
      setPagination(prev => ({ ...prev, size, page: 1 }));
      loadBuildings(1, { ...filters });
    } else {
      setPagination(prev => ({ ...prev, size, page: 1 }));
      if (allBuildings.length) {
        applyClientPagination(allBuildings, 1, size);
      }
    }
  }, [publicMode, loadBuildings, filters, allBuildings, applyClientPagination]);

  const updateFilters = useCallback((newFilters: BuildingSearchDTO) => {
    setFilters(newFilters);
    if (publicMode) {
      loadBuildings(1, newFilters);
    } else {
      // Gọi lại API getAll với filter mới (client pagination sẽ reset)
      loadBuildings(1, newFilters);
    }
  }, [publicMode, loadBuildings]);

  const reset = useCallback(() => updateFilters({}), [updateFilters]);
  const refresh = useCallback(() => loadBuildings(pagination.page, filters), [loadBuildings, pagination.page, filters]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (autoLoad) loadBuildings(initialPage, filters);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hasData = buildings.length > 0;
  const isEmpty = buildings.length === 0 && !loading && !error;

  return {
    buildings,
    loading,
    error,
    filters,
    pagination,
    loadBuildings,
    goToPage,
    changePageSize,
    updateFilters,
    reset,
    refresh,
    hasPrev: !pagination.first,
    hasNext: !pagination.last,
    hasData,
    isEmpty,
  };
}