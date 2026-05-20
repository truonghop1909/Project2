package com.javaweb.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.repository.entity.AssignmentBuildingEntity;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.UserRepository;

import customexceptions.BuildingAssignedException;

@Component
public class AssignmentBuildingConverter {

    @Autowired
    private BuildingRepository buildingRepository;
    
    @Autowired
    private UserRepository userRepository;

    /**
     * Convert UserEntity + trạng thái assign → DTO
     * Dùng cho việc hiển thị danh sách staff có checkbox
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
     * Convert từ buildingId + staffId → Entity (có quan hệ đầy đủ)
     * Dùng khi tạo mới assignment
     */
    public AssignmentBuildingEntity toEntity(
            Integer buildingId,
            Integer staffId) {

        // Lấy BuildingEntity từ database
        BuildingEntity building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new BuildingAssignedException("Building với id " + buildingId + " không tồn tại"));
        
        // Lấy UserEntity từ database
        UserEntity staff = userRepository.findById(staffId)
                .orElseThrow(() -> new BuildingAssignedException("Staff với id " + staffId + " không tồn tại"));

        // Tạo entity và set quan hệ
        AssignmentBuildingEntity entity = new AssignmentBuildingEntity();
        entity.setBuilding(building);
        entity.setStaff(staff);
        
        return entity;
    }
    
    /**
     * Convert từ DTO (có sẵn building và staff entity) → Entity
     * Dùng khi đã có sẵn entity (tránh query lại DB)
     */
    public AssignmentBuildingEntity toEntity(
            BuildingEntity building,
            UserEntity staff) {

        AssignmentBuildingEntity entity = new AssignmentBuildingEntity();
        entity.setBuilding(building);
        entity.setStaff(staff);
        
        return entity;
    }
}