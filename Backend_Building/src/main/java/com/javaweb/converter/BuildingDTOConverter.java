package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.model.BuildingDTO;
import com.javaweb.repository.BuildingRentTypeRepository;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.RentAreaEntity;

@Component
public class BuildingDTOConverter {

    @Autowired
    private RentAreaRepository rentAreaRepository;
    
    @Autowired
    private BuildingRentTypeRepository buildingRentTypeRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    public BuildingDTO toBuildingDTO(BuildingEntity item) {  // Sửa lại tên method (toBuidlingDTO -> toBuildingDTO)

        BuildingDTO building = modelMapper.map(item, BuildingDTO.class);

        /* ===== ADDRESS ===== */
        // Sử dụng địa chỉ mới: street, wardName, provinceName
        String street = item.getStreet() != null ? item.getStreet() : "";
        String wardName = item.getWardName() != null ? item.getWardName() : "";
        String provinceName = item.getProvinceName() != null ? item.getProvinceName() : "";
        
        // Tạo địa chỉ đầy đủ
        String fullAddress = java.util.stream.Stream.of(street, wardName, provinceName)
                .filter(s -> s != null && !s.trim().isEmpty())
                .collect(Collectors.joining(", "));
        
        building.setAddress(fullAddress);
        
        // Nếu có fullAddress trong entity thì ưu tiên dùng
        if (item.getFullAddress() != null && !item.getFullAddress().isEmpty()) {
            building.setAddress(item.getFullAddress());
        }
        
        // Set các field địa chỉ riêng lẻ (nếu cần)
        building.setStreet(street);
        building.setWardName(wardName);
        building.setProvinceName(provinceName);

        /* ===== RENT AREA ===== */
        List<RentAreaEntity> rentAreas = rentAreaRepository.getValueByBuildingId(item.getId());

        if (rentAreas != null && !rentAreas.isEmpty()) {
            String areaResult = rentAreas.stream()
                    .map(r -> String.valueOf(r.getValue()))
                    .collect(Collectors.joining(","));
            building.setRentArea(areaResult);
        }
        
        return building;
    }
}