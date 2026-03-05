package com.javaweb.service;

import java.util.List;
import com.javaweb.model.AssignmentCustomerDTO;
import com.javaweb.model.StaffAssignmentDTO;

public interface AssignmentCustomerService {
    List<StaffAssignmentDTO> loadStaff(Integer customerId);
    void assignCustomer(AssignmentCustomerDTO dto);
    void assignCurrentStaff(Integer customerId);
    void unassignCurrentStaff(Integer customerId);
    boolean staffCanAccess(Integer customerId, Integer staffId);
}