package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    List<UserEntity> findByStatus(Integer status);

    List<UserEntity> findDistinctByStatusAndRoles_CodeIn(Integer status, List<String> codes);

    // Đếm số staff đang active (status=1 và có role STAFF)
    @Query("SELECT COUNT(u) FROM UserEntity u JOIN u.roles r WHERE u.status = 1 AND r.code = 'ROLE_STAFF'")
    Long countActiveStaff();

    // Lấy danh sách tất cả staff đang active (dùng để tính tỉ lệ)
    @Query("SELECT u FROM UserEntity u JOIN u.roles r WHERE u.status = 1 AND r.code = 'ROLE_STAFF'")
    List<UserEntity> findAllActiveStaff();
}
