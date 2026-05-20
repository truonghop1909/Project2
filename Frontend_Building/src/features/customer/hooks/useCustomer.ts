import { useCallback, useRef, useState } from "react";
import { customerApi } from "../api/customer.api";
import {
  CustomerDTO,
  CustomerSearchDTO,
  CustomerRequestDTO,
} from "../types/customer.type";

type UserRole = "ADMIN" | "STAFF";

export const useCustomer = () => {
  const [allCustomers, setAllCustomers] = useState<CustomerDTO[]>([]);
  const [myCustomers, setMyCustomers] = useState<CustomerDTO[]>([]);

  const lastSearchAllRef = useRef<CustomerSearchDTO | undefined>(undefined);

  // ADMIN: /customer/admin/search
  const fetchAdminCustomers = useCallback((params?: CustomerSearchDTO) => {
    lastSearchAllRef.current = params;
    return customerApi
      .searchForAdmin(params)
      .then((res) => setAllCustomers(res.data));
  }, []);

  // STAFF: /customer/staff/search
  const fetchStaffCustomers = useCallback((params?: CustomerSearchDTO) => {
    lastSearchAllRef.current = params;
    return customerApi
      .searchForStaff(params)
      .then((res) => setAllCustomers(res.data));
  }, []);

  // Hàm chung theo role
  const fetchAllCustomers = useCallback(
    (role: UserRole, params?: CustomerSearchDTO) => {
      if (role === "ADMIN") {
        return fetchAdminCustomers(params);
      }
      return fetchStaffCustomers(params);
    },
    [fetchAdminCustomers, fetchStaffCustomers]
  );

  // STAFF / ADMIN: /customer/staff/my-customers
  const fetchMyCustomers = useCallback(() => {
    return customerApi
      .getMyCustomers()
      .then((res) => setMyCustomers(res.data));
  }, []);

  // ADMIN / STAFF nội bộ tạo customer
  const createCustomer = useCallback(
    async (role: UserRole, payload: CustomerRequestDTO) => {
      await customerApi.createInternal(payload);
      await fetchAllCustomers(role, lastSearchAllRef.current);
    },
    [fetchAllCustomers]
  );

  const updateCustomer = useCallback(
    async (role: UserRole, id: number, payload: CustomerRequestDTO) => {
      await customerApi.update(id, payload);
      await fetchAllCustomers(role, lastSearchAllRef.current);
    },
    [fetchAllCustomers]
  );

  const approveCustomer = useCallback(
    async (id: number) => {
      await customerApi.approve(id);
      await fetchAdminCustomers(lastSearchAllRef.current);
    },
    [fetchAdminCustomers]
  );

  const rejectCustomer = useCallback(
    async (id: number) => {
      await customerApi.reject(id);
      await fetchAdminCustomers(lastSearchAllRef.current);
    },
    [fetchAdminCustomers]
  );

  return {
    allCustomers,
    myCustomers,

    fetchAllCustomers,
    fetchAdminCustomers,
    fetchStaffCustomers,
    fetchMyCustomers,

    createCustomer,
    updateCustomer,
    approveCustomer,
    rejectCustomer,

    lastSearchAllRef,
  };
};