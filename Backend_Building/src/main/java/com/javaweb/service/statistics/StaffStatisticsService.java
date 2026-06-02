package com.javaweb.service.statistics;

import com.javaweb.model.dto.statistics.StaffStatisticsDTO;

public interface StaffStatisticsService {
    StaffStatisticsDTO getStaffStatistics(Integer staffId);
}