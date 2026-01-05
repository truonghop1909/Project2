package com.javaweb.repository.custom;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.repository.entity.BuildingEntity;

public interface BuildingRepositoryCustom {
    List<BuildingSearchDTO> findAll(BuildingSearchBuilder builder);
}

