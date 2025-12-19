package com.javaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.converter.BuildingDTOConverter;
import com.javaweb.converter.BuildingSearchBuilderConverter;
import com.javaweb.model.BuildingDTO;
import com.javaweb.model.BuildingRequestDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.DistrictRepository;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.DistrictEntity;
import com.javaweb.repository.entity.RentAreaEntiry;
import com.javaweb.service.BuildingService;

@Service
public class BuildingServiceImpl implements BuildingService{
	@Autowired
	private BuildingRepository buildingRepository;
	
	@Autowired
	private BuildingDTOConverter buildingDTOConverter;
	
	@Autowired
	private BuildingSearchBuilderConverter buildingSearchBuilderConverter;
		
	@Override
	public List<BuildingDTO> findAll(Map<String, Object> params, List<String> typeCode) {
		// TODO Auto-generated method stub
		BuildingSearchBuilder buildingSearchBuilder = buildingSearchBuilderConverter.toBuildingSearchBuilder(params, typeCode);
		List<BuildingEntity> buildingEntities = buildingRepository.findAll(buildingSearchBuilder);
		List<BuildingDTO> result = new ArrayList<>();
		for (BuildingEntity item: buildingEntities) {
			BuildingDTO building = buildingDTOConverter.toBuidlingDTO(item);
			result.add(building);
		}
		return result;
	}

	@Override
	@Transactional
	public void updateBuilding(Integer id, BuildingRequestDTO buildingRequestDTO) {
		// TODO Auto-generated method stub
		buildingRepository.updateBuilding(id, buildingRequestDTO);
	}

	@Override
	@Transactional
	public void createBuilding(BuildingRequestDTO buildingRequestDTO) {
		// TODO Auto-generated method stub
		buildingRepository.createBuilding(buildingRequestDTO);
	}

	@Override
	@Transactional
	public void deleteBuilding(Integer id) {
	    buildingRepository.deleteBuilding(id);
	}

}
