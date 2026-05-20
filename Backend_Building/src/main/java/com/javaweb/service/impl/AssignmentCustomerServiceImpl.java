package com.javaweb.service.impl;

import java.util.Arrays;  // 👈 Thêm import này
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.constant.CustomerApprovalStatus;
import com.javaweb.constant.UserRole;
import com.javaweb.converter.AssignmentCustomerConverter;
import com.javaweb.model.AssignmentCustomerDTO;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.repository.AssignmentCustomerRepository;
import com.javaweb.repository.CustomerRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.AssignmentCustomerEntity;
import com.javaweb.repository.entity.CustomerEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.AssignmentCustomerService;
import com.javaweb.utils.SecurityUtils;

import customexceptions.BuildingAssignedException;
import customexceptions.FieldRequiredException;

@Service
public class AssignmentCustomerServiceImpl implements AssignmentCustomerService {

    @Autowired
    private AssignmentCustomerRepository assignmentRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AssignmentCustomerConverter converter;

    private boolean isCustomerApproved(Integer customerId) {
        return customerRepository.existsByIdAndApprovalStatus(
                customerId,
                CustomerApprovalStatus.APPROVED
        );
    }

    private void validateCustomerApproved(Integer customerId) {
        if (!isCustomerApproved(customerId)) {
            throw new BuildingAssignedException("Customer chưa được duyệt, không thể thao tác");
        }
    }

    private void validateRequiredFields(Integer customerId, String action) {
        if (customerId == null) {
            throw new FieldRequiredException("customerId không được để trống khi " + action);
        }
    }

    private UserEntity validateAndGetUser(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BuildingAssignedException("User với id " + userId + " không tồn tại"));
    }

    private CustomerEntity validateAndGetCustomer(Integer customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new BuildingAssignedException("Customer với id " + customerId + " không tồn tại"));
    }

    @Override
    public List<StaffAssignmentDTO> loadStaff(Integer customerId) {
        validateRequiredFields(customerId, "load danh sách staff");
        validateCustomerApproved(customerId);

        // 👇 Đã sửa: dùng Arrays.asList thay vì List.of
        List<UserEntity> users = userRepository.findDistinctByStatusAndRoles_CodeIn(
                1,
                Arrays.asList(UserRole.STAFF, UserRole.ADMIN)
        );

        List<Integer> assignedStaffIds = assignmentRepo.findStaffIdsByCustomerId(customerId);

        return users.stream()
                .map(user -> converter.toStaffAssignmentDTO(
                        user,
                        assignedStaffIds.contains(user.getId())
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void assignCustomer(AssignmentCustomerDTO dto) {
        if (dto == null) {
            throw new FieldRequiredException("DTO không được để trống");
        }
        
        validateRequiredFields(dto.getCustomerId(), "assign customer");
        validateCustomerApproved(dto.getCustomerId());
        
        CustomerEntity customer = validateAndGetCustomer(dto.getCustomerId());
        
        assignmentRepo.deleteByCustomerId(dto.getCustomerId());
        
        if (dto.getStaffIds() == null || dto.getStaffIds().isEmpty()) {
            return;
        }
        
        for (Integer staffId : dto.getStaffIds()) {
            UserEntity staff = validateAndGetUser(staffId);
            
            AssignmentCustomerEntity assignment = new AssignmentCustomerEntity();
            assignment.setCustomer(customer);
            assignment.setStaff(staff);
            
            assignmentRepo.save(assignment);
        }
    }

    @Override
    @Transactional
    public void assignCurrentStaff(Integer customerId) {
        validateRequiredFields(customerId, "nhận customer");
        validateCustomerApproved(customerId);
        
        Integer staffId = SecurityUtils.getCurrentUserId();
        if (staffId == null) {
            throw new BuildingAssignedException("Không thể xác định user hiện tại");
        }
        
        boolean alreadyAssigned = assignmentRepo.existsByCustomerIdAndStaffId(customerId, staffId);
        if (alreadyAssigned) {
            throw new BuildingAssignedException("Bạn đã nhận khách hàng này rồi");
        }
        
        CustomerEntity customer = validateAndGetCustomer(customerId);
        UserEntity staff = validateAndGetUser(staffId);
        
        AssignmentCustomerEntity assignment = new AssignmentCustomerEntity();
        assignment.setCustomer(customer);
        assignment.setStaff(staff);
        
        assignmentRepo.save(assignment);
    }

    @Override
    @Transactional
    public void unassignCurrentStaff(Integer customerId) {
        validateRequiredFields(customerId, "bỏ nhận customer");
        validateCustomerApproved(customerId);
        
        Integer staffId = SecurityUtils.getCurrentUserId();
        if (staffId == null) {
            throw new BuildingAssignedException("Không thể xác định user hiện tại");
        }
        
        boolean exists = assignmentRepo.existsByCustomerIdAndStaffId(customerId, staffId);
        if (!exists) {
            throw new BuildingAssignedException("Bạn chưa nhận khách hàng này, không thể bỏ nhận");
        }
        
        assignmentRepo.deleteByCustomerIdAndStaffId(customerId, staffId);
    }

    @Override
    public boolean staffCanAccess(Integer customerId, Integer staffId) {
        if (customerId == null || staffId == null) {
            return false;
        }
        
        if (!isCustomerApproved(customerId)) {
            return false;
        }
        
        return assignmentRepo.existsByCustomerIdAndStaffId(customerId, staffId);
    }
    
    @Override
    public List<Integer> getMyAssignedCustomers() {
        Integer staffId = SecurityUtils.getCurrentUserId();
        if (staffId == null) {
            throw new BuildingAssignedException("Không thể xác định user hiện tại");
        }
        return assignmentRepo.findCustomerIdsByStaffId(staffId);
    }
}