"use client";

import BuildingSearchForm from "@/features/building/components/form/BuildingForm";

export default function BuildingFilter({
  onSearch,
}: {
  onSearch: (params?: any) => void;
}) {
  return (
    <div className="mb-4 bg-white p-4 shadow">
      <BuildingSearchForm onSearch={onSearch} />
    </div>
  );
}
