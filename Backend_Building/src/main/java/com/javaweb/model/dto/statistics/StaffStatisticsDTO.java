package com.javaweb.model.dto.statistics;

import java.util.List;
import com.javaweb.model.TransactionDTO;
import com.javaweb.model.CustomerDTO;

public class StaffStatisticsDTO {
    private Integer staffId;
    private String staffName;
    private Long assignedBuildingsCount;
    private Long assignedCustomersCount;
    private Long transactionsCount;
    private Double totalRevenueFromAssignedBuildings;
    private List<CustomerDTO> recentCustomers;   // 5 customer mới nhất
    private List<TransactionDTO> recentTransactions; // 5 giao dịch gần nhất
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
    public Long getAssignedBuildingsCount() {
        return assignedBuildingsCount;
    }
    public void setAssignedBuildingsCount(Long assignedBuildingsCount) {
        this.assignedBuildingsCount = assignedBuildingsCount;
    }
    public Long getAssignedCustomersCount() {
        return assignedCustomersCount;
    }
    public void setAssignedCustomersCount(Long assignedCustomersCount) {
        this.assignedCustomersCount = assignedCustomersCount;
    }
    public Long getTransactionsCount() {
        return transactionsCount;
    }
    public void setTransactionsCount(Long transactionsCount) {
        this.transactionsCount = transactionsCount;
    }
    public Double getTotalRevenueFromAssignedBuildings() {
        return totalRevenueFromAssignedBuildings;
    }
    public void setTotalRevenueFromAssignedBuildings(Double totalRevenueFromAssignedBuildings) {
        this.totalRevenueFromAssignedBuildings = totalRevenueFromAssignedBuildings;
    }
    public List<CustomerDTO> getRecentCustomers() {
        return recentCustomers;
    }
    public void setRecentCustomers(List<CustomerDTO> recentCustomers) {
        this.recentCustomers = recentCustomers;
    }
    public List<TransactionDTO> getRecentTransactions() {
        return recentTransactions;
    }
    public void setRecentTransactions(List<TransactionDTO> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }

    // getters & setters
    
}