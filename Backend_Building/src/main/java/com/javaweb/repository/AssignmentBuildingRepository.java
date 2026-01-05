package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.entity.AssignmentBuildingEntity;
import com.javaweb.repository.entity.AssignmentBuildingId;

public interface AssignmentBuildingRepository
        extends JpaRepository<AssignmentBuildingEntity, AssignmentBuildingId> {

    void deleteByBuildingId(Integer buildingId);

    List<AssignmentBuildingEntity> findByBuildingId(Integer buildingId);
}
