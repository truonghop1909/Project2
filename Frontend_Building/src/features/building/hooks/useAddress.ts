import { useState, useEffect } from 'react';
import { addressApi } from '../api/Address.api';
import { Province, Ward } from '../types/address.type';

/**
 * Hook lấy danh sách tỉnh/thành phố
 */
export const useProvinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const data = await addressApi.getProvinces();
        setProvinces(data);
      } catch (err) {
        setError('Không thể tải danh sách tỉnh/thành phố');
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  return { provinces, loading, error };
};

/**
 * Hook lấy danh sách phường/xã theo tỉnh đã chọn
 * @param provinceCode - Mã tỉnh (nếu null thì không fetch)
 */
export const useWardsByProvince = (provinceCode: number | null) => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provinceCode) {
      setWards([]);
      return;
    }

    const fetchWards = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await addressApi.getWardsByProvince(provinceCode);
        setWards(data);
      } catch (err) {
        setError('Không thể tải danh sách phường/xã');
      } finally {
        setLoading(false);
      }
    };
    fetchWards();
  }, [provinceCode]);

  return { wards, loading, error };
};