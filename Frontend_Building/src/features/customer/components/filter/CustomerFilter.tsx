"use client";

import CustomerSearchForm from "./CustomerSearchForm";
import {
  CustomerSearchDTO,
  TransactionTypeDTO,
} from "../../types/customer.type";

export default function CustomerFilter({
  onSearch,
  showApprovalStatus = false,
  showTransactionType = false,   // ✅ mới
  transactionTypes = [],
  showStaffFilters = false,
}: {
  onSearch: (params?: CustomerSearchDTO) => void;
  showApprovalStatus?: boolean;
  showTransactionType?: boolean;   // ✅ mới
  transactionTypes?: TransactionTypeDTO[];
  showStaffFilters?: boolean;
}) {
  return (
    <div className="mb-4 bg-white p-4 shadow">
      <CustomerSearchForm
        onSearch={(p) => onSearch(p)}
        showApprovalStatus={showApprovalStatus}
        showTransactionType={showTransactionType}
        transactionTypes={transactionTypes}
        showStaffFilters={showStaffFilters}
      />
    </div>
  );
}