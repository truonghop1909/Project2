package com.javaweb.converter;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.javaweb.model.UserDTO;
import com.javaweb.repository.entity.UserEntity;

@Component
public class UserConverter {

    public UserDTO convertToDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setFullname(entity.getFullname());
        dto.setStatus(entity.getStatus());

        if (entity.getRoles() != null) {
            dto.setRoles(
                entity.getRoles()
                      .stream()
                      .map(role -> role.getCode())
                      .collect(Collectors.toList())
            );
        }

        return dto;
    }
}
