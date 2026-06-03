// com.javaweb.model.dto.statistics.PublicStatisticsDTO.java
package com.javaweb.model.dto.statistics;

import java.util.List;
import java.util.Map;

public class PublicStatisticsDTO {
    private Long totalBuildings;
    private Double minRentPrice;
    private Double maxRentPrice;
    private Double avgRentPrice;
    private Map<String, Long> buildingsByProvince;
    private List<TopBuildingDTO> top5HighestRentBuildings;
    // có thể thêm các chỉ số khác nếu muốn
    public Long getTotalBuildings() {
        return totalBuildings;
    }
    public void setTotalBuildings(Long totalBuildings) {
        this.totalBuildings = totalBuildings;
    }
    public Double getMinRentPrice() {
        return minRentPrice;
    }
    public void setMinRentPrice(Double minRentPrice) {
        this.minRentPrice = minRentPrice;
    }
    public Double getMaxRentPrice() {
        return maxRentPrice;
    }
    public void setMaxRentPrice(Double maxRentPrice) {
        this.maxRentPrice = maxRentPrice;
    }
    public Double getAvgRentPrice() {
        return avgRentPrice;
    }
    public void setAvgRentPrice(Double avgRentPrice) {
        this.avgRentPrice = avgRentPrice;
    }
    public Map<String, Long> getBuildingsByProvince() {
        return buildingsByProvince;
    }
    public void setBuildingsByProvince(Map<String, Long> buildingsByProvince) {
        this.buildingsByProvince = buildingsByProvince;
    }
    public List<TopBuildingDTO> getTop5HighestRentBuildings() {
        return top5HighestRentBuildings;
    }
    public void setTop5HighestRentBuildings(List<TopBuildingDTO> top5HighestRentBuildings) {
        this.top5HighestRentBuildings = top5HighestRentBuildings;
    }
    
}