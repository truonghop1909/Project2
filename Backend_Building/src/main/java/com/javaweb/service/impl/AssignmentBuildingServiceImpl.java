package com.javaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.converter.AssignmentBuildingConverter;
import com.javaweb.model.AssignmentBuildingDTO;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.repository.AssignmentBuildingRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.AssignmentBuildingEntity;
import com.javaweb.repository.entity.UserEntity; // ✅ THÊM DÒNG NÀY
import com.javaweb.service.AssignmentBuildingService;

@Service
public class AssignmentBuildingServiceImpl implements AssignmentBuildingService {

    @Autowired
    private AssignmentBuildingRepository assignmentRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentBuildingConverter converter;

    @Override
    public List<StaffAssignmentDTO> loadStaff(Integer buildingId) {

        List<UserEntity> staffs = userRepository.findByStatusAndRoles_Code(1, "ROLE_STAFF");

        List<Integer> assignedStaffIds =
        assignmentRepo.findStaffIdsByBuildingId(buildingId);



        return staffs.stream()
                .map(staff -> converter.toStaffAssignmentDTO(
                        staff,
                        assignedStaffIds.contains(staff.getId())))
                .collect(Collectors.toList());
    }

    @Transactional
    public void assignBuilding(AssignmentBuildingDTO dto) {

        assignmentRepo.deleteByBuildingId(dto.getBuildingId());

        for (Integer staffId : dto.getStaffIds()) {
            assignmentRepo.save(
                    converter.toEntity(dto.getBuildingId(), staffId));
        }
    }

}
