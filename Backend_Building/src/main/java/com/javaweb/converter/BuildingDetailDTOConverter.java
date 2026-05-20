package com.javaweb.converter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.model.BuildingDetailDTO;
import com.javaweb.model.BuildingImageDTO;
import com.javaweb.repository.BuildingRentTypeRepository;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.BuildingImageEntity;
import com.javaweb.repository.entity.RentAreaEntity;

import javax.annotation.PostConstruct;

@Component
public class BuildingDetailDTOConverter {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RentAreaRepository rentAreaRepository;

    @Autowired
    private BuildingRentTypeRepository buildingRentTypeRepository;

    @PostConstruct
    public void init() {
        // Cấu hình bỏ qua field rentAreas và rentTypeCodes khi map tự động
        modelMapper.typeMap(BuildingEntity.class, BuildingDetailDTO.class)
            .addMappings(mapper -> {
                mapper.skip(BuildingDetailDTO::setRentAreas);
                mapper.skip(BuildingDetailDTO::setRentTypeCodes);
                mapper.skip(BuildingDetailDTO::setImages);
            });
    }

    public BuildingDetailDTO toBuildingDetailDTO(BuildingEntity item) {
        BuildingDetailDTO dto = modelMapper.map(item, BuildingDetailDTO.class);

        /* ===== ADDRESS ===== */
        String street = item.getStreet() != null ? item.getStreet() : "";
        String wardName = item.getWardName() != null ? item.getWardName() : "";
        String provinceName = item.getProvinceName() != null ? item.getProvinceName() : "";

        String fullAddress = java.util.stream.Stream.of(street, wardName, provinceName)
                .filter(s -> s != null && !s.trim().isEmpty())
                .collect(Collectors.joining(", "));
        
        dto.setAddress(fullAddress);
        
        if (item.getFullAddress() != null && !item.getFullAddress().isEmpty()) {
            dto.setAddress(item.getFullAddress());
        }

        /* ===== THUMBNAIL ===== */
        if (item.getThumbnail() != null && !item.getThumbnail().isEmpty()) {
            dto.setThumbnail("/uploads/" + item.getThumbnail());
        }

        /* ===== RENT AREAS ===== */
        List<RentAreaEntity> rentAreas = rentAreaRepository.getValueByBuildingId(item.getId());
        if (rentAreas != null && !rentAreas.isEmpty()) {
            List<Integer> rentAreaValues = rentAreas.stream()
                    .map(RentAreaEntity::getValue)
                    .collect(Collectors.toList());
            dto.setRentAreas(rentAreaValues);
        } else {
            dto.setRentAreas(Collections.emptyList());
        }

        /* ===== RENT TYPE CODES ===== */
        List<String> rentTypeCodes = buildingRentTypeRepository.findRentTypeCodesByBuildingId(item.getId());
        dto.setRentTypeCodes(rentTypeCodes != null ? rentTypeCodes : Collections.emptyList());

        /* ===== SUB IMAGES ===== */
        if (item.getImages() != null && !item.getImages().isEmpty()) {
            List<BuildingImageDTO> imageDTOs = item.getImages().stream()
                    .sorted(Comparator.comparing(
                            BuildingImageEntity::getDisplayOrder,
                            Comparator.nullsLast(Integer::compareTo)))
                    .map(imageItem -> {
                        BuildingImageDTO imageDTO = new BuildingImageDTO();
                        imageDTO.setId(imageItem.getId());
                        imageDTO.setImage("/uploads/" + imageItem.getImage());
                        imageDTO.setTitle(imageItem.getTitle());
                        imageDTO.setDescription(imageItem.getDescription());
                        return imageDTO;
                    })
                    .collect(Collectors.toList());

            dto.setImages(imageDTOs);
        } else {
            dto.setImages(Collections.emptyList());
        }

        return dto;
    }
}