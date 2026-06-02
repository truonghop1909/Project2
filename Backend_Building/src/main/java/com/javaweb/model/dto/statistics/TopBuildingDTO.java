package com.javaweb.model.dto.statistics;

public class TopBuildingDTO {
    private Integer buildingId;
    private String name;
    private Double rentPrice;
    private String provinceName;
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

    // getters & setters
    
}