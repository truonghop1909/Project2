package com.javaweb.builder;

import java.util.List;

public class BuildingSearchBuilder {
    
    // ========== THÔNG TIN CƠ BẢN ==========
    private String name;
    private String street;
    private Integer numberOfBasement;
    
    // ========== ĐỊA CHỈ MỚI (SAU 07/2025) ==========
    private String provinceId;
    private String provinceName;
    private String wardCode;
    private String wardName;
    
    // ========== THÔNG TIN TÒA NHÀ ==========
    private String direction;
    private String level;
    
    // ========== DIỆN TÍCH ==========
    private Double floorAreaFrom;
    private Double floorAreaTo;
    
    // ========== DIỆN TÍCH CHO THUÊ ==========
    private Double rentAreaFrom;
    private Double rentAreaTo;
    
    // ========== GIÁ THUÊ ==========
    private Double rentPriceFrom;
    private Double rentPriceTo;
    
    // ========== NHÂN VIÊN QUẢN LÝ ==========
    private Integer staffId;
    
    // ========== LOẠI HÌNH THUÊ ==========
    private List<String> rentTypes;
    
    // ========== HÌNH ẢNH ==========
    private String thumbnail;  // ← THÊM DÒNG NÀY
    
    // ========== PAGINATION & SORT ==========
    private Integer page;
    private Integer size;
    private String sortBy;
    private String sortDirection;
    
    // ========== CONSTRUCTORS ==========
    
    public BuildingSearchBuilder() {
    }
    
    private BuildingSearchBuilder(Builder builder) {
        // Thông tin cơ bản
        this.name = builder.name;
        this.street = builder.street;
        this.numberOfBasement = builder.numberOfBasement;
        
        // Địa chỉ mới
        this.provinceId = builder.provinceId;
        this.provinceName = builder.provinceName;
        this.wardCode = builder.wardCode;
        this.wardName = builder.wardName;
        
        // Thông tin tòa nhà
        this.direction = builder.direction;
        this.level = builder.level;
        
        // Diện tích
        this.floorAreaFrom = builder.floorAreaFrom;
        this.floorAreaTo = builder.floorAreaTo;
        
        // Diện tích cho thuê
        this.rentAreaFrom = builder.rentAreaFrom;
        this.rentAreaTo = builder.rentAreaTo;
        
        // Giá thuê
        this.rentPriceFrom = builder.rentPriceFrom;
        this.rentPriceTo = builder.rentPriceTo;
        
        // Nhân viên quản lý
        this.staffId = builder.staffId;
        
        // Loại hình thuê
        this.rentTypes = builder.rentTypes;
        
        // Hình ảnh
        this.thumbnail = builder.thumbnail;  // ← THÊM DÒNG NÀY
        
        // Pagination & Sort
        this.page = builder.page;
        this.size = builder.size;
        this.sortBy = builder.sortBy;
        this.sortDirection = builder.sortDirection;
    }
    
    // ========== HELPER METHODS ==========
    
    public boolean isUsingNewAddress() {
        return (provinceId != null && !provinceId.isEmpty()) 
            || (wardCode != null && !wardCode.isEmpty())
            || (provinceName != null && !provinceName.isEmpty())
            || (wardName != null && !wardName.isEmpty());
    }
    
    public Integer getOffset() {
        if (page == null || size == null || page < 1 || size < 1) {
            return null;
        }
        return (page - 1) * size;
    }
    
    public boolean hasPagination() {
        return page != null && size != null && size > 0;
    }
    
    // ========== GETTERS & SETTERS ==========
    
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
    
    public Integer getNumberOfBasement() {
        return numberOfBasement;
    }
    
    public void setNumberOfBasement(Integer numberOfBasement) {
        this.numberOfBasement = numberOfBasement;
    }
    
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
    
    // ========== GETTER & SETTER CHO THUMBNAIL ==========
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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
    
    // ========== BUILDER PATTERN ==========
    
    public static Builder builder() {
        return new Builder();
    }
    
    public static class Builder {
        // Thông tin cơ bản
        private String name;
        private String street;
        private Integer numberOfBasement;
        
        // Địa chỉ mới
        private String provinceId;
        private String provinceName;
        private String wardCode;
        private String wardName;
        
        // Thông tin tòa nhà
        private String direction;
        private String level;
        
        // Diện tích
        private Double floorAreaFrom;
        private Double floorAreaTo;
        
