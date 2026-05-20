package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.repository.entity.CustomerEntity;

@Component
public class CustomerConverter {

    // =========================================================
    // ENTITY -> DTO
    // =========================================================
    public CustomerDTO toDTO(CustomerEntity entity) {

        CustomerDTO dto = new CustomerDTO();

        dto.setId(entity.getId());
        dto.setFullname(entity.getFullname());
        dto.setPhone(entity.getPhone());
        dto.setEmail(entity.getEmail());
        dto.setDemand(entity.getDemand());
        dto.setNote(entity.getNote());

        dto.setApprovalStatus(entity.getApprovalStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setCreatedBy(entity.getCreatedBy());

        if (entity.getCreatedUser() != null) {
            dto.setCreatedByName(entity.getCreatedUser().getFullname());
        }

        dto.setApprovedAt(entity.getApprovedAt());
        dto.setApprovedBy(entity.getApprovedBy());

        if (entity.getApprovedUser() != null) {
            dto.setApprovedByName(entity.getApprovedUser().getFullname());
        }

        return dto;
    }

    // =========================================================
    // LIST ENTITY -> LIST DTO
    // =========================================================
    public List<CustomerDTO> toDTOList(List<CustomerEntity> entities) {
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // =========================================================
    // DTO -> ENTITY (CREATE)
    // Chỉ map các field nhập từ form/request
    // approvalStatus, createdAt, createdBy... xử lý ở service/entity
    // =========================================================
    public CustomerEntity toEntity(CustomerRequestDTO dto) {
        CustomerEntity entity = new CustomerEntity();

        entity.setFullname(dto.getFullname());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setDemand(dto.getDemand());
        entity.setNote(dto.getNote());

        return entity;
    }

    // =========================================================
    // UPDATE ENTITY
    // Chỉ update field nào request có gửi
    // tránh ghi đè null nếu frontend không truyền đủ field
    // =========================================================
    public void mapUpdate(CustomerRequestDTO dto, CustomerEntity entity) {

        if (dto.getFullname() != null) {
            entity.setFullname(dto.getFullname());
        }

        if (dto.getPhone() != null) {
            entity.setPhone(dto.getPhone());
        }

        if (dto.getEmail() != null) {
            entity.setEmail(dto.getEmail());
        }

        if (dto.getDemand() != null) {
            entity.setDemand(dto.getDemand());
        }

        if (dto.getNote() != null) {
            entity.setNote(dto.getNote());
        }
    }
}