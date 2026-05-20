package com.javaweb.api.assignment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.AssignmentCustomerDTO;
import com.javaweb.model.StaffAssignmentDTO;
import com.javaweb.service.AssignmentCustomerService;

@RestController
@RequestMapping("/api/customer")
public class AssignmentCustomerAPI {

    @Autowired
    private AssignmentCustomerService assignmentCustomerService;

    /**
     * =========================================================
     * ADMIN: Lấy danh sách staff/admin để assign cho customer
     * API: GET /api/customer/{customerId}/staffs
     * =========================================================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{customerId}/staffs")
    public List<StaffAssignmentDTO> loadStaff(@PathVariable Integer customerId) {
        return assignmentCustomerService.loadStaff(customerId);
    }

    /**
     * =========================================================
     * ADMIN: Gán customer cho nhiều staff/admin
     * API: POST /api/customer/assignment
     * Body:
     * {
     *   "customerId": 1,
     *   "staffIds": [2,3]
     * }
     * =========================================================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/assignment")
    public void assignCustomer(@RequestBody AssignmentCustomerDTO dto) {
        assignmentCustomerService.assignCustomer(dto);
    }

    /**
     * =========================================================
     * STAFF/ADMIN: User hiện tại tự nhận customer
     * API: POST /api/customer/{customerId}/assignment/current
     * =========================================================
     */
    @PreAuthorize("hasAnyRole('STAFF','ADMIN')")
    @PostMapping("/{customerId}/assignment/current")
    public void assignCurrentStaff(@PathVariable Integer customerId) {
        assignmentCustomerService.assignCurrentStaff(customerId);
    }

    /**
     * =========================================================
     * STAFF/ADMIN: User hiện tại bỏ nhận customer
     * API: DELETE /api/customer/{customerId}/assignment/current
     * =========================================================
     */
    @PreAuthorize("hasAnyRole('STAFF','ADMIN')")
    @DeleteMapping("/{customerId}/assignment/current")
    public void unassignCurrentStaff(@PathVariable Integer customerId) {
        assignmentCustomerService.unassignCurrentStaff(customerId);
    }
}