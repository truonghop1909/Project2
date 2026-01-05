package com.javaweb.service;

import java.util.List;

import com.javaweb.model.AssignmentBuildingDTO;
import com.javaweb.model.StaffAssignmentDTO;

public interface AssignmentBuildingService {

    List<StaffAssignmentDTO> loadStaff(Integer buildingId);

    void assignBuilding(AssignmentBuildingDTO dto);
}
