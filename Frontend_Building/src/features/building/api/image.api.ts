// api/image.api.ts
import { axiosClient } from "@/shared/services/axiosClient";
import { SubImage } from "../types/building.type";

// Lấy BACKEND_URL từ biến môi trường (đã được cấu hình trong .env)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const imageApi = {
  // ==================== MAIN IMAGE (THUMBNAIL) ====================
  uploadMainImage: (buildingId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post(`/building/${buildingId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteMainImage: (buildingId: number) => {
    return axiosClient.delete(`/building/${buildingId}/image`);
  },

  // ==================== SUB IMAGES ====================
  getSubImages: (buildingId: number) => {
    return axiosClient.get<SubImage[]>(`/building/${buildingId}/images`);
  },

  uploadSubImage: (buildingId: number, file: File, title?: string, description?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    return axiosClient.post<SubImage>(`/building/${buildingId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

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

  updateSubImage: (imageId: number, data: { title?: string; description?: string }) => {
    return axiosClient.put<SubImage>(`/building/images/${imageId}`, data);
  },

  updateImageOrder: (imageId: number, displayOrder: number) => {
    return axiosClient.put(`/building/images/${imageId}/order`, null, {
      params: { order: displayOrder },
    });
  },

  deleteSubImage: (imageId: number) => {
    return axiosClient.delete(`/building/images/${imageId}`);
  },

  deleteMultipleSubImages: async (imageIds: number[]) => {
    const deletePromises = imageIds.map((id) => imageApi.deleteSubImage(id));
    return Promise.all(deletePromises);
  },

  // ==================== HELPER FUNCTIONS ====================
  /**
   * Lấy URL đầy đủ của ảnh (xử lý cả đường dẫn cũ bị lỗi như /uploads/https://...)
   * @param path - Đường dẫn ảnh từ API (có thể là relative hoặc absolute URL)
   */
  getImageUrl: (path?: string): string => {
    if (!path) return "";

    // Loại bỏ tiền tố /uploads/ nếu có (fix dữ liệu cũ bị sai)
    let cleanPath = path;
    if (cleanPath.startsWith("/uploads/")) {
      cleanPath = cleanPath.substring(9); // bỏ '/uploads/'
    }

    // Nếu sau khi làm sạch, nó là URL tuyệt đối -> trả về nguyên bản
    if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
      return cleanPath;
    }

    // Nếu là đường dẫn tương đối (bắt đầu bằng /) -> ghép với BACKEND_URL
    if (cleanPath.startsWith("/")) {
      return `${BACKEND_URL}${cleanPath}`;
    }

    // Fallback: coi như tên file, ghép với /uploads/
    return `${BACKEND_URL}/uploads/${cleanPath}`;
  },

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

  createPreviewUrl: (file: File): string => {
    return URL.createObjectURL(file);
  },

  revokePreviewUrl: (url: string) => {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  },
};