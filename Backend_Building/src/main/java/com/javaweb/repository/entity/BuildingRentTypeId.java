package com.javaweb.repository.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class BuildingRentTypeId implements Serializable {

    @Column(name = "building_id")
    private Integer buildingId;

    @Column(name = "renttype_id")
    private Integer rentTypeId;

    // BẮT BUỘC
    public BuildingRentTypeId() {
    }

    public BuildingRentTypeId(Integer buildingId, Integer rentTypeId) {
        this.buildingId = buildingId;
        this.rentTypeId = rentTypeId;
    }

    // getter / setter (NÊN CÓ)
    public Integer getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Integer buildingId) {
        this.buildingId = buildingId;
    }

    public Integer getRentTypeId() {
        return rentTypeId;
    }

    public void setRentTypeId(Integer rentTypeId) {
        this.rentTypeId = rentTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BuildingRentTypeId)) return false;
        BuildingRentTypeId that = (BuildingRentTypeId) o;
        return Objects.equals(buildingId, that.buildingId)
            && Objects.equals(rentTypeId, that.rentTypeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(buildingId, rentTypeId);
    }
}
