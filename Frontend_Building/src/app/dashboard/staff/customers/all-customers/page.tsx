"use client";
import { useEffect, useState } from "react";
import { customerApi } from "@/features/customer/api/customer.api";
import { CustomerDTO, CustomerSearchDTO } from "@/features/customer/types/customer.type";
import CustomerTable from "@/features/customer/components/table/CustomerTable";
import CustomerFilter from "@/features/customer/components/filter/CustomerFilter";
import { CUSTOMER_PERMISSIONS } from "@/features/customer/permissions";

export default function AllCustomersPage() {
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CustomerSearchDTO>({});

  const loadData = async (params: CustomerSearchDTO) => {
    setLoading(true);
    try {
      const res = await customerApi.searchForStaff(params);
      setCustomers(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(filters);
  }, [filters]);

  const handleSearch = (params?: CustomerSearchDTO) => {
    setFilters(params || {});
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tất cả khách hàng</h1>
      {/* Chỉ hiển thị bộ lọc cơ bản: họ tên, SĐT, loại giao dịch. Không approvalStatus, không staff filters */}
      <CustomerFilter onSearch={handleSearch} />
      <CustomerTable
        customers={customers}
        loading={loading}
        permission={CUSTOMER_PERMISSIONS.STAFF}
        onView={(id) => console.log("View", id)}
        onEdit={(c) => console.log("Edit", c)}
        onTake={(id) => console.log("Take", id)}
        onUnassign={(id) => console.log("Unassign", id)}
        onTransactions={(id) => console.log("Transactions", id)}
      />
    </div>
  );
}