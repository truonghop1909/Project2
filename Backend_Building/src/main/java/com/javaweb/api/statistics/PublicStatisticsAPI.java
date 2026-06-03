package com.javaweb.api.statistics;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.model.dto.statistics.PublicStatisticsDTO;
import com.javaweb.model.dto.statistics.TopBuildingDTO;
import com.javaweb.model.dto.statistics.TopStaffTransactionDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.TransactionRepository;

@RestController
@RequestMapping("/api/public/statistics")
public class PublicStatisticsAPI {

    @Autowired
    private BuildingRepository buildingRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    // ================= TỔNG QUAN (CHO HERO + STATS PREVIEW) =================
    @GetMapping
    public PublicStatisticsDTO getPublicStatistics() {
        PublicStatisticsDTO dto = new PublicStatisticsDTO();
        dto.setTotalBuildings(buildingRepo.countTotalBuildings());
        dto.setMinRentPrice(buildingRepo.findMinRentPrice());
        dto.setMaxRentPrice(buildingRepo.findMaxRentPrice());
        dto.setAvgRentPrice(buildingRepo.findAvgRentPrice());

        // Buildings by province
        List<Object[]> provinceData = buildingRepo.countBuildingsByProvince();
        Map<String, Long> provinceMap = new LinkedHashMap<>();
        for (Object[] row : provinceData) {
            provinceMap.put((String) row[0], ((Number) row[1]).longValue());
        }
        dto.setBuildingsByProvince(provinceMap);

        // Top 5 buildings (có thể dùng để hiển thị thêm nếu cần)
        List<Object[]> topData = buildingRepo.findTop5RentBuildingsNative();
        List<TopBuildingDTO> topList = new ArrayList<>();
        for (Object[] row : topData) {
            TopBuildingDTO b = new TopBuildingDTO();
            b.setBuildingId((Integer) row[0]);
            b.setName((String) row[1]);
            b.setRentPrice((Double) row[4]); // rentPrice ở index 4
            b.setProvinceName((String) row[7]);
            topList.add(b);
        }
        dto.setTop5HighestRentBuildings(topList);

        return dto;
    }

    // ================= TOP 5 BUILDINGS (ĐÃ CÓ) =================
    @GetMapping("/top-buildings")
    public List<BuildingSearchDTO> getTop5HighestRentBuildings() {
        List<Object[]> data = buildingRepo.findTop5RentBuildingsNative();
        List<BuildingSearchDTO> result = new ArrayList<>();
        for (Object[] row : data) {
            BuildingSearchDTO dto = new BuildingSearchDTO();
            dto.setId((Integer) row[0]);
            dto.setName((String) row[1]);
            dto.setAddress((String) row[2]);
            dto.setFloorArea((Double) row[3]);
            dto.setRentPrice((Double) row[4]);
            dto.setManagerName((String) row[5]);
            dto.setThumbnail((String) row[6]);
            dto.setProvinceName((String) row[7]);
            result.add(dto);
        }
        return result;
    }

    // ================= TOP BUILDINGS BY PROVINCE (ĐÃ CÓ) =================
    @GetMapping("/top-buildings-by-province")
    public Map<String, List<BuildingSearchDTO>> getTopBuildingsByProvinces(
            @RequestParam List<String> provinces,
            @RequestParam(defaultValue = "5") int limit) {
        Map<String, List<BuildingSearchDTO>> result = new HashMap<>();
        for (String province : provinces) {
            List<Object[]> data = buildingRepo.findTopBuildingsByProvince(province, limit);
            List<BuildingSearchDTO> list = new ArrayList<>();
            for (Object[] row : data) {
                BuildingSearchDTO dto = new BuildingSearchDTO();
                dto.setId((Integer) row[0]);
                dto.setName((String) row[1]);
                dto.setAddress((String) row[2]);
                dto.setFloorArea((Double) row[3]);
                dto.setRentPrice((Double) row[4]);
                dto.setManagerName((String) row[5]);
                dto.setThumbnail((String) row[6]);
                dto.setProvinceName((String) row[7]);
                list.add(dto);
            }
            result.put(province, list);
        }
        return result;
    }

    // ================= TOP STAFF TRANSACTIONS (ĐÃ CÓ) =================
    @GetMapping("/top-staff-transactions")
    public List<TopStaffTransactionDTO> getTop5StaffByTransactions() {
        List<Object[]> data = transactionRepo.findTop5StaffByTransactionCount();
        return data.stream()
                .map(row -> {
                    TopStaffTransactionDTO dto = new TopStaffTransactionDTO();
                    dto.setStaffId((Integer) row[0]);
                    dto.setStaffName((String) row[1]);
                    dto.setTransactionCount(((Number) row[2]).longValue());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}