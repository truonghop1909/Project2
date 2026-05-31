package com.javaweb.repository.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "building")
public class BuildingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /* ===== BASIC INFO ===== */
    @Column(name = "name")
    private String name;

    // === ĐỊA CHỈ ===
    @Column(name = "street")
    private String street;

    // === ĐỊA CHỈ MỚI (SAU 07/2025) ===
    @Column(name = "province_id", length = 10)
    private String provinceId;

    @Column(name = "province_name", length = 100)
    private String provinceName;

    @Column(name = "ward_code", length = 10)
    private String wardCode;

    @Column(name = "ward_name", length = 100)
    private String wardName;

    @Column(name = "full_address", length = 500)
    private String fullAddress; // Địa chỉ đầy đủ, có thể computed từ các field khác

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

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "google_map_link", length = 500)
    private String googleMapLink;

    // ✅ THÊM DÒNG NÀY - Thumbnail (Ảnh đại diện)
    @Column(name = "thumbnail", length = 255)
    private String thumbnail;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BuildingImageEntity> images = new ArrayList<>();

    @OneToMany(mappedBy = "building", fetch = FetchType.LAZY)
    private List<RentAreaEntity> rentAreas = new ArrayList<>();

    /* ===== MANY TO MANY WITH USER (ASSIGN STAFF) ===== */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "assignmentbuilding", joinColumns = @JoinColumn(name = "building_id"), inverseJoinColumns = @JoinColumn(name = "staff_id"))
    private List<UserEntity> users = new ArrayList<>();

    /* ===== GETTER / SETTER ===== */

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<UserEntity> getUsers() {
        return users;
    }

    public void setUsers(List<UserEntity> users) {
        this.users = users;
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

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    // ✅ GETTER & SETTER CHO THUMBNAIL
    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    // Helper method để tạo địa chỉ đầy đủ
    @PrePersist
    @PreUpdate
    public void updateFullAddress() {
        if (this.street != null || this.wardName != null || this.provinceName != null) {
            StringBuilder address = new StringBuilder();
            if (this.street != null && !this.street.isEmpty()) {
                address.append(this.street);
            }
            if (this.wardName != null && !this.wardName.isEmpty()) {
                if (address.length() > 0)
                    address.append(", ");
                address.append(this.wardName);
            }
            if (this.provinceName != null && !this.provinceName.isEmpty()) {
                if (address.length() > 0)
                    address.append(", ");
                address.append(this.provinceName);
            }
            this.fullAddress = address.toString();
        }
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

    public String getGoogleMapLink() {
        return googleMapLink;
    }

    public void setGoogleMapLink(String googleMapLink) {
        this.googleMapLink = googleMapLink;
    }

    public List<BuildingImageEntity> getImages() {
        return images;
    }

    public void setImages(List<BuildingImageEntity> images) {
        this.images = images;
    }

    public List<RentAreaEntity> getRentAreas() {
        return rentAreas;
    }

    public void setRentAreas(List<RentAreaEntity> rentAreas) {
        this.rentAreas = rentAreas;
    }
}