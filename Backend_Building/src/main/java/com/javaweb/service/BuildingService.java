package com.javaweb.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingDetailDTO;
import com.javaweb.model.BuildingImageDTO;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.PageResponseDTO;
import com.javaweb.model.UserDTO;

public interface BuildingService {

    List<BuildingSearchDTO> findAll(Map<String, Object> params, List<String> typeCode);

    void updateBuilding(Integer id, BuildingDetailDTO dto);

    Integer createBuilding(BuildingDetailDTO dto);

    void deleteBuilding(Integer id);

    BuildingDetailDTO findById(Integer id);

    List<BuildingSearchDTO> search(BuildingSearchBuilder builder);

    List<UserDTO> getAssignedStaff(Integer buildingId);

    void uploadBuildingImage(Integer id, MultipartFile file);

    void uploadSubImage(Integer id, MultipartFile file, String title, String description);

    void updateSubImage(Integer id, BuildingImageDTO dto);

    void deleteSubImage(Integer id);

    void updateImageOrder(Integer imageId, Integer order);
    
    // ===== THÊM CÁC METHOD SAU =====
    
    /** Lấy danh sách ảnh phụ của tòa nhà */
    List<BuildingImageDTO> getSubImages(Integer buildingId);
    
    /** Lấy danh sách tòa nhà công khai (có phân trang) */
    List<BuildingSearchDTO> getPublicBuildings(Map<String, Object> params, List<String> typeCode, Integer page, Integer size);
    
    /** Lấy chi tiết tòa nhà công khai */
    BuildingDetailDTO getPublicBuildingById(Integer id);

    // THÊM METHOD MỚI TRẢ VỀ PHÂN TRANG
    PageResponseDTO<BuildingSearchDTO> findAllWithPagination(
        Map<String, Object> params, 
        List<String> typeCode, 
        int page, 
        int size
    );
}