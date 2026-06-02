package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.entity.BuildingImageEntity;

public interface BuildingImageRepository extends JpaRepository<BuildingImageEntity, Integer> {
    List<BuildingImageEntity> findByBuilding_Id(Integer buildingId);
    void deleteByBuilding_Id(Integer buildingId);
    // Thêm dòng này
    long count();
}