package com.javaweb.api.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.javaweb.model.dto.statistics.StaffStatisticsDTO;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.repository.UserRepository;
import com.javaweb.service.statistics.StaffStatisticsService;

@RestController
@RequestMapping("/api/statistics/staff")
public class StaffStatisticsAPI {

    @Autowired
    private StaffStatisticsService staffStatisticsService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    @PreAuthorize("hasRole('STAFF')")
    public StaffStatisticsDTO getMyStatistics() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userIdStr = auth.getName(); // Lấy "7"

        Integer userId;
        try {
            userId = Integer.parseInt(userIdStr);
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid user id format: " + userIdStr);
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id = " + userId));

        return staffStatisticsService.getStaffStatistics(user.getId());
    }
}