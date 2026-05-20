package com.javaweb.model;

import java.util.List;

public class BuildingDetailDTO {

    /* ===== ID ===== */
    private Integer id;

    /* ===== BASIC INFO ===== */
    private String name;
    
    // === ĐỊA CHỈ ===
    private String street;
    private String address;     // Địa chỉ đầy đủ (có thể computed)
    
    // === ĐỊA CHỈ MỚI (SAU 07/2025) ===
    private String provinceId;   // Mã tỉnh (VD: "01")
    private String provinceName; // Tên tỉnh (VD: "Thành phố Hà Nội")
    private String wardCode;     // Mã xã/phường mới (VD: "00070")
    private String wardName;     // Tên xã/phường mới (VD: "Phường Hoàn Kiếm") - THAY THẾ CHO ward cũ
    
    private String structure;
    private String direction;
    private String level;

    /* ===== AREA & PRICE ===== */
    private Integer numberOfBasement;
    private Double floorArea;
    private Double rentPrice;
    private String rentPriceDescription;
    private Double serviceFee;
    private Double carFee;
    private Double motorFee;
    private Double overtimeFee;
    private String electricityFee;
    private String waterFee;

    /* ===== GOOGLE MAP + IMAGES ===== */
    private String googleMapLink;
    private String thumbnail;  // ← THÊM DÒNG NÀY - Ảnh đại diện
    private List<BuildingImageDTO> images;

    /* ===== CONTRACT ===== */
    private String deposit;
    private String payment;
    private String rentTime;
    private String decorationTime;

    /* ===== MANAGER ===== */
    private String managerName;
    private String managerPhone;

    /* ===== EXTRA ===== */
    private Double brokerageFee;
    private String note;

    /* ===== RELATION ===== */
    private List<Integer> rentAreas;
    private List<String> rentTypeCodes;

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

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getGoogleMapLink() {
        return googleMapLink;
    }

    public void setGoogleMapLink(String googleMapLink) {
        this.googleMapLink = googleMapLink;
    }
    
    // ===== GETTER & SETTER CHO THUMBNAIL =====
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public List<BuildingImageDTO> getImages() {
        return images;
    }

    public void setImages(List<BuildingImageDTO> images) {
        this.images = images;
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

    public List<Integer> getRentAreas() {
        return rentAreas;
    }

    public void setRentAreas(List<Integer> rentAreas) {
        this.rentAreas = rentAreas;
    }

    public List<String> getRentTypeCodes() {
        return rentTypeCodes;
    }

    public void setRentTypeCodes(List<String> rentTypeCodes) {
        this.rentTypeCodes = rentTypeCodes;
    }
    
    // Helper method để lấy địa chỉ đầy đủ
    public String getFullAddress() {
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