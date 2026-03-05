package com.javaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.converter.AssignmentCustomerConverter;
import com.javaweb.model.AssignmentCustomerDTO;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.repository.AssignmentCustomerRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.AssignmentCustomerService;
import com.javaweb.utils.SecurityUtils;

@Service
public class AssignmentCustomerServiceImpl implements AssignmentCustomerService {

    @Autowired
    private AssignmentCustomerRepository assignmentRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentCustomerConverter converter;

    @Override
    public List<StaffAssignmentDTO> loadStaff(Integer customerId) {

        List<UserEntity> staffs = userRepository.findByStatusAndRoles_Code(1, "ROLE_STAFF");
        List<Integer> assignedStaffIds = assignmentRepo.findStaffIdsByCustomerId(customerId);

        return staffs.stream()
            .map(staff -> converter.toStaffAssignmentDTO(staff, assignedStaffIds.contains(staff.getId())))
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void assignCustomer(AssignmentCustomerDTO dto) {

        assignmentRepo.deleteByCustomerId(dto.getCustomerId());

        for (Integer staffId : dto.getStaffIds()) {
            assignmentRepo.insert(dto.getCustomerId(), staffId);
        }
    }

    @Override
    @Transactional
    public void assignCurrentStaff(Integer customerId) {

        Integer staffId = SecurityUtils.getCurrentUserId();

        Integer cnt = assignmentRepo.countByCustomerIdAndStaffId(customerId, staffId);
        if (cnt != null && cnt > 0) {
            throw new RuntimeException("Bạn đã nhận khách hàng này rồi");
        }

        assignmentRepo.insert(customerId, staffId);
    }

    @Override
    @Transactional
    public void unassignCurrentStaff(Integer customerId) {

        Integer staffId = SecurityUtils.getCurrentUserId();
        assignmentRepo.deleteByCustomerIdAndStaffId(customerId, staffId);
    }

    @Override
    public boolean staffCanAccess(Integer customerId, Integer staffId) {
        Integer cnt = assignmentRepo.countByCustomerIdAndStaffId(customerId, staffId);
        return cnt != null && cnt > 0;
    }
}