package com.javaweb.model.dto.statistics;

public class TopStaffDTO {
    private Integer staffId;
    private String staffName;
    private Long totalBuildings;
    private Long totalCustomers;
    private Long totalAssignments; // building + customer
    public Integer getStaffId() {
        return staffId;
    }
    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }
    public String getStaffName() {
        return staffName;
    }
    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }
    public Long getTotalBuildings() {
        return totalBuildings;
    }
    public void setTotalBuildings(Long totalBuildings) {
        this.totalBuildings = totalBuildings;
    }
    public Long getTotalCustomers() {
        return totalCustomers;
    }
    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }
    public Long getTotalAssignments() {
        return totalAssignments;
    }
    public void setTotalAssignments(Long totalAssignments) {
        this.totalAssignments = totalAssignments;
    }

    // getters & setters
    
}