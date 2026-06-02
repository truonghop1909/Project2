package com.javaweb.api.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.javaweb.model.dto.statistics.AdminStatisticsDTO;
import com.javaweb.service.statistics.AdminStatisticsService;

@RestController
@RequestMapping("/api/statistics/admin")
public class AdminStatisticsAPI {

    @Autowired
    private AdminStatisticsService adminStatisticsService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminStatisticsDTO getAdminDashboard() {
        return adminStatisticsService.getAdminStatistics();
    }
}