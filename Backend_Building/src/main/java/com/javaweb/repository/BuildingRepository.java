package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    // ✅ Top 5 building có giá thuê cao nhất – dùng NATIVE QUERY, trả về
    // List<Object[]>
    @Query(value = "SELECT id, name, full_address, floor_area, rent_price, manager_name, thumbnail, province_name " +
            "FROM building ORDER BY rent_price DESC LIMIT 5", nativeQuery = true)
    List<Object[]> findTop5RentBuildingsNative();

    // Đếm số building có thumbnail
    @Query("SELECT COUNT(b) FROM BuildingEntity b WHERE b.thumbnail IS NOT NULL AND b.thumbnail != ''")
    Long countBuildingsWithThumbnail();

    @Query("SELECT MIN(b.rentPrice) FROM BuildingEntity b")
    Double findMinRentPrice();

    @Query("SELECT MAX(b.rentPrice) FROM BuildingEntity b")
    Double findMaxRentPrice();

    @Query("SELECT AVG(b.rentPrice) FROM BuildingEntity b")
    Double findAvgRentPrice();

    // Lấy top N tòa nhà theo thành phố (provinceName)
    @Query(value = "SELECT id, name, full_address, floor_area, rent_price, manager_name, thumbnail, province_name " +
            "FROM building WHERE province_name = :provinceName ORDER BY rent_price DESC LIMIT :limit", nativeQuery = true)
    List<Object[]> findTopBuildingsByProvince(@Param("provinceName") String provinceName, @Param("limit") int limit);
}