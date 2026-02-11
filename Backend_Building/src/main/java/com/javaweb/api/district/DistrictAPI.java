package com.javaweb.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.DistrictDTO;
import com.javaweb.service.DistrictService;

@RestController
@RequestMapping("/api/districts")
public class DistrictAPI {

    @Autowired
    private DistrictService districtService;

    @GetMapping
    public List<DistrictDTO> getAllDistricts() {
        return districtService.findAll();
    }
}
