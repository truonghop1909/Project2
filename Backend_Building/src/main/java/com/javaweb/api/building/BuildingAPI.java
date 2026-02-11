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
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.BuildingUpdateDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.service.BuildingService;

import customexceptions.FieldRequiredException;

@RestController
@RequestMapping("/api/building")
public class BuildingAPI {

    @Autowired
    private BuildingService buildingService;

    // ===== SEARCH LIST =====
    @GetMapping
    public List<BuildingSearchDTO> getBuilding(
            @RequestParam Map<String, Object> params,
            @RequestParam(name = "typeCode", required = false) List<String> typeCode) {

        return buildingService.findAll(params, typeCode);
    }

    // ===== DETAIL =====
    @GetMapping("/{id}")
    public BuildingUpdateDTO getBuildingById(@PathVariable Integer id) {
        return buildingService.findById(id);
    }

    // ===== CREATE =====
    @PostMapping
    public void createBuilding(@RequestBody BuildingUpdateDTO dto) {
        buildingService.createBuilding(dto);
    }

    // ===== UPDATE =====
    @PutMapping("/{id}")
    public void updateBuilding(
            @PathVariable Integer id,
            @RequestBody BuildingUpdateDTO dto) {

        buildingService.updateBuilding(id, dto);
    }

    // ===== DELETE =====
    @DeleteMapping("/{id}")
    public void deleteBuilding(@PathVariable Integer id) {
        buildingService.deleteBuilding(id);
    }
}
