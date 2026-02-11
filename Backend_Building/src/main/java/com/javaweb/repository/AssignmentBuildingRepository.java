package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaweb.repository.entity.AssignmentBuildingEntity;
import com.javaweb.repository.entity.AssignmentBuildingId;

public interface AssignmentBuildingRepository
        extends JpaRepository<AssignmentBuildingEntity, AssignmentBuildingId> {

    void deleteByBuildingId(Integer buildingId);

    List<AssignmentBuildingEntity> findByBuildingId(Integer buildingId);

    @Query("select ab.staffId from AssignmentBuildingEntity ab " +
           "where ab.buildingId = :buildingId")
    List<Integer> findStaffIdsByBuildingId(
            @Param("buildingId") Integer buildingId);
}

