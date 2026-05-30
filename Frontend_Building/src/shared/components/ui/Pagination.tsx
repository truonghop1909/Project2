// src/shared/components/ui/Pagination.tsx

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalElements,
  onPageChange,
  onPageSizeChange,
  showSizeChanger = true,
  pageSizeOptions = [12, 24, 36, 48],
  className = ""
}) => {
  // Nếu không cần phân trang thì không hiển thị
  if (totalPages <= 1 && !showSizeChanger) return null;

  /**
   * Tính toán các trang cần hiển thị
   * Ví dụ: [1, 2, 3, 4, 5, '...', 10]
   */
  const getVisiblePages = (): (number | string)[] => {
    const delta = 2; // Số trang hiển thị bên cạnh trang hiện tại
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    // Tạo mảng các trang từ 1 đến totalPages
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Trang đầu
        i === totalPages || // Trang cuối
        (i >= currentPage - delta && i <= currentPage + delta) // Các trang gần trang hiện tại
      ) {
        range.push(i);
      }
    }

    // Thêm dấu "..." vào giữa các khoảng cách
    range.forEach((i) => {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  // Xử lý khi chọn số lượng mỗi trang
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    onPageSizeChange?.(newSize);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Page size selector và thông tin tổng số */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
        {showSizeChanger && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span>Hiển thị</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>kết quả mỗi trang</span>
          </div>
        )}
        
        <div className="text-gray-500">
          Tổng số: <span className="font-semibold text-gray-700">{totalElements.toLocaleString("vi-VN")}</span> kết quả
        </div>
      </div>

      {/* Pagination buttons - chỉ hiển thị khi có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {/* Nút Previous */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="min-w-[36px] h-9 px-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Trang trước"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Các nút số trang */}
            {visiblePages.map((page, index) => (
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => onPageChange(page)}
                  className={`min-w-[36px] h-9 px-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={index}
                  className="min-w-[36px] h-9 px-2 flex items-center justify-center text-gray-400"
                >
                  {page}
                </span>
              )
            ))}

            {/* Nút Next */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="min-w-[36px] h-9 px-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Trang sau"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Thông tin trang hiện tại */}
          <div className="text-sm text-gray-500">
            Trang {currentPage} / {totalPages}
          </div>
        </>
      )}
    </div>
  );
};

// Export thêm phiên bản đơn giản không có page size changer
export const SimplePagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}> = ({ currentPage, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm text-gray-600">
        Trang {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};