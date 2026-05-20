package com.javaweb.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.custom.BuildingRepositoryCustom;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.BuildingImageEntity;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Integer>, BuildingRepositoryCustom{
}
