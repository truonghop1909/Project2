package com.javaweb.builder;

import java.util.ArrayList;
import java.util.List;

public class BuildingSearchBuilder {
    private String name;
    // Address info
    private Integer districtId;
    private String districtName;
    private String ward;
    private String street;
    private Integer numberOfBasement;
    private Double floorArea;
    private String direction;
    private String level;
    private List<String> typeCode = new ArrayList<>();
    // Fees & prices
    private Double rentPriceFrom;
    private Double rentPriceTo;
    private Integer areaFrom;
    private Integer areaTo;
    private Integer staffId;
    
    private BuildingSearchBuilder(Builder builder) {
        this.name = builder.name;
        this.districtId = builder.districtId;
        this.ward = builder.ward;
        this.street = builder.street;
        this.numberOfBasement = builder.numberOfBasement;
        this.floorArea = builder.floorArea;
        this.direction = builder.direction;
        this.level = builder.level;
        this.typeCode = builder.typeCode;
        this.rentPriceFrom = builder.rentPriceFrom;
        this.rentPriceTo = builder.rentPriceTo;
        this.areaFrom = builder.areaFrom;
        this.areaTo = builder.areaTo;
        this.staffId = builder.staffId;
    }
    
    public static class Builder{
    	private String name;
        // Address info
        private Integer districtId;
        private String ward;
        private String street;
        private Integer numberOfBasement;
        private Double floorArea;
        private String direction;
        private String level;
        private List<String> typeCode = new ArrayList<>();
        // Fees & prices
        private Double rentPrice;
        private Double rentPriceFrom;
        private Double rentPriceTo;
        private Integer areaFrom;
        private Integer areaTo;
        private Integer staffId;
        
        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setDistrictId(Integer districtId) {
            this.districtId = districtId;
            return this;
        }


        public Builder setWard(String ward) {
            this.ward = ward;
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

        public Builder setFloorArea(Double floorArea) {
            this.floorArea = floorArea;
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

        public Builder setTypeCode(List<String> typeCode) {
            this.typeCode = typeCode;
            return this;
        }

        public Builder setRentPrice(Double rentPrice) {
            this.rentPrice = rentPrice;
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

        public Builder setAreaFrom(Integer areaFrom) {
            this.areaFrom = areaFrom;
            return this;
        }

        public Builder setAreaTo(Integer areaTo) {
            this.areaTo = areaTo;
            return this;
        }

        public Builder setStaffId(Integer staffId) {
            this.staffId = staffId;
            return this;
        }

        // 🔥 Phương thức build()
        public BuildingSearchBuilder build() {
            return new BuildingSearchBuilder(this);
        }
    }
	public String getName() {
		return name;
	}
	public Integer getDistrictId() {
		return districtId;
	}
	public String getDistrictName() {
		return districtName;
	}
	public String getWard() {
		return ward;
	}
	public String getStreet() {
		return street;
	}
	public Integer getNumberOfBasement() {
		return numberOfBasement;
	}
	public Double getFloorArea() {
		return floorArea;
	}
	public String getDirection() {
		return direction;
	}
	public String getLevel() {
		return level;
	}
	public List<String> getTypeCode() {
		return typeCode;
	}
	public Double getRentPriceFrom() {
		return rentPriceFrom;
	}
	public Double getRentPriceTo() {
		return rentPriceTo;
	}
	public Integer getAreaFrom() {
		return areaFrom;
	}
	public Integer getAreaTo() {
		return areaTo;
	}
	public Integer getStaffId() {
		return staffId;
	}
}
