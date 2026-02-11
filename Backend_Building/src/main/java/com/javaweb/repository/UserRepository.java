package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    /**
     * Lấy danh sách user theo status và role code
     * Dùng cho chức năng giao tòa nhà
     */
    List<UserEntity> findByStatusAndRoles_Code(Integer status, String code);

    /**
     * Check username đã tồn tại (dùng cho register)
     */
    boolean existsByUsername(String username);

    /**
     * Lấy user theo username (dùng cho login)
     */
    UserEntity findByUsername(String username);
}
