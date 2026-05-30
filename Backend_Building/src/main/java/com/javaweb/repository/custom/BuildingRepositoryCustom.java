package com.javaweb.repository.custom;

import java.util.List;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingSearchDTO;

public interface BuildingRepositoryCustom {
    List<BuildingSearchDTO> findAll(BuildingSearchBuilder builder);

    long count(BuildingSearchBuilder builder);
}

