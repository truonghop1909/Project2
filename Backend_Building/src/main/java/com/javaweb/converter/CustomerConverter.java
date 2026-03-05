package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.javaweb.model.CustomerDTO;
import com.javaweb.model.CustomerRequestDTO;
import com.javaweb.repository.entity.CustomerEntity;

@Component
public class CustomerConverter {

    // ================= ENTITY -> DTO =================
    public CustomerDTO toDTO(CustomerEntity entity) {
        CustomerDTO dto = new CustomerDTO();

        dto.setId(entity.getId());
        dto.setFullname(entity.getFullname());
        dto.setPhone(entity.getPhone());
        dto.setEmail(entity.getEmail());
        dto.setDemand(entity.getDemand());
        dto.setNote(entity.getNote());

        return dto;
    }

    // ================= LIST ENTITY -> LIST DTO =================
    public List<CustomerDTO> toDTOList(List<CustomerEntity> entities) {
        return entities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ================= DTO -> ENTITY (CREATE) =================
    public CustomerEntity toEntity(CustomerRequestDTO dto) {

        CustomerEntity entity = new CustomerEntity();

        entity.setFullname(dto.getFullname());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setDemand(dto.getDemand());
        entity.setNote(dto.getNote());

        return entity;
    }

    // ================= UPDATE ENTITY =================
    public void mapUpdate(CustomerRequestDTO dto, CustomerEntity entity) {

        entity.setFullname(dto.getFullname());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setDemand(dto.getDemand());
        entity.setNote(dto.getNote());
    }
}