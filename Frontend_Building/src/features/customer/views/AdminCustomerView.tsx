"use client";

import { useEffect, useState } from "react";
import { useCustomer } from "@/features/customer/hooks/useCustomer";
import { CUSTOMER_PERMISSIONS } from "@/features/customer/permissions";
import CustomerFilter from "@/features/customer/components/filter/CustomerFilter";
import CustomerTable from "@/features/customer/components/table/CustomerTable";
import CustomerModalHub from "@/features/customer/components/modal/CustomerModalHub";

export default function AdminCustomerView() {
  const { allCustomers, fetchAllCustomers } = useCustomer();

  const [showCreate, setShowCreate] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);
  const [assignCustomerId, setAssignCustomerId] = useState<number | null>(null);
  const [transactionCustomerId, setTransactionCustomerId] = useState<number | null>(null);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
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

        {/* FILTER */}
        <CustomerFilter onSearch={fetchAllCustomers} />

        {/* TABLE */}
        <CustomerTable
          customers={allCustomers}
          permission={CUSTOMER_PERMISSIONS.ADMIN}
          onAssign={setAssignCustomerId}
          onEdit={(c) => setEditCustomerId(c.id)}
          onTransactions={setTransactionCustomerId}
        />
      </div>

      {/* MODALS */}
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
        onSuccess={fetchAllCustomers}
      />
    </div>
  );
}