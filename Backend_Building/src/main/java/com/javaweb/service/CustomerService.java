package com.javaweb.service;

import java.util.List;

import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.model.CustomerSearchDTO;

public interface CustomerService {

    CustomerDTO createPublic(CustomerRequestDTO dto);

    CustomerDTO create(CustomerRequestDTO dto);

    CustomerDTO findById(Integer id);

    CustomerDTO update(Integer id, CustomerRequestDTO dto);

    void delete(Integer id);

    List<CustomerDTO> searchForAdmin(CustomerSearchDTO searchDTO);

    List<CustomerDTO> searchForStaff(CustomerSearchDTO searchDTO);

    List<CustomerDTO> getMyCustomers();

    void approveCustomer(Integer customerId);

    void rejectCustomer(Integer customerId);
}