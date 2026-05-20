// api/image.api.ts
import { axiosClient } from "@/shared/services/axiosClient";
import { SubImage } from "../types/building.type";

const BACKEND_URL = "http://localhost:8083";

export const imageApi = {
  // ==================== MAIN IMAGE (THUMBNAIL) ====================
  
  /**
   * Upload ảnh đại diện cho tòa nhà
   * @param buildingId - ID của tòa nhà
   * @param file - File ảnh (max 5MB)
   */
  uploadMainImage: (buildingId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    return axiosClient.post(`/building/${buildingId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Xóa ảnh đại diện
   * @param buildingId - ID của tòa nhà
   */
  deleteMainImage: (buildingId: number) => {
    return axiosClient.delete(`/building/${buildingId}/image`);
  },

  // ==================== SUB IMAGES (DETAIL IMAGES) ====================

  /**
   * Lấy danh sách ảnh phụ của tòa nhà
   * @param buildingId - ID của tòa nhà
   */
  getSubImages: (buildingId: number) => {
    return axiosClient.get<SubImage[]>(`/building/${buildingId}/images`);
  },

  /**
   * Upload ảnh phụ cho tòa nhà
   * @param buildingId - ID của tòa nhà
   * @param file - File ảnh
   * @param title - Tiêu đề ảnh (tùy chọn)
   * @param description - Mô tả ảnh (tùy chọn)
   */
  uploadSubImage: (buildingId: number, file: File, title?: string, description?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    
    return axiosClient.post<SubImage>(`/building/${buildingId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Upload nhiều ảnh phụ cùng lúc
   * @param buildingId - ID của tòa nhà
   * @param files - Mảng các file ảnh
   * @param titles - Mảng tiêu đề tương ứng
   * @param descriptions - Mảng mô tả tương ứng
   */
  uploadMultipleSubImages: async (
    buildingId: number,
    files: File[],
    titles: string[] = [],
    descriptions: string[] = []
  ) => {
    const uploadPromises = files.map((file, index) =>
      imageApi.uploadSubImage(
        buildingId,
        file,
        titles[index] || "",
        descriptions[index] || ""
      )
    );
    
    return Promise.all(uploadPromises);
  },

  /**
   * Cập nhật thông tin ảnh phụ (title, description)
   * @param imageId - ID của ảnh
   * @param data - Dữ liệu cập nhật
   */
  updateSubImage: (imageId: number, data: { title?: string; description?: string }) => {
    return axiosClient.put<SubImage>(`/building/images/${imageId}`, data);
  },

  /**
   * Cập nhật thứ tự hiển thị của ảnh phụ
   * @param imageId - ID của ảnh
   * @param displayOrder - Thứ tự mới
   */
  updateImageOrder: (imageId: number, displayOrder: number) => {
    return axiosClient.put(`/building/images/${imageId}/order`, null, {
      params: { order: displayOrder },
    });
  },

  /**
   * Xóa ảnh phụ
   * @param imageId - ID của ảnh cần xóa
   */
  deleteSubImage: (imageId: number) => {
    return axiosClient.delete(`/building/images/${imageId}`);
  },

  /**
   * Xóa nhiều ảnh phụ cùng lúc
   * @param imageIds - Mảng các ID ảnh cần xóa
   */
  deleteMultipleSubImages: async (imageIds: number[]) => {
    const deletePromises = imageIds.map((id) => imageApi.deleteSubImage(id));
    return Promise.all(deletePromises);
  },

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Lấy URL đầy đủ của ảnh
   * @param path - Đường dẫn ảnh (có thể là relative hoặc absolute URL)
   */
  getImageUrl: (path?: string): string => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    if (path.startsWith("/")) {
      return `${BACKEND_URL}${path}`;
    }
    return `${BACKEND_URL}/uploads/${path}`;
  },

  /**
   * Kiểm tra file có phải là ảnh hợp lệ không
   */
  isValidImage: (file: File): { valid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Chỉ hỗ trợ các định dạng: JPEG, JPG, PNG, GIF, WEBP",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "Kích thước ảnh không được vượt quá 5MB",
      };
    }

    return { valid: true };
  },

  /**
   * Tạo preview URL cho file ảnh
   */
  createPreviewUrl: (file: File): string => {
    return URL.createObjectURL(file);
  },

  /**
   * Giải phóng preview URL
   */
  revokePreviewUrl: (url: string) => {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  },
};