package com.javaweb.api.building;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.javaweb.model.BuildingDetailDTO;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.PageResponseDTO;
import com.javaweb.model.UserDTO;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.BuildingService;
import com.javaweb.repository.UserRepository;
import com.javaweb.model.BuildingImageDTO;

@RestController
@RequestMapping("/api")
public class BuildingAPI {
    @Autowired
    private BuildingService buildingService;
    @Autowired
    private UserRepository userRepository;

    // ==================== PUBLIC API (Không cần authentication)
    // ====================

    /**
     * API công khai - Lấy danh sách tòa nhà cho trang chủ (không cần đăng nhập)
     */
    @GetMapping("/public/buildings")
    public PageResponseDTO<BuildingSearchDTO> getPublicBuildings(
            @RequestParam Map<String, Object> params,
            @RequestParam(name = "typeCode", required = false) List<String> typeCode,
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "size", defaultValue = "12") Integer size) {

        return buildingService.findAllWithPagination(params, typeCode, page, size);
    }

    /**
     * API công khai - Lấy chi tiết tòa nhà cho khách hàng (không cần đăng nhập)
     */
    @GetMapping("/public/buildings/{id}")
    public BuildingDetailDTO getPublicBuildingById(@PathVariable Integer id) {
        return buildingService.findById(id);
    }

    /**
     * API công khai - Lấy danh sách ảnh của tòa nhà (không cần đăng nhập)
     */
    @GetMapping("/public/buildings/{id}/images")
    public List<BuildingImageDTO> getPublicSubImages(@PathVariable Integer id) {
        return buildingService.getSubImages(id);
    }

    // ==================== AUTHENTICATED API (Cần đăng nhập) ====================

    // ===== SEARCH LIST (cho admin/staff) =====
    @GetMapping("/building")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public List<BuildingSearchDTO> getBuilding(
            @RequestParam Map<String, Object> params,
            @RequestParam(name = "typeCode", required = false) List<String> typeCode) {

        return buildingService.findAll(params, typeCode);
    }

    // ===== DETAIL (cho admin/staff) =====
    @GetMapping("/building/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public BuildingDetailDTO getBuildingById(@PathVariable Integer id) {
        return buildingService.findById(id);
    }

    // ===== CREATE =====
    @PostMapping("/building")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBuilding(@RequestBody BuildingDetailDTO dto) {
        Integer buildingId = buildingService.createBuilding(dto);
        return ResponseEntity.ok(Collections.singletonMap("id", buildingId));
    }

    // ===== UPDATE =====
    @PutMapping("/building/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateBuilding(
            @PathVariable Integer id,
            @RequestBody BuildingDetailDTO dto) {

        buildingService.updateBuilding(id, dto);
    }

    // ===== DELETE =====
    @DeleteMapping("/building/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBuilding(@PathVariable Integer id) {
        buildingService.deleteBuilding(id);
    }

    @GetMapping("/building/my-building")
    @PreAuthorize("hasRole('STAFF')")
    public List<BuildingSearchDTO> getMyBuildings(
            @RequestParam Map<String, Object> params,
            @RequestParam(name = "typeCode", required = false) List<String> typeCode) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userIdStr = auth.getName();

        Integer userId = Integer.parseInt(userIdStr);

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id = " + userId));

        params.put("staffId", user.getId());

        return buildingService.findAll(params, typeCode);
    }

    @GetMapping("/building/{id}/staff")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public List<UserDTO> getAssignedStaff(@PathVariable Integer id) {
        return buildingService.getAssignedStaff(id);
    }

    // ==================== IMAGE API (Cần đăng nhập) ====================

    // ===== UPLOAD IMAGE =====
    @PostMapping("/building/{id}/image")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadBuildingImage(@PathVariable Integer id,
            @RequestParam("file") MultipartFile file) {
        buildingService.uploadBuildingImage(id, file);
        return ResponseEntity.ok("Upload ảnh thành công");
    }

    // ===== UPLOAD SUB IMAGE =====
    @PostMapping("/building/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadSubImage(@PathVariable Integer id,
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) {
        buildingService.uploadSubImage(id, file, title, description);
        return ResponseEntity.ok("Upload ảnh phụ thành công");
    }

    // ===== GET SUB IMAGES =====
    @GetMapping("/building/{id}/images")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public List<BuildingImageDTO> getSubImages(@PathVariable Integer id) {
        return buildingService.getSubImages(id);
    }

    // ===== UPDATE SUB IMAGE INFO =====
    @PutMapping("/building/images/{imageId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateSubImage(@PathVariable Integer imageId,
            @RequestBody BuildingImageDTO dto) {
        buildingService.updateSubImage(imageId, dto);
        return ResponseEntity.ok("Cập nhật ảnh phụ thành công");
    }

    // ===== UPDATE IMAGE ORDER =====
    @PutMapping("/building/images/{imageId}/order")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateOrder(@PathVariable Integer imageId,
            @RequestParam Integer order) {
        buildingService.updateImageOrder(imageId, order);
    }

    // ===== DELETE SUB IMAGE =====
    @DeleteMapping("/building/images/{imageId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSubImage(@PathVariable Integer imageId) {
        buildingService.deleteSubImage(imageId);
        return ResponseEntity.ok("Xóa ảnh phụ thành công");
    }
}