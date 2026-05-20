package com.javaweb.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.model.CustomerSearchDTO;
import com.javaweb.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerAPI {

    @Autowired
    private CustomerService customerService;

    // =====================================================
    // 🌐 PUBLIC - KHÁCH HÀNG TẠO CUSTOMER (ĐĂNG KÝ THÔNG TIN)
    // POST /api/customer/public
    // =====================================================
    @PostMapping("/public")
    public CustomerDTO createCustomer(@RequestBody CustomerRequestDTO dto) {
        return customerService.createPublic(dto);
    }

    // =====================================================
    // 👨‍💼 ADMIN / STAFF - TẠO CUSTOMER
    // POST /api/customer
    // =====================================================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public CustomerDTO createCustomerInternal(@RequestBody CustomerRequestDTO dto) {
        return customerService.create(dto);
    }

    // =====================================================
    // 📄 ADMIN / STAFF - XEM CHI TIẾT CUSTOMER
    // GET /api/customer/{id}
    // =====================================================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public CustomerDTO getById(@PathVariable("id") Integer id) {
        return customerService.findById(id);
    }

    // =====================================================
    // ✏️ ADMIN / STAFF - CẬP NHẬT CUSTOMER
    // PUT /api/customer/{id}
    // =====================================================
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PutMapping("/{id}")
    public CustomerDTO updateCustomer(
            @PathVariable Integer id,
            @RequestBody CustomerRequestDTO dto) {
        return customerService.update(id, dto);
    }

    // =====================================================
    // ✅ ADMIN - DUYỆT CUSTOMER
    // PUT /api/customer/{id}/approve
    // =====================================================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/approve")
    public void approveCustomer(@PathVariable Integer id) {
        customerService.approveCustomer(id);
    }

    // =====================================================
    // ❌ ADMIN - TỪ CHỐI CUSTOMER
    // PUT /api/customer/{id}/reject
    // =====================================================
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/reject")
    public void rejectCustomer(@PathVariable Integer id) {
        customerService.rejectCustomer(id);
    }

    // =====================================================
    // 👨‍💼 ADMIN - TÌM KIẾM CUSTOMER
    // theo: tên, SĐT, loại giao dịch, trạng thái, staff quản lý
    // GET /api/customer/admin/search
    // =====================================================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/search")
    public List<CustomerDTO> searchForAdmin(CustomerSearchDTO searchDTO) {
        return customerService.searchForAdmin(searchDTO);
    }

    // =====================================================
    // 👨‍💻 STAFF - TÌM KIẾM CUSTOMER CỦA CHÍNH MÌNH
    // theo: tên, SĐT, loại giao dịch
    // chỉ hiển thị customer đã APPROVED
    // GET /api/customer/staff/search
    // =====================================================
    @PreAuthorize("hasRole('STAFF')")
    @GetMapping("/staff/search")
    public List<CustomerDTO> searchForStaff(CustomerSearchDTO searchDTO) {
        return customerService.searchForStaff(searchDTO);
    }

    // =====================================================
    // 👨‍💻 STAFF - XEM DANH SÁCH CUSTOMER ĐƯỢC GIAO
    // GET /api/customer/staff/my-customers
    // =====================================================
    @PreAuthorize("hasAnyRole('STAFF' , 'ADMIN')")
    @GetMapping("/staff/my-customers")
    public List<CustomerDTO> getMyCustomers() {
        return customerService.getMyCustomers();
    }
}