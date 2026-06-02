package com.javaweb.model.dto.statistics;

public class MonthlyCountDTO {
    private String month;  // "2025-01"
    private Long count;

    public MonthlyCountDTO() {}
    public MonthlyCountDTO(String month, Long count) {
        this.month = month;
        this.count = count;
    }
    // getters & setters
    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public Long getCount() {
        return count;
    }
    public void setCount(Long count) {
        this.count = count;
    }
    
}