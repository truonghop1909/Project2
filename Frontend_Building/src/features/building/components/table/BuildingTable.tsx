import { BuildingSearchDTO } from "../../types/building.type";
import { Pagination } from "@/components/common";
import { BuildingTableHeader } from "./BuildingTableHeader";
import { BuildingTableRow } from "./BuildingTableRow";

interface BuildingTableProps {
  buildings: BuildingSearchDTO[];
  permission: any;
  loading?: boolean;
  pagination?: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showPagination?: boolean;
  onView?: (id: number) => void;
  onAssign?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onUnassign?: (id: number) => void;
  onTake?: (id: number) => void;
}

export default function BuildingTable({
  buildings,
  permission,
  loading = false,
  pagination,
  onPageChange,
  onPageSizeChange,
  showPagination = true,
  onView,
  onAssign,
  onEdit,
  onDelete,
  onUnassign,
  onTake,
}: BuildingTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border bg-white">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <BuildingTableHeader />
          <tbody className="divide-y">
            {buildings.map((b) => (
              <BuildingTableRow
                key={b.id}
                building={b}
                permission={permission}
                onView={onView}
                onAssign={onAssign}
                onEdit={onEdit}
                onDelete={onDelete}
                onUnassign={onUnassign}
                onTake={onTake}
              />
            ))}
          </tbody>
        </table>
        {buildings.length === 0 && (
          <div className="text-center py-8 text-gray-500">Không có dữ liệu tòa nhà</div>
        )}
      </div>
      {showPagination && pagination && onPageChange && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          pageSize={pagination.size}
          totalElements={pagination.totalElements}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showSizeChanger={true}
        />
      )}
      {showPagination && pagination && pagination.totalPages === 1 && pagination.totalElements > 0 && (
        <div className="text-center text-sm text-gray-500 py-2">
          Hiển thị {buildings.length} / {pagination.totalElements} kết quả
        </div>
      )}
    </div>
  );
}