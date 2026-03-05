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
import com.javaweb.converter.BuildingUpdateDTOConverter;
import com.javaweb.model.BuildingDTO;
import com.javaweb.model.BuildingRequestDTO;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.BuildingUpdateDTO;
import com.javaweb.model.UserDTO;
import com.javaweb.repository.AssignmentBuildingRepository;
import com.javaweb.repository.BuildingRentTypeRepository;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.DistrictRepository;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.RentTypeRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.BuildingRentTypeEntity;
import com.javaweb.repository.entity.DistrictEntity;
import com.javaweb.repository.entity.RentAreaEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.BuildingService;

import customexceptions.BuildingAssignedException;

@Service
public class BuildingServiceImpl implements BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;

    @Autowired
    private BuildingDTOConverter buildingDTOConverter;

    @Autowired
    private BuildingSearchBuilderConverter buildingSearchBuilderConverter;
    @Autowired
    private AssignmentBuildingRepository assignmentBuildingRepository;

    @Autowired
    private RentAreaRepository rentAreaRepository;
    @Autowired
    private BuildingRentTypeRepository buildingRentTypeRepository;

    @Autowired
    private RentTypeRepository rentTypeRepository;

    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private BuildingUpdateDTOConverter buildingUpdateDTOConverter;

    // ================= SEARCH (JDBC) =================
    @Override
    public List<BuildingSearchDTO> findAll(Map<String, Object> params, List<String> typeCode) {

        BuildingSearchBuilder builder = buildingSearchBuilderConverter.toBuildingSearchBuilder(params, typeCode);

        return buildingRepository.findAll(builder);
    }

    // ================= FIND BY ID (JPA) =================
    @Override
    public BuildingUpdateDTO findById(Integer id) {

        BuildingEntity entity = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));

        return buildingUpdateDTOConverter.toUpdateDTO(entity);
    }

    // ================= CREATE (JPA) =================
    @Override
    @Transactional
    public void createBuilding(BuildingUpdateDTO dto) {

        // 1️⃣ Convert DTO → Entity
        BuildingEntity entity = buildingUpdateDTOConverter.toEntity(dto);
        // 2️⃣ Set district relation (nếu dùng @ManyToOne)
        if (dto.getDistrictId() != null) {
            DistrictEntity district = districtRepository
                    .findById(dto.getDistrictId())
                    .orElseThrow(() -> new RuntimeException("District not found"));
            entity.setDistrict(district);
        }

        // 3️⃣ Save building (lấy ID)
        buildingRepository.save(entity);

        // 4️⃣ Save rent areas
        if (dto.getRentAreas() != null && !dto.getRentAreas().isEmpty()) {
            for (Integer value : dto.getRentAreas()) {
                RentAreaEntity rentArea = new RentAreaEntity();
                rentArea.setValue(value);
                rentArea.setBuilding(entity);
                rentAreaRepository.save(rentArea);
            }
        }

        // 5️⃣ Save rent types
        if (dto.getRentTypeCodes() != null && !dto.getRentTypeCodes().isEmpty()) {
            for (String code : dto.getRentTypeCodes()) {
                Integer rentTypeId = rentTypeRepository.findIdByCode(code);

                BuildingRentTypeEntity brt = new BuildingRentTypeEntity();
                brt.setBuildingId(entity.getId());
                brt.setRentTypeId(rentTypeId);

                buildingRentTypeRepository.save(brt);
            }
        }
    }

    // ================= UPDATE (JPA) =================
    @Override
    @Transactional
    public void updateBuilding(Integer id, BuildingUpdateDTO dto) {

        BuildingEntity oldEntity = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building not found"));

        // 1️⃣ Convert DTO → Entity mới
        BuildingEntity newEntity = buildingUpdateDTOConverter.toEntity(dto);

        // 2️⃣ Giữ nguyên ID
        newEntity.setId(oldEntity.getId());

        // 3️⃣ Giữ relation (nếu cần)
        if (dto.getDistrictId() != null) {
            DistrictEntity district = districtRepository
                    .findById(dto.getDistrictId())
                    .orElseThrow(() -> new RuntimeException("District not found"));
            newEntity.setDistrict(district);
        }

        // 4️⃣ SAVE = UPDATE
        buildingRepository.save(newEntity);
    }

    // ================= DELETE (JPA) =================
    @Override
    @Transactional
    public void deleteBuilding(Integer id) {

        BuildingEntity building = buildingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Building không tồn tại"));

        if (!building.getUsers().isEmpty()) {
            throw new BuildingAssignedException(
                    "Không thể xóa tòa nhà vì đang được giao cho nhân viên");
        }

        rentAreaRepository.deleteByBuildingId(id);
        buildingRentTypeRepository.deleteByBuildingId(id);

        buildingRepository.delete(building);
    }

    // ================= MAPPER =================
    private void mapDtoToEntity(BuildingUpdateDTO dto, BuildingEntity entity) {

        if (dto.getName() != null) {
            entity.setName(dto.getName());
        }

        if (dto.getStreet() != null) {
            entity.setStreet(dto.getStreet());
        }

        if (dto.getWard() != null) {
            entity.setWard(dto.getWard());
        }

        if (dto.getNumberOfBasement() != null) {
            entity.setNumberOfBasement(dto.getNumberOfBasement());
        }

        if (dto.getFloorArea() != null) {
            entity.setFloorArea(dto.getFloorArea());
        }

        if (dto.getRentPrice() != null) {
            entity.setRentPrice(dto.getRentPrice());
        }

        if (dto.getServiceFee() != null) {
            entity.setServiceFee(dto.getServiceFee());
        }

        if (dto.getBrokerageFee() != null) {
            entity.setBrokerageFee(dto.getBrokerageFee());
        }

        if (dto.getManagerName() != null) {
            entity.setManagerName(dto.getManagerName());
        }

        if (dto.getManagerPhone() != null) {
            entity.setManagerPhone(dto.getManagerPhone());
        }

        if (dto.getDistrictId() != null) {
            // chỉ cần set FK
            entity.setDistrictId(dto.getDistrictId());
        }
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

}
