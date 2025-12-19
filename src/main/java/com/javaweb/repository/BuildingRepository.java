package com.javaweb.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingRequestDTO;
import com.javaweb.repository.entity.BuildingEntity;

public interface BuildingRepository {
	List<BuildingEntity> findAll(BuildingSearchBuilder buildingSearchBuilder);
	void createBuilding(BuildingRequestDTO buildingRequestDTO);
	void updateBuilding(Integer id, BuildingRequestDTO buildingRequestDTO);
	void DeleteById(long id);
	void deleteBuilding(Integer id);
}
