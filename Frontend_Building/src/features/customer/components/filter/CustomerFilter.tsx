"use client";

import CustomerSearchForm from "./CustomerSearchForm";
import {
  CustomerSearchDTO,
  TransactionTypeDTO,
} from "../../types/customer.type";

export default function CustomerFilter({
  onSearch,
  showApprovalStatus = false,
  transactionTypes = [],
  showStaffFilters = false,
}: {
  onSearch: (params?: CustomerSearchDTO) => void;
  showApprovalStatus?: boolean;
  transactionTypes?: TransactionTypeDTO[];
  showStaffFilters?: boolean;
}) {
  return (
    <div className="mb-4 bg-white p-4 shadow">
      <CustomerSearchForm
        onSearch={(p) => onSearch(p)}
        showApprovalStatus={showApprovalStatus}
        transactionTypes={transactionTypes}
        showStaffFilters={showStaffFilters}
      />
    </div>
  );
}