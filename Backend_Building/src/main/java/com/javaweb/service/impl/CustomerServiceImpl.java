package com.javaweb.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.constant.CustomerApprovalStatus;
import com.javaweb.constant.UserRole;
import com.javaweb.converter.CustomerConverter;
import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.model.CustomerSearchDTO;
import com.javaweb.repository.CustomerRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.CustomerEntity;
import com.javaweb.service.AssignmentCustomerService;
import com.javaweb.service.CustomerService;
import com.javaweb.utils.SecurityUtils;

@Service
public class CustomerServiceImpl implements CustomerService {

    // =========================================================
    // Repository thao tác bảng customer
    // =========================================================
    @Autowired
    private CustomerRepository customerRepository;

    // =========================================================
    // Repository thao tác bảng user
    // Dùng để lấy fullname người tạo / người duyệt
    // =========================================================
    @Autowired
    private UserRepository userRepository;

    // =========================================================
    // Converter chuyển DTO <-> Entity
    // =========================================================
    @Autowired
    private CustomerConverter customerConverter;

    // =========================================================
    // Service kiểm tra staff có quyền truy cập customer
    // =========================================================
    @Autowired
    private AssignmentCustomerService assignmentCustomerService;

    // =========================================================
    // HẰNG TRẠNG THÁI DUYỆT
    // =========================================================
    private static final String APPROVED = "APPROVED";

    // =========================================================
    // VALIDATE: Customer phải được duyệt
    // =========================================================
    private void validateCustomerApproved(CustomerEntity customer) {
        if (!CustomerApprovalStatus.APPROVED.equals(customer.getApprovalStatus())) {
            throw new RuntimeException("Customer chưa được duyệt");
        }
    }

    // =========================================================
    // VALIDATE: Customer đã duyệt thì không được sửa / xóa
    // =========================================================
    private void validateCustomerNotApproved(CustomerEntity customer) {
        if (CustomerApprovalStatus.APPROVED.equals(customer.getApprovalStatus())) {
            throw new RuntimeException("Customer đã được duyệt, không được phép chỉnh sửa");
        }
    }

    // =========================================================
    // HELPER:
    // Bổ sung fullname người tạo và người duyệt vào DTO
    //
    // Vì search đang dùng native query SELECT c.*
    // nên JPA không tự load user relation
    // =========================================================
    private void enrichUserNames(CustomerDTO dto) {

        // set tên người tạo
        if (dto.getCreatedBy() != null) {
            userRepository.findById(dto.getCreatedBy())
                    .ifPresent(user -> dto.setCreatedByName(user.getFullname()));
        }

        // set tên người duyệt
        if (dto.getApprovedBy() != null) {
            userRepository.findById(dto.getApprovedBy())
                    .ifPresent(user -> dto.setApprovedByName(user.getFullname()));
        }
    }

    // =========================================================
    // PUBLIC CREATE
    //
    // Khách bên ngoài tạo customer
    // approvalStatus = PENDING
    // createdBy = null
    // =========================================================
    @Override
    @Transactional
    public CustomerDTO createPublic(CustomerRequestDTO dto) {

        CustomerEntity entity = customerConverter.toEntity(dto);

        if (entity.getApprovalStatus() == null) {
            entity.setApprovalStatus(CustomerApprovalStatus.PENDING);
        }

        if (entity.getCreatedAt() == null) {
            entity.setCreatedAt(LocalDateTime.now());
        }

        CustomerEntity saved = customerRepository.save(entity);

        CustomerDTO result = customerConverter.toDTO(saved);
        result.setCreatedByName("Public");

        return result;
    }

    // =========================================================
    // INTERNAL CREATE
    //
    // Admin / Staff tạo customer
    // createdBy = user hiện tại
    // approvalStatus = PENDING
    // =========================================================
    @Override
    @Transactional
    public CustomerDTO create(CustomerRequestDTO dto) {

        CustomerEntity entity = customerConverter.toEntity(dto);

        entity.setApprovalStatus(CustomerApprovalStatus.PENDING);
        entity.setCreatedAt(LocalDateTime.now());

        Integer currentUserId = SecurityUtils.getCurrentUserId();
        entity.setCreatedBy(currentUserId);

        CustomerEntity saved = customerRepository.save(entity);

        CustomerDTO result = customerConverter.toDTO(saved);

        userRepository.findById(currentUserId)
                .ifPresent(user -> result.setCreatedByName(user.getFullname()));

        return result;
    }

