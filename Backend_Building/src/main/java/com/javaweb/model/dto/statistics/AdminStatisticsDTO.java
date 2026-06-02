package com.javaweb.model.dto.statistics;

import java.util.List;
import java.util.Map;

public class AdminStatisticsDTO {
    // Building
    private Long totalBuildings;
    private Double totalFloorArea;
    private Double totalExpectedRevenue;
    private Map<String, Long> buildingsByProvince;
    private List<TopBuildingDTO> top5HighestRentBuildings;

    // Customer
    private Long totalCustomers;
    private Long pendingCustomers;
    private Long approvedCustomers;
    private Long rejectedCustomers;
    private List<MonthlyCountDTO> newCustomersByMonth; // 6 tháng gần nhất
    private Double averageApprovalTimeHours; // giờ trung bình từ tạo đến duyệt

    // Transaction
    private Long totalTransactions;
    private List<MonthlyCountDTO> transactionsByMonth;
    private Map<String, Long> transactionsByType; // tên loại giao dịch -> số lượng

    // Staff & Assignment
    private Long totalActiveStaff;
    private List<TopStaffDTO> top3StaffByBuildings;
    private List<TopStaffDTO> top3StaffByCustomers;
    private Double staffUtilizationRate; // % staff có ít nhất 1 assignment

    // Image
    private Long totalImages;
    private Long buildingsWithThumbnail;
    public Long getTotalBuildings() {
        return totalBuildings;
    }
    public void setTotalBuildings(Long totalBuildings) {
        this.totalBuildings = totalBuildings;
    }
    public Double getTotalFloorArea() {
        return totalFloorArea;
    }
    public void setTotalFloorArea(Double totalFloorArea) {
        this.totalFloorArea = totalFloorArea;
    }
    public Double getTotalExpectedRevenue() {
        return totalExpectedRevenue;
    }
    public void setTotalExpectedRevenue(Double totalExpectedRevenue) {
        this.totalExpectedRevenue = totalExpectedRevenue;
    }
    public Map<String, Long> getBuildingsByProvince() {
        return buildingsByProvince;
    }
    public void setBuildingsByProvince(Map<String, Long> buildingsByProvince) {
        this.buildingsByProvince = buildingsByProvince;
    }
    public List<TopBuildingDTO> getTop5HighestRentBuildings() {
        return top5HighestRentBuildings;
    }
    public void setTop5HighestRentBuildings(List<TopBuildingDTO> top5HighestRentBuildings) {
        this.top5HighestRentBuildings = top5HighestRentBuildings;
    }
    public Long getTotalCustomers() {
        return totalCustomers;
    }
    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }
    public Long getPendingCustomers() {
        return pendingCustomers;
    }
    public void setPendingCustomers(Long pendingCustomers) {
        this.pendingCustomers = pendingCustomers;
    }
    public Long getApprovedCustomers() {
        return approvedCustomers;
    }
    public void setApprovedCustomers(Long approvedCustomers) {
        this.approvedCustomers = approvedCustomers;
    }
    public Long getRejectedCustomers() {
        return rejectedCustomers;
    }
    public void setRejectedCustomers(Long rejectedCustomers) {
        this.rejectedCustomers = rejectedCustomers;
    }
    public List<MonthlyCountDTO> getNewCustomersByMonth() {
        return newCustomersByMonth;
    }
    public void setNewCustomersByMonth(List<MonthlyCountDTO> newCustomersByMonth) {
        this.newCustomersByMonth = newCustomersByMonth;
    }
    public Double getAverageApprovalTimeHours() {
        return averageApprovalTimeHours;
    }
    public void setAverageApprovalTimeHours(Double averageApprovalTimeHours) {
        this.averageApprovalTimeHours = averageApprovalTimeHours;
    }
    public Long getTotalTransactions() {
        return totalTransactions;
    }
    public void setTotalTransactions(Long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
    public List<MonthlyCountDTO> getTransactionsByMonth() {
        return transactionsByMonth;
    }
    public void setTransactionsByMonth(List<MonthlyCountDTO> transactionsByMonth) {
        this.transactionsByMonth = transactionsByMonth;
    }
    public Map<String, Long> getTransactionsByType() {
        return transactionsByType;
    }
    public void setTransactionsByType(Map<String, Long> transactionsByType) {
        this.transactionsByType = transactionsByType;
    }
    public Long getTotalActiveStaff() {
        return totalActiveStaff;
    }
    public void setTotalActiveStaff(Long totalActiveStaff) {
        this.totalActiveStaff = totalActiveStaff;
    }
    public List<TopStaffDTO> getTop3StaffByBuildings() {
        return top3StaffByBuildings;
    }
    public void setTop3StaffByBuildings(List<TopStaffDTO> top3StaffByBuildings) {
        this.top3StaffByBuildings = top3StaffByBuildings;
    }
    public List<TopStaffDTO> getTop3StaffByCustomers() {
        return top3StaffByCustomers;
    }
    public void setTop3StaffByCustomers(List<TopStaffDTO> top3StaffByCustomers) {
        this.top3StaffByCustomers = top3StaffByCustomers;
    }
    public Double getStaffUtilizationRate() {
        return staffUtilizationRate;
    }
    public void setStaffUtilizationRate(Double staffUtilizationRate) {
        this.staffUtilizationRate = staffUtilizationRate;
    }
    public Long getTotalImages() {
        return totalImages;
    }
    public void setTotalImages(Long totalImages) {
        this.totalImages = totalImages;
    }
    public Long getBuildingsWithThumbnail() {
        return buildingsWithThumbnail;
    }
    public void setBuildingsWithThumbnail(Long buildingsWithThumbnail) {
        this.buildingsWithThumbnail = buildingsWithThumbnail;
    }

    // Getters & Setters (bỏ qua để ngắn, bạn tự sinh hoặc dùng Lombok)
    
}