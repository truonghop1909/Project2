package com.javaweb.repository.entity;

public class BuildingEntity {
	private Integer id;
    private String name;
    private String street;
    private String ward;
    private String district;

    private Integer numberOfBasement;
    private Double floorArea;

    private Double rentPrice;
    private Double serviceFee;
    private Double brokerageFee;

    private Boolean hasInterior;
    private Boolean hasGroundFloor;
    private Boolean isWholeBuilding;

    private String managerName;
    private String managerPhone;

    private Integer regionId;
    private Integer typeId;
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
	public String getWard() {
		return ward;
	}
	public void setWard(String ward) {
		this.ward = ward;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
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
	public Boolean getHasInterior() {
		return hasInterior;
	}
	public void setHasInterior(Boolean hasInterior) {
		this.hasInterior = hasInterior;
	}
	public Boolean getHasGroundFloor() {
		return hasGroundFloor;
	}
	public void setHasGroundFloor(Boolean hasGroundFloor) {
		this.hasGroundFloor = hasGroundFloor;
	}
	public Boolean getIsWholeBuilding() {
		return isWholeBuilding;
	}
	public void setIsWholeBuilding(Boolean isWholeBuilding) {
		this.isWholeBuilding = isWholeBuilding;
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
	public Integer getRegionId() {
		return regionId;
	}
	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
    
    
}
