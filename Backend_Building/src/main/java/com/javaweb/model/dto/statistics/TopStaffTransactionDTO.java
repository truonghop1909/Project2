// com.javaweb.model.dto.statistics.TopStaffTransactionDTO.java
package com.javaweb.model.dto.statistics;

public class TopStaffTransactionDTO {
    private Integer staffId;
    private String staffName;
    private Long transactionCount;
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
    public Long getTransactionCount() {
        return transactionCount;
    }
    public void setTransactionCount(Long transactionCount) {
        this.transactionCount = transactionCount;
    }

    // constructor, getters, setters
    
}