package com.javaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.model.DistrictDTO;
import com.javaweb.repository.DistrictRepository;
import com.javaweb.repository.entity.DistrictEntity;
import com.javaweb.service.DistrictService;

@Service
public class DistrictServiceImpl implements DistrictService {

    @Autowired
    private DistrictRepository districtRepository;

    @Override
    public List<DistrictDTO> findAll() {
        List<DistrictEntity> entities = districtRepository.findAll();

        return entities.stream()
                .map(d -> new DistrictDTO(d.getId(), d.getName()))
                .collect(Collectors.toList());
    }
}