    // =========================================================
    // FIND CUSTOMER BY ID
    //
    // ADMIN: xem được tất cả
    //
    // STAFF:
    // - chỉ xem customer đã APPROVED
    // =========================================================
    @Override
    @Transactional(readOnly = true)
    public CustomerDTO findById(Integer id) {

        CustomerEntity entity = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (SecurityUtils.hasRole("ROLE_" + UserRole.STAFF)) {
            validateCustomerApproved(entity);
        }

        CustomerDTO dto = customerConverter.toDTO(entity);

        enrichUserNames(dto);

        return dto;
    }

    // =========================================================
    // UPDATE CUSTOMER
    //
    // Chỉ cho phép update khi customer chưa được duyệt
    // =========================================================
    @Override
    @Transactional
    public CustomerDTO update(Integer id, CustomerRequestDTO dto) {

        CustomerEntity entity = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        validateCustomerNotApproved(entity);

        customerConverter.mapUpdate(dto, entity);

        CustomerEntity saved = customerRepository.save(entity);

        CustomerDTO result = customerConverter.toDTO(saved);

        enrichUserNames(result);

        return result;
    }

    // =========================================================
    // DELETE CUSTOMER
    //
    // Không cho xóa customer đã được duyệt
    // =========================================================
    @Override
    @Transactional
    public void delete(Integer id) {

        CustomerEntity entity = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        validateCustomerNotApproved(entity);

        customerRepository.delete(entity);
    }

    // =========================================================
    // ADMIN SEARCH
    //
    // Admin thấy tất cả customer
    // Có thể filter theo:
    // - status
    // - staff
    // - transaction
    // =========================================================
    @Override
    @Transactional(readOnly = true)
    public List<CustomerDTO> searchForAdmin(CustomerSearchDTO searchDTO) {

        List<CustomerEntity> entities = customerRepository.searchForAdmin(searchDTO);

        List<CustomerDTO> dtos = customerConverter.toDTOList(entities);

        for (CustomerDTO dto : dtos) {
            enrichUserNames(dto);
        }

        return dtos;
    }

    // =========================================================
    // STAFF SEARCH
    //
    // Staff chỉ thấy:
    // - customer được assign cho mình
    // - customer đã APPROVED
    // =========================================================
    @Override
    @Transactional(readOnly = true)
    public List<CustomerDTO> searchForStaff(CustomerSearchDTO searchDTO) {

        List<CustomerEntity> entities = customerRepository.searchApprovedCustomersForStaff(
                searchDTO.getFullname(),
                searchDTO.getPhone(),
                searchDTO.getTransactionTypeId());

        List<CustomerDTO> dtos = customerConverter.toDTOList(entities);

        for (CustomerDTO dto : dtos) {
            enrichUserNames(dto);
        }

        return dtos;
    }

    // =========================================================
    // MY CUSTOMERS
    //
    // Lấy danh sách customer của staff hiện tại
    // =========================================================
    @Override
    @Transactional(readOnly = true)
    public List<CustomerDTO> getMyCustomers() {

        Integer staffId = SecurityUtils.getCurrentUserId();

        if (staffId == null) {
            throw new RuntimeException("Unauthorized");
        }

        List<CustomerEntity> entities = customerRepository.findApprovedCustomersByStaffId(staffId);

        List<CustomerDTO> dtos = customerConverter.toDTOList(entities);

        for (CustomerDTO dto : dtos) {
            enrichUserNames(dto);
        }

        return dtos;
    }

    // =========================================================
    // ADMIN: Duyệt customer
    // =========================================================
    @Override
    @Transactional
    public void approveCustomer(Integer customerId) {

        Integer approvedBy = SecurityUtils.getCurrentUserId();

        CustomerEntity customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (CustomerApprovalStatus.APPROVED.equals(customer.getApprovalStatus())) {
            throw new RuntimeException("Customer đã được duyệt rồi");
        }

        customerRepository.approveCustomer(
                customerId,
                CustomerApprovalStatus.APPROVED,
                approvedBy);
    }

    // =========================================================
    // ADMIN: Từ chối customer
    // =========================================================
    @Override
    @Transactional
    public void rejectCustomer(Integer customerId) {

        Integer approvedBy = SecurityUtils.getCurrentUserId();

        CustomerEntity customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (CustomerApprovalStatus.REJECTED.equals(customer.getApprovalStatus())) {
            throw new RuntimeException("Customer đã bị từ chối rồi");
        }

        customerRepository.approveCustomer(
                customerId,
                CustomerApprovalStatus.REJECTED,
                approvedBy);
    }
}