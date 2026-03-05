package com.javaweb.model;

import java.util.List;

public class AssignmentCustomerDTO {
    private Integer customerId;
    private List<Integer> staffIds;
    // getter/setter
    public Integer getCustomerId() {
        return customerId;
    }
    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
    public List<Integer> getStaffIds() {
        return staffIds;
    }
    public void setStaffIds(List<Integer> staffIds) {
        this.staffIds = staffIds;
    }
    
}