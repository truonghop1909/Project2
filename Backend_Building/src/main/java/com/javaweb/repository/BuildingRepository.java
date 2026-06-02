package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaweb.repository.custom.BuildingRepositoryCustom;
import com.javaweb.repository.entity.BuildingEntity;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Integer>, BuildingRepositoryCustom {

    // ================= STATISTICS METHODS =================

    // Đếm tổng số building
    @Query("SELECT COUNT(b) FROM BuildingEntity b")
    Long countTotalBuildings();

    // Tổng diện tích sàn
    @Query("SELECT COALESCE(SUM(b.floorArea), 0) FROM BuildingEntity b")
    Double sumFloorArea();

    // Tổng giá thuê kỳ vọng
    @Query("SELECT COALESCE(SUM(b.rentPrice), 0) FROM BuildingEntity b")
    Double sumRentPrice();

    // Số building theo tỉnh (province_name)
    @Query("SELECT b.provinceName, COUNT(b) FROM BuildingEntity b GROUP BY b.provinceName")
    List<Object[]> countBuildingsByProvince();

    // ✅ Top 5 building có giá thuê cao nhất – dùng NATIVE QUERY, trả về List<Object[]>
    @Query(value = "SELECT id, name, rent_price, province_name FROM building ORDER BY rent_price DESC LIMIT 5", nativeQuery = true)
    List<Object[]> findTop5RentBuildingsNative();

    // Đếm số building có thumbnail
    @Query("SELECT COUNT(b) FROM BuildingEntity b WHERE b.thumbnail IS NOT NULL AND b.thumbnail != ''")
    Long countBuildingsWithThumbnail();
}