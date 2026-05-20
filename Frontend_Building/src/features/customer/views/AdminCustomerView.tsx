"use client";

import { useEffect, useState } from "react";
import { useCustomer } from "@/features/customer/hooks/useCustomer";
import { CUSTOMER_PERMISSIONS } from "@/features/customer/permissions";
import CustomerFilter from "@/features/customer/components/filter/CustomerFilter";
import CustomerTable from "@/features/customer/components/table/CustomerTable";
import CustomerModalHub from "@/features/customer/components/modal/CustomerModalHub";
import CustomerDetailModal from "../components/detail/CustomerDetailModal";
import { customerApi } from "@/features/customer/api/customer.api";
import { CustomerSearchDTO, TransactionTypeDTO } from "@/features/customer/types/customer.type";
import { transactionTypeApi } from "../api/transactionType.api";

export default function AdminCustomerView() {
  const { allCustomers, fetchAdminCustomers, lastSearchAllRef } = useCustomer();

  const [showCreate, setShowCreate] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);
  const [assignCustomerId, setAssignCustomerId] = useState<number | null>(null);
  const [transactionCustomerId, setTransactionCustomerId] = useState<number | null>(null);
  const [viewCustomerId, setViewCustomerId] = useState<number | null>(null);

  useEffect(() => {
    fetchAdminCustomers();
  }, [fetchAdminCustomers]);

  const approveCustomer = async (customerId: number) => {
    if (!confirm("Bạn có chắc muốn duyệt khách hàng này?")) return;
    await customerApi.approve(customerId);
    alert("Duyệt khách hàng thành công");
    await fetchAdminCustomers(lastSearchAllRef.current);
  };

  const rejectCustomer = async (customerId: number) => {
    if (!confirm("Bạn có chắc muốn từ chối khách hàng này?")) return;
    await customerApi.reject(customerId);
    alert("Từ chối khách hàng thành công");
    await fetchAdminCustomers(lastSearchAllRef.current);
  };

  const handleSearch = (params?: CustomerSearchDTO) => {
    fetchAdminCustomers(params);
  };

  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDTO[]>([]);

  useEffect(() => {
    fetchAdminCustomers();
    transactionTypeApi.getAll().then((res) => setTransactionTypes(res.data));
  }, [fetchAdminCustomers]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Danh sách khách hàng
          </h1>

          <button
            onClick={() => setShowCreate(true)}
            className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            + Thêm khách hàng
          </button>
        </div>

        <CustomerFilter
          onSearch={handleSearch}
          showApprovalStatus
          transactionTypes={transactionTypes}
          showStaffFilters
        />

        <CustomerTable
          customers={allCustomers}
          permission={CUSTOMER_PERMISSIONS.ADMIN}
          onAssign={setAssignCustomerId}
          onEdit={(c) => setEditCustomerId(c.id)}
          onTransactions={setTransactionCustomerId}
          onView={setViewCustomerId}
          onApprove={approveCustomer}
          onReject={rejectCustomer}
        />
      </div>

      <CustomerModalHub
        showCreate={showCreate}
        editCustomerId={editCustomerId}
        assignCustomerId={assignCustomerId}
        transactionCustomerId={transactionCustomerId}
        transactionMode="ADMIN"
        onCloseCreate={() => setShowCreate(false)}
        onCloseEdit={() => setEditCustomerId(null)}
        onCloseAssign={() => setAssignCustomerId(null)}
        onCloseTransaction={() => setTransactionCustomerId(null)}
        onSuccess={() => fetchAdminCustomers(lastSearchAllRef.current)}
      />

      {viewCustomerId && (
        <CustomerDetailModal
          customerId={viewCustomerId}
          onClose={() => setViewCustomerId(null)}
        />
      )}
    </div>
  );
}