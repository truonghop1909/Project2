package com.javaweb.api.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.UserCreateRequestDTO;
import com.javaweb.model.UserDTO;
import com.javaweb.model.UserRoleUpdateRequestDTO;
import com.javaweb.model.UserSearchDTO;
import com.javaweb.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin // nếu đã config global CORS thì có thể bỏ
public class UserAPI {

    @Autowired
    private UserService userService;

    /**
     * =========================
     * ADMIN: Tìm kiếm user
     * role / status / keyword
     * =========================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(
            @RequestBody UserSearchDTO searchDTO) {
        return ResponseEntity.ok(userService.searchUsers(searchDTO));
    }

    /**
     * =========================
     * ADMIN: Tạo user mới
     * (ADMIN có thể set role)
     * =========================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @RequestBody UserCreateRequestDTO request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    /**
     * =========================
     * ADMIN: Khóa / mở user
     * =========================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<UserDTO> toggleUserStatus(
            @PathVariable Integer id) {
        userService.toggleStatus(id);
        UserDTO updatedUser = userService.getUserById(id);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * =========================
     * ADMIN: Lấy chi tiết user
     * =========================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserDetail(
            @PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    /**
     * =========================
     * ADMIN: Cập nhật quyền user
     * =========================
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/roles")
    public ResponseEntity<UserDTO> updateUserRoles(
            @PathVariable Integer id,
            @RequestBody UserRoleUpdateRequestDTO request) {

        userService.updateUserRoles(id, request.getRoleCodes());
        UserDTO updatedUser = userService.getUserById(id);
        return ResponseEntity.ok(updatedUser);
    }

}
