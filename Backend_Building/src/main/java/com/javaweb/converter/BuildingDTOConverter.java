package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.model.BuildingDTO;
import com.javaweb.repository.DistrictRepository;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.DistrictEntity;
import com.javaweb.repository.entity.RentAreaEntity;
@Component
public class BuildingDTOConverter {

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private RentAreaRepository rentAreaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public BuildingDTO toBuidlingDTO(BuildingEntity item) {

        BuildingDTO building = modelMapper.map(item, BuildingDTO.class);

        /* ===== ADDRESS ===== */
        String street = item.getStreet() != null ? item.getStreet() : "";
        String ward = item.getWard() != null ? item.getWard() : "";

        String districtName = "";
        if (item.getDistrict() != null) {
            districtName = item.getDistrict().getName();
        }

        building.setAddress(
            String.join(", ", street, ward, districtName)
        );

        /* ===== RENT AREA ===== */
        List<RentAreaEntity> rentAreas =
                rentAreaRepository.getValueByBuildingId(item.getId());

        if (rentAreas != null && !rentAreas.isEmpty()) {
        	String areaResult = rentAreas.stream()
        	        .map(r -> String.valueOf(r.getValue()))
        	        .collect(Collectors.joining(","));
        }

        return building;
    }
}
