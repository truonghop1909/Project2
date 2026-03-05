import { useCallback, useRef, useState } from "react";
import { customerApi } from "../api/customer.api";
import { CustomerDTO, CustomerSearchDTO, CustomerRequestDTO } from "../types/customer.type";

export const useCustomer = () => {
  // ✅ 2 danh sách
  const [allCustomers, setAllCustomers] = useState<CustomerDTO[]>([]);
  const [myCustomers, setMyCustomers] = useState<CustomerDTO[]>([]);

  // ✅ nhớ filter cuối cùng của bảng "tất cả"
  const lastSearchAllRef = useRef<CustomerSearchDTO | undefined>(undefined);

  // ✅ ALL: /customer/search
  const fetchAllCustomers = useCallback((params?: CustomerSearchDTO) => {
    lastSearchAllRef.current = params;
    return customerApi.search(params).then((res) => setAllCustomers(res.data));
  }, []);

  // ✅ MY: /customer/my (staff)
  const fetchMyCustomers = useCallback(() => {
    return customerApi.getMyCustomers().then((res) => setMyCustomers(res.data));
  }, []);

  // ====== create/update (admin dùng) ======
  const createCustomer = useCallback(
    async (payload: CustomerRequestDTO) => {
      await customerApi.createPublic(payload);
      await fetchAllCustomers(lastSearchAllRef.current);
    },
    [fetchAllCustomers]
  );

  const updateCustomer = useCallback(
    async (id: number, payload: CustomerRequestDTO) => {
      await customerApi.update(id, payload);
      await fetchAllCustomers(lastSearchAllRef.current);
    },
    [fetchAllCustomers]
  );

  return {
    // ✅ lists
    allCustomers,
    myCustomers,

    // ✅ fetchers
    fetchAllCustomers,
    fetchMyCustomers,

    // ✅ create/update
    createCustomer,
    updateCustomer,

    // ✅ expose ref để page dùng reload giữ filter
    lastSearchAllRef,
  };
};