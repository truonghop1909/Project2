package com.javaweb.api;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind. annotation.RestController;

import com.javaweb.model.BuildingDTO;
import com.javaweb.model.BuildingRequestDTO;
import com.javaweb.service.BuildingService;

import customexceptions.FieldRequiredException;

@RestController
@PropertySource("classpath:application.properties")
public class BuildingAPI {
	@Autowired
	private BuildingService buildingService;
	@Value("${dev.truong}")
	private String data;
	@GetMapping(value="/api/building/")
	public List<BuildingDTO> getBuilding(@RequestParam Map<String, Object> params,
										@RequestParam (name="typeCode", required = false) List<String> typeCode
			){
		List<BuildingDTO> result = buildingService.findAll(params, typeCode);
	return result;
}
	
	@PostMapping("/api/building")
	public void createBuilding(
        @RequestBody BuildingRequestDTO buildingRequestDTO) {
    buildingService.createBuilding(buildingRequestDTO);
}

	@PutMapping("/api/building/{id}")
	public void updateBuilding(
        @PathVariable Integer id,
        @RequestBody BuildingRequestDTO buildingRequestDTO) {
    buildingService.updateBuilding(id, buildingRequestDTO);
}
//	public void valiDate (BuildingDTO buildingDTO) {
//		if (buildingDTO.getName() == null || buildingDTO.getName().equals("") || buildingDTO.getNumberOfBasement() == null) {
//			throw new FieldRequiredException("name or numberofbasement is null");
//		}
//	}
	
	@DeleteMapping(value="/api/building/{id}")
	public void deleteBuilding(@PathVariable Integer id) {
		buildingService.deleteBuilding(id);
	}
}