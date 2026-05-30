"use client";
import { useEffect, useState, useMemo } from "react";
import { customerApi } from "@/features/customer/api/customer.api";
import { assignmentCustomerApi } from "@/features/customer/api/assignmentCustomer.api";
import { CUSTOMER_PERMISSIONS } from "@/features/customer/permissions";
import CustomerTable from "@/features/customer/components/table/CustomerTable";
import CustomerFilter from "@/features/customer/components/filter/CustomerFilter";
import CustomerModalHub from "@/features/customer/components/modal/CustomerModalHub";
import CustomerDetailModal from "@/features/customer/components/detail/CustomerDetailModal";
import { CustomerDTO, CustomerSearchDTO } from "@/features/customer/types/customer.type";

export default function MyCustomersPage() {
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<CustomerSearchDTO>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [transId, setTransId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await customerApi.getMyCustomers();
    setCustomers(res.data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  // Lọc client-side dựa trên filters
  const filteredCustomers = useMemo(() => {
    if (!filters.fullname && !filters.phone && !filters.transactionTypeId) {
      return customers;
    }
    return customers.filter(c => {
      let match = true;
      if (filters.fullname) {
        match = match && c.fullname?.toLowerCase().includes(filters.fullname.toLowerCase());
      }
      if (filters.phone) {
        match = match && c.phone?.includes(filters.phone);
      }
      // Lọc theo transactionTypeId: cần kiểm tra xem customer có giao dịch nào với type đó không? 
      // Tạm thời bỏ qua hoặc có thể lọc thông qua transactionTypeId nếu cần.
      return match;
    });
  }, [customers, filters]);

  const handleSearch = (params?: CustomerSearchDTO) => {
    setFilters(params || {});
  };

  const unassignCustomer = async (id: number) => {
    if (!confirm("Bỏ nhận khách hàng này?")) return;
    await assignmentCustomerApi.unassignCurrent(id);
    await loadData();
  };

  const reload = () => loadData();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Khách hàng đã nhận</h1>
          <button onClick={() => setShowCreate(true)} className="h-10 px-5 rounded-lg bg-black text-white">
            + Thêm khách hàng
          </button>
        </div>

        {/* Dùng CustomerFilter giống all-customers nhưng không có approvalStatus và staff filters */}
        <CustomerFilter onSearch={handleSearch} />

        <CustomerTable
          customers={filteredCustomers}
          loading={loading}
          permission={{ ...CUSTOMER_PERMISSIONS.STAFF, canTake: false, canUnassign: true }}
          onEdit={(c) => setEditId(c.id)}
          onTransactions={setTransId}
          onUnassign={unassignCustomer}
          onView={setViewId}
        />

        <CustomerModalHub
          showCreate={showCreate}
          editCustomerId={editId}
          assignCustomerId={null}
          transactionCustomerId={transId}
          transactionMode="STAFF"
          onCloseCreate={() => setShowCreate(false)}
          onCloseEdit={() => setEditId(null)}
          onCloseAssign={() => {}}
          onCloseTransaction={() => setTransId(null)}
          onSuccess={reload}
        />

        {viewId && <CustomerDetailModal customerId={viewId} onClose={() => setViewId(null)} />}
      </div>
    </div>
  );
}