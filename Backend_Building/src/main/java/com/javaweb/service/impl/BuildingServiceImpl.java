package com.javaweb.service.impl;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.converter.BuildingDTOConverter;
import com.javaweb.converter.BuildingDetailDTOConverter;
import com.javaweb.converter.BuildingEntityConverter;
import com.javaweb.converter.BuildingSearchBuilderConverter;
import com.javaweb.model.BuildingDetailDTO;
import com.javaweb.model.BuildingImageDTO;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.UserDTO;
import com.javaweb.repository.BuildingImageRepository;
import com.javaweb.repository.BuildingRentTypeRepository;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.RentTypeRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.BuildingImageEntity;
import com.javaweb.repository.entity.BuildingRentTypeEntity;
import com.javaweb.repository.entity.RentAreaEntity;
import com.javaweb.repository.entity.RentTypeEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.BuildingService;
import com.javaweb.service.FileStorageService;

import customexceptions.BuildingAssignedException;

@Service
public class BuildingServiceImpl implements BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private BuildingSearchBuilderConverter buildingSearchBuilderConverter;

    @Autowired
    private RentAreaRepository rentAreaRepository;

    @Autowired
    private BuildingRentTypeRepository buildingRentTypeRepository;

    @Autowired
    private RentTypeRepository rentTypeRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private BuildingImageRepository buildingImageRepository;

    @Autowired
    private BuildingDetailDTOConverter buildingDetailDTOConverter;

    @Autowired
    private BuildingEntityConverter buildingEntityConverter;

    // ================= EXISTING METHODS =================
    
    @Override
    @Transactional
    public Integer createBuilding(BuildingDetailDTO dto) {
        // ... existing code ...
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new RuntimeException("Tên tòa nhà không được để trống");
        }

        BuildingEntity entity = buildingEntityConverter.toEntity(dto);
        buildingRepository.save(entity);

        saveRentAreas(entity, dto.getRentAreas());
        saveRentTypes(entity.getId(), dto.getRentTypeCodes());
        return entity.getId();
    }

    @Override
    @Transactional
    public void updateBuilding(Integer id, BuildingDetailDTO dto) {
        // ... existing code ...
        BuildingEntity entity = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));

        buildingEntityConverter.toEntity(dto, entity);
        buildingRepository.save(entity);

        rentAreaRepository.deleteByBuildingId(id);
        saveRentAreas(entity, dto.getRentAreas());

        buildingRentTypeRepository.deleteByBuildingId(id);
        saveRentTypes(id, dto.getRentTypeCodes());
    }

    private void saveRentAreas(BuildingEntity entity, List<Integer> rentAreas) {
        if (rentAreas != null && !rentAreas.isEmpty()) {
            for (Integer value : rentAreas) {
                RentAreaEntity rentArea = new RentAreaEntity();
                rentArea.setValue(value);
                rentArea.setBuilding(entity);
                rentAreaRepository.save(rentArea);
            }
        }
    }

    private void saveRentTypes(Integer buildingId, List<String> rentTypeCodes) {
        if (rentTypeCodes != null && !rentTypeCodes.isEmpty()) {
            BuildingEntity building = buildingRepository.findById(buildingId)
                    .orElseThrow(() -> new RuntimeException("Building not found"));

            for (String code : rentTypeCodes) {
                RentTypeEntity rentType = rentTypeRepository.findByCode(code)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy rent type: " + code));

                BuildingRentTypeEntity brt = new BuildingRentTypeEntity();
                brt.setBuilding(building);
                brt.setRentType(rentType);
                buildingRentTypeRepository.save(brt);
            }
        }
    }

    @Override
    @Transactional
    public void deleteBuilding(Integer id) {
        BuildingEntity building = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building không tồn tại"));

        if (!building.getUsers().isEmpty()) {
            throw new BuildingAssignedException("Không thể xóa tòa nhà vì đang được giao cho nhân viên");
        }

        rentAreaRepository.deleteByBuildingId(id);
        buildingRentTypeRepository.deleteByBuildingId(id);
        buildingRepository.delete(building);
    }

    @Override
    public List<BuildingSearchDTO> search(BuildingSearchBuilder builder) {
        return buildingRepository.findAll(builder);
    }

    @Override
    public List<UserDTO> getAssignedStaff(Integer buildingId) {
        BuildingEntity building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new RuntimeException("Building not found"));

        List<UserEntity> staffs = building.getUsers();
        List<UserDTO> result = new ArrayList<>();

        for (UserEntity user : staffs) {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setFullname(user.getFullname());
            result.add(dto);
        }
        return result;
    }

    @Override
    public void uploadBuildingImage(Integer id, MultipartFile file) {
        BuildingEntity building = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tòa nhà"));

        String fileName = fileStorageService.storeFile(file);
        building.setThumbnail(fileName);
        buildingRepository.save(building);
    }

    @Override
    public List<BuildingSearchDTO> findAll(Map<String, Object> params, List<String> typeCode) {
        BuildingSearchBuilder builder = buildingSearchBuilderConverter.toBuildingSearchBuilder(params, typeCode);
        return buildingRepository.findAll(builder);
    }

    @Override
    public BuildingDetailDTO findById(Integer id) {
        BuildingEntity entity = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));
        return buildingDetailDTOConverter.toBuildingDetailDTO(entity);
    }

    @Override
    @Transactional
    public void uploadSubImage(Integer buildingId, MultipartFile file, String title, String description) {
        BuildingEntity building = buildingRepository.findById(buildingId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tòa nhà"));

        long count = buildingImageRepository.findByBuilding_Id(buildingId).size();

        if (count >= 3) {
            throw new RuntimeException("Chỉ cho phép tối đa 3 ảnh phụ");
        }

        String fileName = fileStorageService.storeFile(file);

        BuildingImageEntity imageEntity = new BuildingImageEntity();
        imageEntity.setImage(fileName);
        imageEntity.setTitle(title);
        imageEntity.setDescription(description);
        imageEntity.setBuilding(building);
        imageEntity.setDisplayOrder((int) count + 1);

        buildingImageRepository.save(imageEntity);
    }

    @Override
    @Transactional
    public void updateSubImage(Integer imageId, BuildingImageDTO dto) {
        BuildingImageEntity imageEntity = buildingImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ảnh phụ"));

        if (dto.getTitle() != null) {
            imageEntity.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            imageEntity.setDescription(dto.getDescription());
        }
        buildingImageRepository.save(imageEntity);
    }

    @Override
    @Transactional
    public void deleteSubImage(Integer imageId) {
        BuildingImageEntity imageEntity = buildingImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ảnh phụ"));
        buildingImageRepository.delete(imageEntity);
    }

    @Override
    public void updateImageOrder(Integer imageId, Integer order) {
        BuildingImageEntity image = buildingImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ảnh"));
        image.setDisplayOrder(order);
        buildingImageRepository.save(image);
    }

    // ================= NEW METHODS FOR PUBLIC API =================
    
    @Override
    public List<BuildingImageDTO> getSubImages(Integer buildingId) {
        List<BuildingImageEntity> images = buildingImageRepository.findByBuilding_Id(buildingId);
        
        return images.stream()
                .map(entity -> {
                    BuildingImageDTO dto = new BuildingImageDTO();
                    dto.setId(entity.getId());
                    dto.setImage(entity.getImage());
                    dto.setTitle(entity.getTitle());
                    dto.setDescription(entity.getDescription());
                    dto.setDisplayOrder(entity.getDisplayOrder());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<BuildingSearchDTO> getPublicBuildings(Map<String, Object> params, List<String> typeCode, Integer page, Integer size) {
        // Thêm phân trang vào params
        params.put("page", page);
        params.put("size", size);
        
        BuildingSearchBuilder builder = buildingSearchBuilderConverter.toBuildingSearchBuilder(params, typeCode);
        
        // Nếu repository hỗ trợ phân trang, bạn có thể sử dụng Pageable
        // return buildingRepository.findAll(builder, PageRequest.of(page - 1, size));
        
        return buildingRepository.findAll(builder);
    }

    @Override
    public BuildingDetailDTO getPublicBuildingById(Integer id) {
        BuildingEntity entity = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));
        
        BuildingDetailDTO dto = buildingDetailDTOConverter.toBuildingDetailDTO(entity);
        
        // Load thêm images nếu cần
        List<BuildingImageDTO> images = getSubImages(id);
        dto.setImages(images);
        
        return dto;
    }
}