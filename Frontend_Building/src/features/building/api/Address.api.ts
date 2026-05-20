/**
 * ==============================
 * ADDRESS API - SIMPLE VERSION
 * ==============================
 * API lấy dữ liệu tỉnh/thành phố và xã/phường Việt Nam
 * KHÔNG DÙNG DISTRICT - Chọn tỉnh nào thì hiện phường của tỉnh đó
 * Sử dụng API: https://provinces.open-api.vn/api/v2
 */

import { Province, Ward } from "../types/address.type";

const BASE_URL = 'https://provinces.open-api.vn/api/v2';



export const addressApi = {
  /**
   * Lấy danh sách tất cả tỉnh/thành phố
   * GET /api/v2/p/
   */
  getProvinces: async (): Promise<Province[]> => {
    try {
      const response = await fetch(`${BASE_URL}/p/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi tải tỉnh/thành phố:', error);
      return [];
    }
  },

  /**
   * Lấy danh sách tất cả xã/phường
   * GET /api/v2/w/
   */
  getAllWards: async (): Promise<Ward[]> => {
    try {
      const response = await fetch(`${BASE_URL}/w/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi tải xã/phường:', error);
      return [];
    }
  },

  /**
   * Lấy danh sách xã/phường theo mã tỉnh
   * @param provinceCode - Mã tỉnh/thành phố
   */
  getWardsByProvince: async (provinceCode: number): Promise<Ward[]> => {
    if (!provinceCode) return [];
    
    try {
      const allWards = await addressApi.getAllWards();
      // Lọc trực tiếp theo province_code
      return allWards.filter(ward => ward.province_code === provinceCode);
    } catch (error) {
      console.error('Lỗi tải xã/phường theo tỉnh:', error);
      return [];
    }
  },
};