package com.javaweb.converter;

import org.springframework.stereotype.Component;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.repository.entity.UserEntity;

@Component
public class AssignmentCustomerConverter {
    public StaffAssignmentDTO toStaffAssignmentDTO(UserEntity staff, boolean checked) {
        StaffAssignmentDTO dto = new StaffAssignmentDTO();
        dto.setStaffId(staff.getId());
        dto.setFullname(staff.getFullname());
        dto.setChecked(checked);
        return dto;
    }
}