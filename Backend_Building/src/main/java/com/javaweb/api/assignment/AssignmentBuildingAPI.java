package com.javaweb.api.assignment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.AssignmentBuildingDTO;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.service.AssignmentBuildingService;

@RestController
@RequestMapping("/api/buildings")
public class AssignmentBuildingAPI {

    @Autowired
    private AssignmentBuildingService assignmentBuildingService;

    /**
     * Load danh sách nhân viên + trạng thái đã được giao cho tòa nhà
     */
    @GetMapping("/{buildingId}/staffs")
    public List<StaffAssignmentDTO> loadStaff(
            @PathVariable("buildingId") Integer buildingId) {

        return assignmentBuildingService.loadStaff(buildingId);
    }

    /**
     * Giao tòa nhà cho nhân viên
     */
    @PostMapping("/assignment")
    public void assignBuilding(
            @RequestBody AssignmentBuildingDTO dto) {

        assignmentBuildingService.assignBuilding(dto);
    }
}
