// com.javaweb.service.impl.statistics.PublicStatisticsServiceImpl.java
package com.javaweb.service.impl.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javaweb.model.dto.statistics.*;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.service.statistics.PublicStatisticsService;

import java.util.*;

@Service
public class PublicStatisticsServiceImpl implements PublicStatisticsService {

    @Autowired
    private BuildingRepository buildingRepo;

    @Override
    public PublicStatisticsDTO getPublicStatistics() {
        PublicStatisticsDTO dto = new PublicStatisticsDTO();

        dto.setTotalBuildings(buildingRepo.countTotalBuildings());

        // Giá thuê min, max, avg
        Double min = buildingRepo.findMinRentPrice(); // cần tạo method
        Double max = buildingRepo.findMaxRentPrice(); // cần tạo method
        Double avg = buildingRepo.findAvgRentPrice(); // cần tạo method
        dto.setMinRentPrice(min != null ? min : 0.0);
        dto.setMaxRentPrice(max != null ? max : 0.0);
        dto.setAvgRentPrice(avg != null ? avg : 0.0);

        // Buildings by province
        List<Object[]> provinceData = buildingRepo.countBuildingsByProvince();
        Map<String, Long> provinceMap = new LinkedHashMap<>();
        for (Object[] row : provinceData) {
            provinceMap.put((String) row[0], ((Number) row[1]).longValue());
        }
        dto.setBuildingsByProvince(provinceMap);

        // Top 5 highest rent buildings
        List<Object[]> topBuildingData = buildingRepo.findTop5RentBuildingsNative();
        List<TopBuildingDTO> topBuildings = new ArrayList<>();
        if (topBuildingData != null) {
            for (Object[] row : topBuildingData) {
                TopBuildingDTO b = new TopBuildingDTO();
                b.setBuildingId(((Number) row[0]).intValue()); // id
                b.setName((String) row[1]); // name
                // row[2] là full_address, row[3] floor_area, row[4] rent_price, row[5]
                // manager_name, row[6] thumbnail, row[7] province_name
                b.setRentPrice(((Number) row[4]).doubleValue()); // rent_price
                b.setProvinceName((String) row[7]); // province_name
                topBuildings.add(b);
            }
        }
        dto.setTop5HighestRentBuildings(topBuildings);

        return dto;
    }
}