package com.javaweb.repository;

import org.jboss.logging.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaweb.repository.entity.DistrictEntity;

public interface DistrictRepository extends JpaRepository<DistrictEntity, Integer>{
}
