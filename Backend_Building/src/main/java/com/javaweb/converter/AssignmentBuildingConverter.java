package com.javaweb.converter;

import org.springframework.stereotype.Component;

import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.repository.entity.AssignmentBuildingEntity;
import com.javaweb.repository.entity.UserEntity;

@Component
public class AssignmentBuildingConverter {

    /**
     * Convert UserEntity + trạng thái assign → DTO
     */
    public StaffAssignmentDTO toStaffAssignmentDTO(
            UserEntity staff,
            boolean checked) {

        StaffAssignmentDTO dto = new StaffAssignmentDTO();
        dto.setStaffId(staff.getId());
        dto.setFullname(staff.getFullname());
        dto.setChecked(checked);
        return dto;
    }

    /**
     * Convert DTO → Entity
     */
    public AssignmentBuildingEntity toEntity(
            Integer buildingId,
            Integer staffId) {

        AssignmentBuildingEntity entity = new AssignmentBuildingEntity();
        entity.setBuildingId(buildingId);
        entity.setStaffId(staffId);
        return entity;
    }
}
