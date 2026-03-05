package com.javaweb.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.AssignmentCustomerDTO;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.service.AssignmentCustomerService;

@RestController
@RequestMapping("/api/customer")
public class AssignmentCustomerAPI {

    @Autowired
    private AssignmentCustomerService assignmentCustomerService;

    @GetMapping("/{customerId}/staffs")
    public List<StaffAssignmentDTO> loadStaff(@PathVariable Integer customerId) {
        return assignmentCustomerService.loadStaff(customerId);
    }

    @PostMapping("/assignment")
    public void assignCustomer(@RequestBody AssignmentCustomerDTO dto) {
        assignmentCustomerService.assignCustomer(dto);
    }

    @PostMapping("/{customerId}/assignment/current")
    public void assignCurrentStaff(@PathVariable Integer customerId) {
        assignmentCustomerService.assignCurrentStaff(customerId);
    }

    @DeleteMapping("/{customerId}/assignment/current")
    public void unassignCurrentStaff(@PathVariable Integer customerId) {
        assignmentCustomerService.unassignCurrentStaff(customerId);
    }
}