package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaweb.repository.entity.BuildingRentTypeEntity;

public interface BuildingRentTypeRepository
        extends JpaRepository<BuildingRentTypeEntity, Integer> {
    @Query(value = "SELECT rt.code " +
            "FROM buildingrenttype brt " +
            "JOIN renttype rt ON brt.renttype_id = rt.id " +
            "WHERE brt.building_id = :buildingId", nativeQuery = true)
    List<String> findRentTypeCodesByBuildingId(@Param("buildingId") Integer buildingId);

    @Modifying
    @Query(value = "DELETE FROM buildingrenttype WHERE building_id = :buildingId", nativeQuery = true)
    void deleteByBuildingId(@Param("buildingId") Integer buildingId);
}
