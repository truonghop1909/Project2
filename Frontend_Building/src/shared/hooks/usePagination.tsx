// shared/hooks/usePagination.ts
import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  data: T[];
  initialPageSize?: number;
}

export function usePagination<T>({ data, initialPageSize = 10 }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalElements = data.length;
  const totalPages = Math.ceil(totalElements / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    paginatedData,
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    goToPage,
    changePageSize,
  };
}