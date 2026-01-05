package com.javaweb.repository.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

@Entity
@Table(name = "building")
public class BuildingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /* ===== BASIC INFO ===== */
    @Column(name = "name")
    private String name;

    /* ===== ADDRESS ===== */
    @Column(name = "district_id")
    private Integer districtId;

    @Column(name = "ward")
    private String ward;

    @Column(name = "street")
    private String street;

    /* ===== BUILDING INFO ===== */
    @Column(name = "structure")
    private String structure;

    @Column(name = "number_of_basement")
    private Integer numberOfBasement;

    @Column(name = "floor_area")
    private Double floorArea;

    @Column(name = "direction")
    private String direction;

    @Column(name = "level")
    private String level;

    /* ===== PRICE ===== */
    @Column(name = "rent_price")
    private Double rentPrice;

    @Column(name = "rent_price_description")
    private String rentPriceDescription;

    @Column(name = "service_fee")
    private Double serviceFee;

    @Column(name = "car_fee")
    private Double carFee;

    @Column(name = "motor_fee")
    private Double motorFee;

    @Column(name = "overtime_fee")
    private Double overtimeFee;

    @Column(name = "electricity_fee")
    private String electricityFee;

    @Column(name = "water_fee")
    private String waterFee;

    /* ===== CONTRACT ===== */
    @Column(name = "deposit")
    private String deposit;

    @Column(name = "payment")
    private String payment;

    @Column(name = "rent_time")
    private String rentTime;

    @Column(name = "decoration_time")
    private String decorationTime;

    /* ===== MANAGER ===== */
    @Column(name = "manager_name")
    private String managerName;

    @Column(name = "manager_phone")
    private String managerPhone;

    @Column(name = "brokerage_fee")
    private Double brokerageFee;

    @Column(name = "note")
    private String note;

    /* ===== RELATION ===== */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id", insertable = false, updatable = false)
    private DistrictEntity district;

    @OneToMany(mappedBy = "building", fetch = FetchType.LAZY)
    private List<RentAreaEntity> rentAreas = new ArrayList<>();

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

	public DistrictEntity getDistrict() {
		return district;
	}

	public void setDistrict(DistrictEntity district) {
		this.district = district;
	}

	public List<RentAreaEntity> getRentAreas() {
		return rentAreas;
	}

	public void setRentAreas(List<RentAreaEntity> rentAreas) {
		this.rentAreas = rentAreas;
	}

    /* ===== GETTER / SETTER ===== */
    // (generate getter/setter bằng IDE cho gọn)
}
