"use client";

import CustomerSearchForm from "./CustomerSearchForm";
import { CustomerSearchDTO } from "../../types/customer.type";

export default function CustomerFilter({
  onSearch,
}: {
  onSearch: (params?: CustomerSearchDTO) => void;
}) {
  return (
    <div className="mb-4 bg-white p-4 shadow">
      <CustomerSearchForm onSearch={(p) => onSearch(p)} />
    </div>
  );
}