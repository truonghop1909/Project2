package com.javaweb.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "buildingrenttype")
@IdClass(BuildingRentTypeId.class)
public class BuildingRentTypeEntity {

    @Id
    @Column(name = "building_id")
    private Integer buildingId;

    @Id
    @Column(name = "renttype_id")
    private Integer rentTypeId;

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
}
