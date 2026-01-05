package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.entity.RentAreaEntity;

public interface RentAreaRepository extends JpaRepository<RentAreaEntity, Integer> {

    void deleteByBuildingId(Integer buildingId);

    List<RentAreaEntity> getValueByBuildingId(Integer buildingId);
}

