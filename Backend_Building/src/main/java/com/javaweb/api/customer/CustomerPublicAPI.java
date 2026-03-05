package com.javaweb.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.javaweb.converter.CustomerConverter;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.model.CustomerSearchDTO;
import com.javaweb.model.CustomerDTO;
import com.javaweb.repository.CustomerRepository;
import com.javaweb.repository.entity.CustomerEntity;
import com.javaweb.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerPublicAPI {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerConverter customerConverter;

    @Autowired
    private CustomerService customerService;

    // ================= CREATE =================
    @PostMapping("/public")
    public CustomerDTO createCustomer(@RequestBody CustomerRequestDTO dto) {

        CustomerEntity saved = customerRepository.save(
                customerConverter.toEntity(dto));

        return customerConverter.toDTO(saved);
    }

    // ✅ GET /api/customer/{id}
    @GetMapping("/{id}")
    public CustomerDTO getById(@PathVariable("id") Integer id) {
        return customerService.findById(id);
    }

    // ================= UPDATE =================
    @PutMapping("/{id}")
    public CustomerDTO updateCustomer(
            @PathVariable Integer id,
            @RequestBody CustomerRequestDTO dto) {

        CustomerEntity entity = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customerConverter.mapUpdate(dto, entity);

        CustomerEntity saved = customerRepository.save(entity);

        return customerConverter.toDTO(saved);
    }

    // search customer
    @GetMapping("/search")
    public List<CustomerDTO> search(CustomerSearchDTO searchDTO) {
        return customerService.search(searchDTO);
    }

    // ✅ Staff xem customer được giao cho mình
    @GetMapping("/my-customers")
    public List<CustomerDTO> getMyCustomers() {
        return customerService.getMyCustomers();
    }

}