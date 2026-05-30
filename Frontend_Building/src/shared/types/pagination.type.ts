// src/shared/types/pagination.type.ts

/**
 * Generic response wrapper cho phân trang
 * Dùng chung cho tất cả các danh sách cần phân trang
 */
export interface PageResponse<T> {
  content: T[];           // Dữ liệu trang hiện tại
  page: number;           // Trang hiện tại (bắt đầu từ 1)
  size: number;           // Số bản ghi mỗi trang
  totalElements: number;  // Tổng số bản ghi
  totalPages: number;     // Tổng số trang
  first: boolean;         // Có phải trang đầu không
  last: boolean;          // Có phải trang cuối không
}

/**
 * Helper: Tạo PageResponse từ dữ liệu
 */
export function createPageResponse<T>(
  content: T[],
  page: number,
  size: number,
  totalElements: number
): PageResponse<T> {
  return {
    content,
    page,
    size,
    totalElements,
    totalPages: Math.ceil(totalElements / size),
    first: page === 1,
    last: page === Math.ceil(totalElements / size)
  };
}

/**
 * Helper: Lấy params phân trang
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}