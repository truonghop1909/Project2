package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.repository.entity.AssignmentBuildingEntity;
import com.javaweb.repository.entity.BuildingEntity;

public interface AssignmentBuildingRepository
                extends JpaRepository<AssignmentBuildingEntity, Integer> {

        // =========================================================
        // 1. XÓA TOÀN BỘ STAFF ĐANG ĐƯỢC ASSIGN CHO BUILDING
        // Dùng JPQL thay vì Native Query
        // =========================================================
        @Modifying
        @Transactional
        @Query("DELETE FROM AssignmentBuildingEntity a WHERE a.building.id = :buildingId")
        void deleteByBuildingId(@Param("buildingId") Integer buildingId);

        // =========================================================
        // 2. LẤY TOÀN BỘ BẢN GHI ASSIGNMENT THEO BUILDING ID
        // Trả về danh sách entity assignmentbuilding của một building
        // =========================================================
        @Query("SELECT a FROM AssignmentBuildingEntity a WHERE a.building.id = :buildingId")
        List<AssignmentBuildingEntity> findByBuildingId(@Param("buildingId") Integer buildingId);

        // =========================================================
        // 3. LẤY DANH SÁCH STAFF ID ĐANG ĐƯỢC ASSIGN CHO BUILDING
        // Ví dụ: building 10 -> [2, 5]
        // =========================================================
        @Query("SELECT a.staff.id FROM AssignmentBuildingEntity a WHERE a.building.id = :buildingId")
        List<Integer> findStaffIdsByBuildingId(@Param("buildingId") Integer buildingId);

        // =========================================================
        // 4. KIỂM TRA BUILDING ĐÃ ĐƯỢC ASSIGN CHO STAFF CHƯA
        // Trả về true nếu đã tồn tại assignment, ngược lại false
        // Dùng method naming convention (không cần @Query)
        // =========================================================
        boolean existsByBuildingIdAndStaffId(Integer buildingId, Integer staffId);

        // =========================================================
        // 5. XÓA MỘT ASSIGNMENT CỤ THỂ
        // Ví dụ: bỏ staff 2 khỏi building 10
        // =========================================================
        @Modifying
        @Transactional
        @Query("DELETE FROM AssignmentBuildingEntity a WHERE a.building.id = :buildingId AND a.staff.id = :staffId")
        void deleteByBuildingIdAndStaffId(@Param("buildingId") Integer buildingId,
                        @Param("staffId") Integer staffId);

        // =========================================================
        // 6. LẤY DANH SÁCH BUILDING ID THEO STAFF ID
        // Ví dụ: staff 2 đang được giao các building nào
        // =========================================================
        @Query("SELECT a.building.id FROM AssignmentBuildingEntity a WHERE a.staff.id = :staffId")
        List<Integer> findBuildingIdsByStaffId(@Param("staffId") Integer staffId);

        // =========================================================
        // 7. ĐẾM SỐ LƯỢNG ASSIGNMENT CỦA BUILDING VỚI STAFF CỤ THỂ
        // Dùng để kiểm tra tồn tại (có thể dùng exists thay thế)
        // =========================================================
        @Query("SELECT COUNT(a) FROM AssignmentBuildingEntity a WHERE a.building.id = :buildingId AND a.staff.id = :staffId")
        long countByBuildingIdAndStaffId(@Param("buildingId") Integer buildingId,
                        @Param("staffId") Integer staffId);

        // Đếm số building được giao cho từng staff (dùng để tìm top staff)
        // AssignmentBuildingRepository
        @Query(value = "SELECT staff_id, COUNT(*) FROM assignmentbuilding GROUP BY staff_id ORDER BY COUNT(*) DESC", nativeQuery = true)
        List<Object[]> countBuildingsAssignedByStaff();

        // Đếm số building được giao cho một staff cụ thể
        Long countByStaffId(Integer staffId);

        // Lấy danh sách building entity của một staff
        @Query("SELECT b FROM BuildingEntity b JOIN b.users u WHERE u.id = :staffId")
        List<BuildingEntity> findBuildingsByStaffId(@Param("staffId") Integer staffId);
}