        // Diện tích cho thuê
        private Double rentAreaFrom;
        private Double rentAreaTo;
        
        // Giá thuê
        private Double rentPriceFrom;
        private Double rentPriceTo;
        
        // Nhân viên quản lý
        private Integer staffId;
        
        // Loại hình thuê
        private List<String> rentTypes;
        
        // Hình ảnh
        private String thumbnail;  // ← THÊM DÒNG NÀY
        
        // Pagination & Sort
        private Integer page;
        private Integer size;
        private String sortBy;
        private String sortDirection;
        
        public Builder name(String name) {
            this.name = name;
            return this;
        }
        
        public Builder street(String street) {
            this.street = street;
            return this;
        }
        
        public Builder numberOfBasement(Integer numberOfBasement) {
            this.numberOfBasement = numberOfBasement;
            return this;
        }
        
        public Builder provinceId(String provinceId) {
            this.provinceId = provinceId;
            return this;
        }
        
        public Builder provinceName(String provinceName) {
            this.provinceName = provinceName;
            return this;
        }
        
        public Builder wardCode(String wardCode) {
            this.wardCode = wardCode;
            return this;
        }
        
        public Builder wardName(String wardName) {
            this.wardName = wardName;
            return this;
        }
        
        public Builder direction(String direction) {
            this.direction = direction;
            return this;
        }
        
        public Builder level(String level) {
            this.level = level;
            return this;
        }
        
        public Builder floorAreaFrom(Double floorAreaFrom) {
            this.floorAreaFrom = floorAreaFrom;
            return this;
        }
        
        public Builder floorAreaTo(Double floorAreaTo) {
            this.floorAreaTo = floorAreaTo;
            return this;
        }
        
        public Builder rentAreaFrom(Double rentAreaFrom) {
            this.rentAreaFrom = rentAreaFrom;
            return this;
        }
        
        public Builder rentAreaTo(Double rentAreaTo) {
            this.rentAreaTo = rentAreaTo;
            return this;
        }
        
        public Builder rentPriceFrom(Double rentPriceFrom) {
            this.rentPriceFrom = rentPriceFrom;
            return this;
        }
        
        public Builder rentPriceTo(Double rentPriceTo) {
            this.rentPriceTo = rentPriceTo;
            return this;
        }
        
        public Builder staffId(Integer staffId) {
            this.staffId = staffId;
            return this;
        }
        
        public Builder rentTypes(List<String> rentTypes) {
            this.rentTypes = rentTypes;
            return this;
        }
        
        // ========== THÊM BUILDER CHO THUMBNAIL ==========
        public Builder thumbnail(String thumbnail) {
            this.thumbnail = thumbnail;
            return this;
        }
        
        public Builder page(Integer page) {
            this.page = page;
            return this;
        }
        
        public Builder size(Integer size) {
            this.size = size;
            return this;
        }
        
        public Builder sortBy(String sortBy) {
            this.sortBy = sortBy;
            return this;
        }
        
        public Builder sortDirection(String sortDirection) {
            this.sortDirection = sortDirection;
            return this;
        }
        
        public BuildingSearchBuilder build() {
            return new BuildingSearchBuilder(this);
        }
    }
    
    // ========== TO STRING ==========
    
    @Override
    public String toString() {
        return "BuildingSearchBuilder{" +
                "name='" + name + '\'' +
                ", street='" + street + '\'' +
                ", numberOfBasement=" + numberOfBasement +
                ", provinceId='" + provinceId + '\'' +
                ", provinceName='" + provinceName + '\'' +
                ", wardCode='" + wardCode + '\'' +
                ", wardName='" + wardName + '\'' +
                ", direction='" + direction + '\'' +
                ", level='" + level + '\'' +
                ", floorAreaFrom=" + floorAreaFrom +
                ", floorAreaTo=" + floorAreaTo +
                ", rentAreaFrom=" + rentAreaFrom +
                ", rentAreaTo=" + rentAreaTo +
                ", rentPriceFrom=" + rentPriceFrom +
                ", rentPriceTo=" + rentPriceTo +
                ", staffId=" + staffId +
                ", rentTypes=" + rentTypes +
                ", thumbnail='" + thumbnail + '\'' +
                ", page=" + page +
                ", size=" + size +
                ", sortBy='" + sortBy + '\'' +
                ", sortDirection='" + sortDirection + '\'' +
                '}';
    }
}