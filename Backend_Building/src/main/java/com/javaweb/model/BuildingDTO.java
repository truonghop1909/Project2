package com.javaweb.model;

public class BuildingDTO {
    private Integer id;
    private String name;
    private String address;
    
    // === ĐỊA CHỈ MỚI ===
    private String provinceName;
    private String wardName;  // Dùng wardName thay cho ward cũ
    private String street;
    
    private String direction;
    private String level;
    
    private Double floorArea;
    private Double rentPrice;
    private Double serviceFee;
    
    private String managerName;
    private String managerPhone;
    
    private Double brokerageFee;
    private String rentArea;
    
    private String googleMapLink;

    public BuildingDTO() {}

    // ========== GETTERS & SETTERS ==========
    
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
    
    public String getProvinceName() {
        return provinceName;
    }
    
    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }
    
    public String getWardName() {
        return wardName;
    }
    
    public void setWardName(String wardName) {
        this.wardName = wardName;
    }
    
    public String getStreet() {
        return street;
    }
    
    public void setStreet(String street) {
        this.street = street;
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
    
    public Double getFloorArea() {
        return floorArea;
    }
    
    public void setFloorArea(Double floorArea) {
        this.floorArea = floorArea;
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

    public Double getBrokerageFee() {
        return brokerageFee;
    }
    
    public void setBrokerageFee(Double brokerageFee) {
        this.brokerageFee = brokerageFee;
    }

    public String getRentArea() {
        return rentArea;
    }
    
    public void setRentArea(String rentArea) {
        this.rentArea = rentArea;
    }

    public String getGoogleMapLink() {
        return googleMapLink;
    }

    public void setGoogleMapLink(String googleMapLink) {
        this.googleMapLink = googleMapLink;
    }
    
    // Helper method để tạo địa chỉ hiển thị
    public String getDisplayAddress() {
        if (address != null && !address.isEmpty()) {
            return address;
        }
        StringBuilder sb = new StringBuilder();
        if (street != null && !street.isEmpty()) {
            sb.append(street);
        }
        if (wardName != null && !wardName.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(wardName);
        }
        if (provinceName != null && !provinceName.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(provinceName);
        }
        return sb.toString();
    }
}