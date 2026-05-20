package com.javaweb.model;

import java.util.List;

public class BuildingSearchRequest {
    // Các field cũ
    private String name;
    private String street;
    private Integer numberOfBasement;
    
    private Double floorAreaFrom;
    private Double floorAreaTo;
    
    private String direction;
    private String level;
    
    private Double rentPriceFrom;
    private Double rentPriceTo;
    
    private Double rentAreaFrom;
    private Double rentAreaTo;
    
    private Integer staffId;
    private List<String> rentTypes;
    
    // === ĐỊA CHỈ MỚI ===
    private String provinceId;    // Lọc theo mã tỉnh
    private String wardCode;      // Lọc theo mã xã/phường mới
    
    // Pagination
    private Integer page;
    private Integer size;
    private String sortBy;
    private String sortDirection;
    
    // ========== GETTERS & SETTERS ==========
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getStreet() {
        return street;
    }
    
    public void setStreet(String street) {
        this.street = street;
    }
    
    public Integer getNumberOfBasement() {
        return numberOfBasement;
    }
    
    public void setNumberOfBasement(Integer numberOfBasement) {
        this.numberOfBasement = numberOfBasement;
    }
    
    public Double getFloorAreaFrom() {
        return floorAreaFrom;
    }
    
    public void setFloorAreaFrom(Double floorAreaFrom) {
        this.floorAreaFrom = floorAreaFrom;
    }
    
    public Double getFloorAreaTo() {
        return floorAreaTo;
    }
    
    public void setFloorAreaTo(Double floorAreaTo) {
        this.floorAreaTo = floorAreaTo;
    }
    
    public String getDirection() {
        return direction;
    }
    
    public void setDirection(String direction) {
        this.direction = direction;
    }
    
    public String getLevel() {
        return level;
    }
    
    public void setLevel(String level) {
        this.level = level;
    }
    
    public Double getRentPriceFrom() {
        return rentPriceFrom;
    }
    
    public void setRentPriceFrom(Double rentPriceFrom) {
        this.rentPriceFrom = rentPriceFrom;
    }
    
    public Double getRentPriceTo() {
        return rentPriceTo;
    }
    
    public void setRentPriceTo(Double rentPriceTo) {
        this.rentPriceTo = rentPriceTo;
    }
    
    public Double getRentAreaFrom() {
        return rentAreaFrom;
    }
    
    public void setRentAreaFrom(Double rentAreaFrom) {
        this.rentAreaFrom = rentAreaFrom;
    }
    
    public Double getRentAreaTo() {
        return rentAreaTo;
    }
    
    public void setRentAreaTo(Double rentAreaTo) {
        this.rentAreaTo = rentAreaTo;
    }
    
    public Integer getStaffId() {
        return staffId;
    }
    
    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }
    
    public List<String> getRentTypes() {
        return rentTypes;
    }
    
    public void setRentTypes(List<String> rentTypes) {
        this.rentTypes = rentTypes;
    }
    
    // === ĐỊA CHỈ MỚI ===
    public String getProvinceId() {
        return provinceId;
    }
    
    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }
    
    public String getWardCode() {
        return wardCode;
    }
    
    public void setWardCode(String wardCode) {
        this.wardCode = wardCode;
    }
    
    public Integer getPage() {
        return page;
    }
    
    public void setPage(Integer page) {
        this.page = page;
    }
    
    public Integer getSize() {
        return size;
    }
    
    public void setSize(Integer size) {
        this.size = size;
    }
    
    public String getSortBy() {
        return sortBy;
    }
    
    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }
    
    public String getSortDirection() {
        return sortDirection;
    }
    
    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }
}