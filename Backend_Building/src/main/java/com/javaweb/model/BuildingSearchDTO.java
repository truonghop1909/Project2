package com.javaweb.model;

import java.util.List;

public class BuildingSearchDTO {
    
    // ===== ID =====
    private Integer id;  // THÊM FIELD NÀY
    
    // ===== THÔNG TIN CƠ BẢN =====
    private String name;               // Tên tòa nhà (like)
    private String address;            // Địa chỉ hiển thị (THÊM FIELD NÀY)
    
    private String street;             // Đường/Số nhà
    
    // ===== ĐỊA CHỈ MỚI (SAU 07/2025) =====
    private String provinceId;         // Mã tỉnh (VD: "01")
    private String provinceName;       // Tên tỉnh (VD: "Thành phố Hà Nội")
    private String wardCode;           // Mã xã/phường mới (VD: "00070")
    private String wardName;           // Tên xã/phường mới (VD: "Phường Hoàn Kiếm")
    
    // ===== THÔNG TIN TÒA NHÀ =====
    private Integer numberOfBasement;  // Số tầng hầm
    private Double floorArea;          // Diện tích sàn (THÊM FIELD NÀY)
    private String direction;          // Hướng
    private String level;              // Hạng
    
    // ===== GIÁ THUÊ & PHÍ =====
    private Double rentPrice;          // Giá thuê (THÊM FIELD NÀY)
    private Double serviceFee;         // Phí dịch vụ (THÊM FIELD NÀY)
    private Double brokerageFee;       // Hoa hồng (THÊM FIELD NÀY)
    
    // ===== QUẢN LÝ =====
    private String managerName;        // Tên quản lý (THÊM FIELD NÀY)
    private String managerPhone;       // SĐT quản lý (THÊM FIELD NÀY)
    
    // ===== DIỆN TÍCH (DÙNG CHO TÌM KIẾM) =====
    private Double floorAreaFrom;      // Diện tích sàn từ
    private Double floorAreaTo;        // Diện tích sàn đến
    
    private Double rentAreaFrom;       // Diện tích cho thuê từ
    private Double rentAreaTo;         // Diện tích cho thuê đến
    
    // ===== GIÁ THUÊ (DÙNG CHO TÌM KIẾM) =====
    private Double rentPriceFrom;      // Giá thuê từ
    private Double rentPriceTo;        // Giá thuê đến
    
    // ===== QUẢN LÝ =====
    private Integer staffId;           // ID nhân viên phụ trách
    
    // ===== LOẠI TÒA NHÀ =====
    private List<String> rentTypes;    // Các loại hình cho thuê (office, retail, etc.)
    
    // ===== PAGINATION & SORT =====
    private Integer page;              // Trang hiện tại (mặc định: 0)
    private Integer size;              // Số lượng bản ghi trên 1 trang (mặc định: 10)
    private String sortBy;             // Trường cần sort (VD: "name", "rentPrice")
    private String sortDirection;      // Hướng sort: "ASC" hoặc "DESC" (mặc định: "ASC")
    
    // ===== CONSTRUCTORS =====
    public BuildingSearchDTO() {}
    
    // ===== HELPER METHODS =====
    
    /**
     * Kiểm tra xem có dùng địa chỉ mới để tìm kiếm không
     */
    public boolean isUsingNewAddress() {
        return (provinceId != null && !provinceId.isEmpty()) 
            || (wardCode != null && !wardCode.isEmpty());
    }
    
    /**
     * Lấy giá trị offset cho pagination
     */
    public Integer getOffset() {
        if (page == null || size == null) {
            return null;
        }
        return (page - 1) * size;
    }
    
    /**
     * Kiểm tra có pagination không
     */
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
    
    // Địa chỉ mới
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
                '}';
    }
}