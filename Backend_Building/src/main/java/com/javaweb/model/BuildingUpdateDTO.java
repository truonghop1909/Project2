package com.javaweb.model;

import java.util.List;

public class BuildingUpdateDTO {

    /* ===== BASIC INFO ===== */
    private String name;
    private Integer districtId;
    private String ward;
    private String street;
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
    private List<Integer> rentAreas;      // VD: [100,200,300]
    private List<String> rentTypeCodes;   // VD: ["OFFICE","HOUSE"]

    /* ===== getter / setter ===== */

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Integer districtId) {
        this.districtId = districtId;
    }

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

    public String getStructure() {
        return structure;
    }

    public void setStructure(String structure) {
        this.structure = structure;
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
}
