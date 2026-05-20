package com.javaweb.model;

import java.util.List;

public class BuildingRequestDTO {

    private String name;

    // === ĐỊA CHỈ CŨ (GIỮ ĐỂ TƯƠNG THÍCH NGƯỢC) ===
    private String ward;           // Phường/Xã cũ
    private String street;
    private Integer districtId;    // ID quận/huyện cũ

    // === ĐỊA CHỈ MỚI (SAU 07/2025) ===
    private String provinceId;     // Mã tỉnh (VD: "01")
    private String provinceName;   // Tên tỉnh (VD: "Thành phố Hà Nội")
    private String wardCode;       // Mã xã/phường mới (VD: "00070")
    private String wardName;       // Tên xã/phường mới (VD: "Phường Hoàn Kiếm")

    // Building info
    private String structure;
    private Integer numberOfBasement;
    private Double floorArea;
    private String direction;
    private String level;

    // Rent & fee
    private Double rentPrice;
    private String rentPriceDescription;
    private Double serviceFee;
    private Double carFee;
    private Double motorFee;
    private Double overtimeFee;
    private String electricityFee;
    private String waterFee;
    private String deposit;
    private String payment;
    private String rentTime;
    private String decorationTime;

    // Manager
    private String managerName;
    private String managerPhone;
    private Double brokerageFee;
    private String note;

    // Images (thêm từ frontend)
    private String thumbnail;
    private String googleMapLink;

    // Rent area (1 building - many rent area)
    private List<String> rentAreas;

    // Type codes (thêm từ frontend)
    private List<String> rentTypeCodes;

    // ====================
    // Getter & Setter
    // ====================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // === ĐỊA CHỈ CŨ ===
    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

    // === ĐỊA CHỈ MỚI ===
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

    // Helper method để kiểm tra xem có dùng địa chỉ mới không
    public boolean isUsingNewAddress() {
        return (provinceId != null && !provinceId.isEmpty()) 
            || (wardCode != null && !wardCode.isEmpty());
    }

    // Helper method để lấy địa chỉ đầy đủ (từ các field mới)
    public String buildFullAddress() {
        StringBuilder address = new StringBuilder();
        if (street != null && !street.isEmpty()) {
            address.append(street);
        }
        if (wardName != null && !wardName.isEmpty()) {
            if (address.length() > 0) address.append(", ");
            address.append(wardName);
        }
        if (provinceName != null && !provinceName.isEmpty()) {
            if (address.length() > 0) address.append(", ");
            address.append(provinceName);
        }
        // Fallback sang địa chỉ cũ nếu không có địa chỉ mới
        if (address.length() == 0 && ward != null && !ward.isEmpty()) {
            address.append(ward);
        }
        return address.toString();
    }

    // === CÁC GETTER/SETTER KHÁC ===
    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
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

    public String getRentPriceDescription() {
        return rentPriceDescription;
    }

    public void setRentPriceDescription(String rentPriceDescription) {
        this.rentPriceDescription = rentPriceDescription;
    }

    public Double getServiceFee() {
        return serviceFee;
    }

    public void setServiceFee(Double serviceFee) {
        this.serviceFee = serviceFee;
    }

    public Double getCarFee() {
        return carFee;
    }

    public void setCarFee(Double carFee) {
        this.carFee = carFee;
    }

    public Double getMotorFee() {
        return motorFee;
    }

    public void setMotorFee(Double motorFee) {
        this.motorFee = motorFee;
    }

    public Double getOvertimeFee() {
        return overtimeFee;
    }

    public void setOvertimeFee(Double overtimeFee) {
        this.overtimeFee = overtimeFee;
    }

    public String getElectricityFee() {
        return electricityFee;
    }

    public void setElectricityFee(String electricityFee) {
        this.electricityFee = electricityFee;
    }

    public String getWaterFee() {
        return waterFee;
    }

    public void setWaterFee(String waterFee) {
        this.waterFee = waterFee;
    }

    public String getDeposit() {
        return deposit;
    }

    public void setDeposit(String deposit) {
        this.deposit = deposit;
    }

    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    public String getRentTime() {
        return rentTime;
    }

    public void setRentTime(String rentTime) {
        this.rentTime = rentTime;
    }

    public String getDecorationTime() {
        return decorationTime;
    }

    public void setDecorationTime(String decorationTime) {
        this.decorationTime = decorationTime;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getGoogleMapLink() {
        return googleMapLink;
    }

    public void setGoogleMapLink(String googleMapLink) {
        this.googleMapLink = googleMapLink;
    }

    public List<String> getRentAreas() {
        return rentAreas;
    }

    public void setRentAreas(List<String> rentAreas) {
        this.rentAreas = rentAreas;
    }

    public List<String> getRentTypeCodes() {
        return rentTypeCodes;
    }

    public void setRentTypeCodes(List<String> rentTypeCodes) {
        this.rentTypeCodes = rentTypeCodes;
    }
}