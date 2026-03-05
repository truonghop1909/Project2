package com.javaweb.service;

import java.util.List;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerSearchDTO;

public interface CustomerService {
    CustomerDTO createPublic(CustomerRequestDTO dto);
    List<CustomerDTO> search(CustomerSearchDTO searchDTO); // admin/staff dùng
    CustomerDTO findById(Integer id);
    CustomerDTO update(Integer id, CustomerRequestDTO dto);
    void delete(Integer id);
    // ✅ Staff xem khách của mình
    List<CustomerDTO> getMyCustomers();
}