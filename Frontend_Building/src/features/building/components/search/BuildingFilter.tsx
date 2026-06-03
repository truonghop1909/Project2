"use client";

import BuildingSearchForm from "@/features/building/components/form/BuildingSearchForm";

export default function BuildingFilter({
  onSearch,
}: {
  onSearch: (params?: any) => void;
}) {
  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg p-5">
      <BuildingSearchForm onSearch={onSearch} />
    </div>
  );
}