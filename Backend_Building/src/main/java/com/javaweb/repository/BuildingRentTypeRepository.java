package com.javaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.entity.BuildingRentTypeEntity;
import com.javaweb.repository.entity.BuildingRentTypeId;

public interface BuildingRentTypeRepository
extends JpaRepository<BuildingRentTypeEntity, BuildingRentTypeId> {

void deleteByBuildingId(Integer buildingId);
}

