package com.javaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.javaweb.model.UserCreateRequestDTO;
import com.javaweb.model.UserDTO;
import com.javaweb.model.UserSearchDTO;
import com.javaweb.repository.RoleRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.RoleEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ================= ADMIN ================= */

    @Override
    public List<UserDTO> searchUsers(UserSearchDTO searchDTO) {
        final UserSearchDTO search = searchDTO != null ? searchDTO : new UserSearchDTO();
        
        List<UserEntity> users = userRepository.findAll();

        return users.stream()
                .filter(u -> filterByRole(u, search.getRole()))
                .filter(u -> filterByStatus(u, search.getStatus()))
                .filter(u -> filterByKeyword(u, search.getKeyword()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO createUser(UserCreateRequestDTO dto) {

        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        UserEntity user = new UserEntity();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setFullname(dto.getFullname());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setStatus(1);

        // xử lý role
        List<RoleEntity> roles = new ArrayList<>();

        if (dto.getRoleCodes() == null || dto.getRoleCodes().isEmpty()) {
            // REGISTER → mặc định STAFF
            roles.add(roleRepository.findByCode("ROLE_STAFF"));
        } else {
            // ADMIN tạo user
            for (String roleCode : dto.getRoleCodes()) {
                RoleEntity role = roleRepository.findByCode(roleCode);
                if (role != null) {
                    roles.add(role);
                }
            }
        }

        user.setRoles(roles);

        userRepository.save(user);
        return convertToDTO(user);
    }

    @Override
    public void toggleStatus(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(user.getStatus() == 1 ? 0 : 1);
        userRepository.save(user);
    }

    /* ================= COMMON ================= */

    @Override
    public UserDTO getUserById(Integer id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    /* ================= PRIVATE ================= */

    private UserDTO convertToDTO(UserEntity user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFullname(user.getFullname());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setStatus(user.getStatus());

        List<String> roles = new ArrayList<>();
        if (user.getRoles() != null) {
            roles = user.getRoles()
                    .stream()
                    .filter(r -> r != null && r.getCode() != null)
                    .map(RoleEntity::getCode)
                    .collect(Collectors.toList());
        }

        dto.setRoles(roles);
        return dto;
    }

    private boolean filterByRole(UserEntity user, String role) {
        // If no role filter selected, include all users
        if (!StringUtils.hasText(role))
            return true;
        
        // If role filter is selected but user has no roles, exclude this user
        if (user.getRoles() == null || user.getRoles().isEmpty())
            return false;
        
        // Check if any of user's roles match the filter
        return user.getRoles().stream()
                .filter(r -> r != null && r.getCode() != null)
                .anyMatch(r -> r.getCode().equalsIgnoreCase(role));
    }

    private boolean filterByStatus(UserEntity user, Integer status) {
        if (status == null)
            return true;
        return user.getStatus().equals(status);
    }

    private boolean filterByKeyword(UserEntity user, String keyword) {
        if (!StringUtils.hasText(keyword))
            return true;

        String kw = keyword.toLowerCase();
        return (user.getUsername() != null && user.getUsername().toLowerCase().contains(kw))
                || (user.getFullname() != null && user.getFullname().toLowerCase().contains(kw))
                || (user.getEmail() != null && user.getEmail().toLowerCase().contains(kw));
    }

    @Override
    public void updateUserRoles(Integer userId, List<String> roleCodes) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (roleCodes == null || roleCodes.isEmpty()) {
            throw new RuntimeException("Role list cannot be empty");
        }

        List<RoleEntity> roles = new ArrayList<>();

        for (String code : roleCodes) {
            RoleEntity role = roleRepository.findByCode(code);
            if (role == null) {
                throw new RuntimeException("Role not found: " + code);
            }
            roles.add(role);
        }

        user.setRoles(roles);
        userRepository.save(user);
    }

}
