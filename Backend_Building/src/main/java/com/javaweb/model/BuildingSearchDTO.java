package com.javaweb.model;

import java.util.List;

public class BuildingSearchDTO {
    
    // ===== ID =====
    private Integer id;
    
    // ===== THÔNG TIN CƠ BẢN =====
    private String name;
    private String address;
    
    private String street;
    
    // ===== ĐỊA CHỈ MỚI (SAU 07/2025) =====
    private String provinceId;
    private String provinceName;
    private String wardCode;
    private String wardName;
    
    // ===== THÔNG TIN TÒA NHÀ =====
    private Integer numberOfBasement;
    private Double floorArea;
    private String direction;
    private String level;
    
    // ===== GIÁ THUÊ & PHÍ =====
    private Double rentPrice;
    private Double serviceFee;
    private Double brokerageFee;
    
    // ===== QUẢN LÝ =====
    private String managerName;
    private String managerPhone;
    
    // ===== HÌNH ẢNH =====
    private String thumbnail;  // ← THÊM DÒNG NÀY
    
    // ===== DIỆN TÍCH (DÙNG CHO TÌM KIẾM) =====
    private Double floorAreaFrom;
    private Double floorAreaTo;
    
    private Double rentAreaFrom;
    private Double rentAreaTo;
    
    // ===== GIÁ THUÊ (DÙNG CHO TÌM KIẾM) =====
    private Double rentPriceFrom;
    private Double rentPriceTo;
    
    // ===== QUẢN LÝ =====
    private Integer staffId;
    
    // ===== LOẠI TÒA NHÀ =====
    private List<String> rentTypes;
    
    // ===== PAGINATION & SORT =====
    private Integer page;
    private Integer size;
    private String sortBy;
    private String sortDirection;
    
    // ===== CONSTRUCTORS =====
    public BuildingSearchDTO() {}
    
    // ===== HELPER METHODS =====
    
    public boolean isUsingNewAddress() {
        return (provinceId != null && !provinceId.isEmpty()) 
            || (wardCode != null && !wardCode.isEmpty());
    }
    
    public Integer getOffset() {
        if (page == null || size == null) {
            return null;
        }
        return (page - 1) * size;
    }
    
    public boolean hasPagination() {
        return page != null && size != null && size > 0;
    }
    
    // ===== GETTERS & SETTERS =====
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getStreet() {
        return street;
    }
    
    public void setStreet(String street) {
        this.street = street;
    }
    
    public String getProvinceId() {
        return provinceId;
    }
    
    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }
    
    public String getProvinceName() {
        return provinceName;
    }
    
    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }
    
    public String getWardCode() {
        return wardCode;
    }
    
    public void setWardCode(String wardCode) {
        this.wardCode = wardCode;
    }
    
    public String getWardName() {
        return wardName;
    }
    
    public void setWardName(String wardName) {
        this.wardName = wardName;
    }
    
    public Integer getNumberOfBasement() {
        return numberOfBasement;
    }
    
    public void setNumberOfBasement(Integer numberOfBasement) {
        this.numberOfBasement = numberOfBasement;
    }
    
    public Double getFloorArea() {
        return floorArea;
    }
    
    public void setFloorArea(Double floorArea) {
        this.floorArea = floorArea;
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
    
    public Double getRentPrice() {
        return rentPrice;
    }
    
    public void setRentPrice(Double rentPrice) {
        this.rentPrice = rentPrice;
    }
    
    public Double getServiceFee() {
        return serviceFee;
    }
    
    public void setServiceFee(Double serviceFee) {
        this.serviceFee = serviceFee;
    }
    
    public Double getBrokerageFee() {
        return brokerageFee;
    }
    
    public void setBrokerageFee(Double brokerageFee) {
        this.brokerageFee = brokerageFee;
    }
    
    public String getManagerName() {
        return managerName;
    }
    
    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }
    
    public String getManagerPhone() {
        return managerPhone;
    }
    
    public void setManagerPhone(String managerPhone) {
        this.managerPhone = managerPhone;
    }
    
    // ===== GETTER & SETTER CHO THUMBNAIL =====
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    
    // === CÁC FIELD DÙNG CHO TÌM KIẾM ===
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
    
    // ===== TO STRING =====
    
    @Override
    public String toString() {
        return "BuildingSearchDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", street='" + street + '\'' +
                ", provinceId='" + provinceId + '\'' +
                ", provinceName='" + provinceName + '\'' +
                ", wardCode='" + wardCode + '\'' +
                ", wardName='" + wardName + '\'' +
                ", numberOfBasement=" + numberOfBasement +
                ", floorArea=" + floorArea +
                ", direction='" + direction + '\'' +
                ", level='" + level + '\'' +
                ", rentPrice=" + rentPrice +
                ", serviceFee=" + serviceFee +
                ", brokerageFee=" + brokerageFee +
                ", managerName='" + managerName + '\'' +
                ", managerPhone='" + managerPhone + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                '}';
    }
}