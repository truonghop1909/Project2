"use client";

import { useEffect, useMemo, useState } from "react";
import { useCustomer } from "@/features/customer/hooks/useCustomer";
import { CUSTOMER_PERMISSIONS } from "@/features/customer/permissions";
import CustomerFilter from "@/features/customer/components/filter/CustomerFilter";
import CustomerTable from "@/features/customer/components/table/CustomerTable";
import CustomerModalHub from "@/features/customer/components/modal/CustomerModalHub";
import { assignmentCustomerApi } from "@/features/customer/api/assignmentCustomer.api";
import { CustomerSearchDTO, TransactionTypeDTO } from "@/features/customer/types/customer.type";
import CustomerDetailModal from "../components/detail/CustomerDetailModal";
import { transactionTypeApi } from "../api/transactionType.api";

export default function StaffCustomerView() {
  const {
    myCustomers,
    allCustomers,
    fetchMyCustomers,
    fetchStaffCustomers,
    lastSearchAllRef,
  } = useCustomer();

  const [transactionCustomerId, setTransactionCustomerId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);
  const [viewCustomerId, setViewCustomerId] = useState<number | null>(null);
  const [transactionTypes, setTransactionTypes] = useState<TransactionTypeDTO[]>([]);
  useEffect(() => {
    fetchMyCustomers();
    fetchStaffCustomers({});
    transactionTypeApi.getAll().then((res) => setTransactionTypes(res.data));
  }, [fetchMyCustomers, fetchStaffCustomers]);

  // Bỏ các khách staff đã nhận khỏi bảng "Tất cả khách hàng"
  const availableCustomers = useMemo(() => {
    const myIds = new Set((myCustomers ?? []).map((c) => c.id));
    return (allCustomers ?? []).filter((c) => !myIds.has(c.id));
  }, [myCustomers, allCustomers]);

  // Staff:
  // - bảng ALL: search theo /customer/staff/search
  // - bảng MY: backend hiện chưa nhận params nên chỉ reload list
  const handleSearch = (params?: CustomerSearchDTO) => {
    fetchStaffCustomers(params);
    fetchMyCustomers();
  };

  const reloadBoth = async () => {
    await Promise.all([
      fetchMyCustomers(),
      fetchStaffCustomers(lastSearchAllRef.current),
    ]);
  };

  const takeCustomer = async (customerId: number) => {
    if (!confirm("Bạn có chắc muốn nhận khách hàng này?")) return;
    await assignmentCustomerApi.assignCurrent(customerId);
    alert("Nhận khách hàng thành công");
    await reloadBoth();
  };

  const unassignCustomer = async (customerId: number) => {
    if (!confirm("Bạn có chắc muốn bỏ nhận khách hàng này?")) return;
    await assignmentCustomerApi.unassignCurrent(customerId);
    alert("Bỏ nhận thành công");
    await reloadBoth();
  };



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Quản lý khách hàng
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
          transactionTypes={transactionTypes}
        />

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Khách hàng đã nhận</h2>

          <CustomerTable
            customers={myCustomers ?? []}
            permission={{ ...CUSTOMER_PERMISSIONS.STAFF, canTake: false }}
            onEdit={(c) => setEditCustomerId(c.id)}
            onTransactions={setTransactionCustomerId}
            onUnassign={unassignCustomer}
            onView={setViewCustomerId}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Tất cả khách hàng</h2>

          <CustomerTable
            customers={availableCustomers}
            permission={{
              ...CUSTOMER_PERMISSIONS.STAFF,
              canUnassign: false,
              canTake: true,
            }}
            onView={setViewCustomerId}
            onEdit={(c) => setEditCustomerId(c.id)}
            onTransactions={setTransactionCustomerId}
            onTake={takeCustomer}
          />
        </div>
      </div>

      <CustomerModalHub
        showCreate={showCreate}
        editCustomerId={editCustomerId}
        assignCustomerId={null}
        transactionCustomerId={transactionCustomerId}
        transactionMode="STAFF"
        onCloseCreate={() => setShowCreate(false)}
        onCloseEdit={() => setEditCustomerId(null)}
        onCloseAssign={() => { }}
        onCloseTransaction={() => setTransactionCustomerId(null)}
        onSuccess={reloadBoth}
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