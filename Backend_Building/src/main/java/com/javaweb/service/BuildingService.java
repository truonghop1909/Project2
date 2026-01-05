package com.javaweb.service;

import java.util.List;
import java.util.Map;

import com.javaweb.model.BuildingDTO;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.BuildingUpdateDTO;
import com.javaweb.repository.entity.BuildingEntity;

public interface BuildingService {
	List<BuildingSearchDTO> findAll(Map<String, Object> params, List<String> typeCode);
	void updateBuilding(Integer id, BuildingUpdateDTO buildingUpdateDTO);
	void createBuilding(BuildingUpdateDTO buildingUpdateDTO);
	void deleteBuilding(Integer id);
	BuildingUpdateDTO findById(Integer id);   // ✅ THÊM DÒNG NÀY
}
