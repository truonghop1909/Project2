package com.javaweb.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.converter.CustomerConverter;
import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.model.CustomerSearchDTO;
import com.javaweb.repository.CustomerRepository;
import com.javaweb.repository.entity.CustomerEntity;
import com.javaweb.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerConverter customerConverter;

    // ================= CREATE =================
    @Override
    @Transactional
    public CustomerDTO createPublic(CustomerRequestDTO dto) {

        CustomerEntity entity = customerConverter.toEntity(dto);

        CustomerEntity saved = customerRepository.save(entity);

        return customerConverter.toDTO(saved);
    }

    // ================= FIND BY ID =================
    @Override
    public CustomerDTO findById(Integer id) {

        CustomerEntity entity = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return customerConverter.toDTO(entity);
    }

    // ================= UPDATE =================
    @Override
    @Transactional
    public CustomerDTO update(Integer id, CustomerRequestDTO dto) {

        CustomerEntity entity = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customerConverter.mapUpdate(dto, entity);

        CustomerEntity saved = customerRepository.save(entity);

        return customerConverter.toDTO(saved);
    }

    // ================= DELETE =================
    @Override
    @Transactional
    public void delete(Integer id) {

        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }

        customerRepository.deleteById(id);
    }

    // ================= SEARCH =================
    @Override
    public List<CustomerDTO> search(CustomerSearchDTO searchDTO) {

        List<CustomerEntity> entities = customerRepository.searchCustomers(
                searchDTO.getFullname(),
                searchDTO.getPhone(),
                searchDTO.getTransactionTypeId());

        return customerConverter.toDTOList(entities);
    }

    @Override
    public List<CustomerDTO> getMyCustomers() {

        Integer staffId = com.javaweb.utils.SecurityUtils.getCurrentUserId();
        if (staffId == null) {
            throw new RuntimeException("Unauthorized");
        }

        List<CustomerEntity> entities = customerRepository.findCustomersByStaffId(staffId);
        return customerConverter.toDTOList(entities);
    }
}