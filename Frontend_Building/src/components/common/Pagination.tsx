'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  className = '',
}) => {
  if (totalPages <= 1 && !showSizeChanger) return null;

  const getVisiblePages = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }
    const result: (number | string)[] = [];
    let prev: number | undefined;
    for (const i of range) {
      if (prev !== undefined && i - prev > 1) result.push('...');
      result.push(i);
      prev = i;
    }
    return result;
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange?.(Number(e.target.value));
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {showSizeChanger && onPageSizeChange && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Hiển thị</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>kết quả mỗi trang</span>
          <span className="ml-2">Tổng: <strong>{totalElements.toLocaleString('vi-VN')}</strong></span>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center gap-1 flex-wrap justify-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="min-w-[36px] h-9 px-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition"
            aria-label="Trang trước"
          >
            <ChevronLeft size={18} />
          </button>
          {getVisiblePages().map((page, idx) =>
            typeof page === 'number' ? (
              <button
                key={idx}
                onClick={() => onPageChange(page)}
                className={`min-w-[36px] h-9 px-2 rounded-lg transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border bg-white hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="min-w-[36px] h-9 flex items-center justify-center text-gray-400">
                ...
              </span>
            )
          )}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="min-w-[36px] h-9 px-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50 transition"
            aria-label="Trang sau"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};