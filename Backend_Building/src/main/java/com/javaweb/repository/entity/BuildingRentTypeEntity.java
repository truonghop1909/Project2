package com.javaweb.repository.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "buildingrenttype")
public class BuildingRentTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 🔥 PK mới

    @ManyToOne
    @JoinColumn(name = "building_id")
    private BuildingEntity building;

    @ManyToOne
    @JoinColumn(name = "renttype_id")
    private RentTypeEntity rentType;

    public Integer getId() { 
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BuildingEntity getBuilding() {
        return building;
    }

    public void setBuilding(BuildingEntity building) {
        this.building = building;
    }

    public RentTypeEntity getRentType() {
        return rentType;
    }

    public void setRentType(RentTypeEntity rentType) {
        this.rentType = rentType;
    }
}