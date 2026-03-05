"use client";

import { useEffect, useMemo, useState } from "react";
import { useCustomer } from "@/features/customer/hooks/useCustomer";
import { CUSTOMER_PERMISSIONS } from "@/features/customer/permissions";
import CustomerFilter from "@/features/customer/components/filter/CustomerFilter";
import CustomerTable from "@/features/customer/components/table/CustomerTable";
import CustomerModalHub from "@/features/customer/components/modal/CustomerModalHub";
import { assignmentCustomerApi } from "@/features/customer/api/assignmentCustomer.api";

export default function StaffCustomerView() {
  const {
    myCustomers,
    allCustomers,
    fetchMyCustomers,
    fetchAllCustomers,
    lastSearchAllRef,
  } = useCustomer();

  const [transactionCustomerId, setTransactionCustomerId] = useState<number | null>(null);

  useEffect(() => {
    fetchMyCustomers();
    fetchAllCustomers({});
  }, [fetchMyCustomers, fetchAllCustomers]);

  // ✅ lọc bảng ALL để bỏ khách đã nhận
  const availableCustomers = useMemo(() => {
    const myIds = new Set((myCustomers ?? []).map((c) => c.id));
    return (allCustomers ?? []).filter((c) => !myIds.has(c.id));
  }, [myCustomers, allCustomers]);

  // ✅ filter dùng chung cho cả 2 bảng
  // - ALL: search theo params
  // - MY: hiện tại backend /my chưa nhận params => chỉ reload list
  const handleSearch = (params: any) => {
    fetchAllCustomers(params);
    fetchMyCustomers();
  };
  const [showCreate, setShowCreate] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);

  const reloadBoth = async () => {
    await Promise.all([
      fetchMyCustomers(),
      fetchAllCustomers(lastSearchAllRef.current),
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
          <h1 className="text-2xl font-semibold text-gray-800">Quản lý khách hàng</h1>

          <button
            onClick={() => setShowCreate(true)}
            className="h-10 px-5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            + Thêm khách hàng
          </button>
        </div>

        {/* FILTER */}
        <CustomerFilter onSearch={handleSearch} />

        {/* ====== BẢNG 1: KHÁCH ĐÃ NHẬN ====== */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Khách hàng đã nhận</h2>

          <CustomerTable
            customers={myCustomers ?? []}
            permission={{ ...CUSTOMER_PERMISSIONS.STAFF, canTake: false }}
            onEdit={(c) => setEditCustomerId(c.id)}          // ✅ sửa
            onTransactions={setTransactionCustomerId}
            onUnassign={unassignCustomer}
          />
        </div>

        {/* ====== BẢNG 2: TẤT CẢ KHÁCH ====== */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Tất cả khách hàng</h2>

          <CustomerTable
            customers={availableCustomers}
            permission={{ ...CUSTOMER_PERMISSIONS.STAFF, canUnassign: false, canTake: true }}
            onEdit={(c) => setEditCustomerId(c.id)}          // ✅ sửa
            onTransactions={setTransactionCustomerId}
            onTake={takeCustomer}
          />
        </div>
      </div>

      {/* MODAL giao dịch */}
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
    </div>
  );
}