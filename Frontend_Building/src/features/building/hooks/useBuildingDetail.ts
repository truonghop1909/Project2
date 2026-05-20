import { useState, useEffect, useCallback, useRef } from "react";
import { buildingApi } from "../api/building.api";
import { BuildingDetail } from "../types/building.type";

interface UseBuildingDetailOptions {
  onError?: (error: string) => void;
}

export const useBuildingDetail = (buildingId: number, options?: UseBuildingDetailOptions) => {
  const [building, setBuilding] = useState<BuildingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchDetail = useCallback(async () => {
    if (!buildingId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await buildingApi.getById(buildingId);
      
      if (isMounted.current) {
        console.log("API Response:", response.data);
        setBuilding(response.data);
      }
    } catch (err) {
      console.error("Fetch building detail error:", err);
      if (isMounted.current) {
        const errorMsg = "Không thể tải thông tin tòa nhà";
        setError(errorMsg);
        optionsRef.current?.onError?.(errorMsg);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [buildingId]);

  useEffect(() => {
    isMounted.current = true;
    fetchDetail();
    
    return () => {
      isMounted.current = false;
    };
  }, [fetchDetail]);

  return { building, loading, error, refetch: fetchDetail };
};