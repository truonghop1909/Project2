package com.javaweb.model.dto.statistics;

public class TopBuildingDTO {
    private Integer buildingId;
    private String name;
    private Double rentPrice;
    private String provinceName;

    // Constructor mặc định (cần cho Jackson deserialization)
    public TopBuildingDTO() {}

    // Constructor có tham số (dùng để tạo object từ API)
    public TopBuildingDTO(Integer buildingId, String name, Double rentPrice, String provinceName) {
        this.buildingId = buildingId;
        this.name = name;
        this.rentPrice = rentPrice;
        this.provinceName = provinceName;
    }

    // Getters và Setters
    public Integer getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Integer buildingId) {
        this.buildingId = buildingId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getRentPrice() {
        return rentPrice;
    }

    public void setRentPrice(Double rentPrice) {
        this.rentPrice = rentPrice;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }
}