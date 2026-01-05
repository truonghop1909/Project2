package com.javaweb.builder;

import java.util.ArrayList;
import java.util.List;

public class BuildingSearchBuilder {

    private String name;
    // Address info
    private String district;
    private String ward;
    private String street;
    private Integer numberOfBasement;
    private Double floorAreaFrom;
    private Double floorAreaTo;
    private String direction;
    private String level;
    private List<String> rentTypes;
    // Fees & prices
    private Double rentPriceFrom;
    private Double rentPriceTo;
    private Integer rentAreaFrom;
    private Integer rentAreaTo;
    private Integer staffId;
    private Integer page;
    private Integer size;
    private String sortBy;
    private String sortDirection;
    /* ================== CONSTRUCTOR ================== */
    private BuildingSearchBuilder(Builder builder) {
        this.name = builder.name;
        this.district = builder.district;
        this.ward = builder.ward;
        this.street = builder.street;
        this.numberOfBasement = builder.numberOfBasement;
        this.floorAreaFrom = builder.floorAreaFrom;
        this.floorAreaTo = builder.floorAreaTo;
        this.direction = builder.direction;
        this.level = builder.level;
        this.rentTypes = builder.rentTypes;
        this.rentPriceFrom = builder.rentPriceFrom;
        this.rentPriceTo = builder.rentPriceTo;
        this.rentAreaFrom = builder.rentAreaFrom;
        this.rentAreaTo = builder.rentAreaTo;
        this.staffId = builder.staffId;
        this.page = builder.page;
        this.size = builder.size;
        this.sortBy = builder.sortBy;
        this.sortDirection = builder.sortDirection;
    }

    /* ================== GETTERS ================== */
    public String getName() {
        return name;
    }

    public String getWard() {
        return ward;
    }
    
    public String getDistrict() {
        return district;
    }
    
    public String getStreet() {
        return street;
    }

    public Integer getNumberOfBasement() {
        return numberOfBasement;
    }

    public Double getFloorAreaFrom() {
        return floorAreaFrom;
    }

    public Double getFloorAreaTo() {
        return floorAreaTo;
    }

    public String getDirection() {
        return direction;
    }

    public String getLevel() {
        return level;
    }

    public List<String> getRentTypes() {
        return rentTypes;
    }

    public Double getRentPriceFrom() {
        return rentPriceFrom;
    }

    public Double getRentPriceTo() {
        return rentPriceTo;
    }

    public Integer getRentAreaFrom() {
        return rentAreaFrom;
    }

    public Integer getRentAreaTo() {
        return rentAreaTo;
    }

    public Integer getStaffId() {
        return staffId;
    }

    /* ================== BUILDER ================== */
    public static class Builder {

        private String name;
        // Address info
        private String district;
        private String ward;
        private String street;
        private Integer numberOfBasement;
        private Double floorAreaFrom;
        private Double floorAreaTo;
        private String direction;
        private String level;
        private List<String> rentTypes = new ArrayList<>();
        // Fees & prices
        private Double rentPriceFrom;
        private Double rentPriceTo;
        private Integer rentAreaFrom;
        private Integer rentAreaTo;
        private Integer staffId;
        private Integer page;
        private Integer size;
        private String sortBy;
        private String sortDirection;

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setWard(String ward) {
            this.ward = ward;
            return this;
        }
        
        public Builder setDistrict(String district) {
            this.district = district;
            return this;
        }
        
        public Builder setStreet(String street) {
            this.street = street;
            return this;
        }

        public Builder setNumberOfBasement(Integer numberOfBasement) {
            this.numberOfBasement = numberOfBasement;
            return this;
        }

        public Builder setFloorAreaFrom(Double floorAreaFrom) {
            this.floorAreaFrom = floorAreaFrom;
            return this;
        }

        public Builder setFloorAreaTo(Double floorAreaTo) {
            this.floorAreaTo = floorAreaTo;
            return this;
        }

        public Builder setDirection(String direction) {
            this.direction = direction;
            return this;
        }

        public Builder setLevel(String level) {
            this.level = level;
            return this;
        }

        public Builder setRentTypes(List<String> rentTypes) {
            this.rentTypes = rentTypes;
            return this;
        }

        public Builder setRentPriceFrom(Double rentPriceFrom) {
            this.rentPriceFrom = rentPriceFrom;
            return this;
        }

        public Builder setRentPriceTo(Double rentPriceTo) {
            this.rentPriceTo = rentPriceTo;
            return this;
        }

        public Builder setRentAreaFrom(Integer rentAreaFrom) {
            this.rentAreaFrom = rentAreaFrom;
            return this;
        }

        public Builder setRentAreaTo(Integer rentAreaTo) {
            this.rentAreaTo = rentAreaTo;
            return this;
        }

        public Builder setStaffId(Integer staffId) {
            this.staffId = staffId;
            return this;
        }
        
        public Builder setPage(Integer page) {
            this.page = page;
            return this;
        }

        public Builder setSize(Integer size) {
            this.size = size;
            return this;
        }

        public Builder setSortBy(String sortBy) {
            this.sortBy = sortBy;
            return this;
        }

        public Builder setSortDirection(String sortDirection) {
            this.sortDirection = sortDirection;
            return this;
        }
        
        public BuildingSearchBuilder build() {
            return new BuildingSearchBuilder(this);
        }
    }
    public Integer getPage() {
        return page;
    }

    public Integer getSize() {
        return size;
    }

    public String getSortBy() {
        return sortBy;
    }

    public String getSortDirection() {
        return sortDirection;
    }

}
