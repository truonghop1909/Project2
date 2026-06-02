package com.javaweb.service.impl.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javaweb.model.dto.statistics.*;
import com.javaweb.repository.*;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.service.statistics.AdminStatisticsService;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminStatisticsServiceImpl implements AdminStatisticsService {

    @Autowired private BuildingRepository buildingRepo;
    @Autowired private CustomerRepository customerRepo;
    @Autowired private TransactionRepository transactionRepo;
    @Autowired private AssignmentBuildingRepository assignBuildingRepo;
    @Autowired private AssignmentCustomerRepository assignCustomerRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private BuildingImageRepository buildingImageRepo;

    @Override
    public AdminStatisticsDTO getAdminStatistics() {
        AdminStatisticsDTO dto = new AdminStatisticsDTO();

        // ========== BUILDING ==========
        dto.setTotalBuildings(buildingRepo.countTotalBuildings());
        dto.setTotalFloorArea(buildingRepo.sumFloorArea());
        dto.setTotalExpectedRevenue(buildingRepo.sumRentPrice());

        List<Object[]> provinceData = buildingRepo.countBuildingsByProvince();
        Map<String, Long> provinceMap = new LinkedHashMap<>();
        if (provinceData != null) {
            for (Object[] row : provinceData) {
                provinceMap.put((String) row[0], ((Number) row[1]).longValue());
            }
        }
        dto.setBuildingsByProvince(provinceMap);

        List<Object[]> topBuildingData = buildingRepo.findTop5RentBuildingsNative();
        List<TopBuildingDTO> topBuildings = new ArrayList<>();
        if (topBuildingData != null) {
            for (Object[] row : topBuildingData) {
                TopBuildingDTO b = new TopBuildingDTO();
                b.setBuildingId(((Number) row[0]).intValue());
                b.setName((String) row[1]);
                b.setRentPrice((Double) row[2]);
                b.setProvinceName((String) row[3]);
                topBuildings.add(b);
            }
        }
        dto.setTop5HighestRentBuildings(topBuildings);

        // ========== CUSTOMER ==========
        dto.setTotalCustomers(customerRepo.count());
        dto.setPendingCustomers(customerRepo.countByApprovalStatus("PENDING"));
        dto.setApprovedCustomers(customerRepo.countByApprovalStatus("APPROVED"));
        dto.setRejectedCustomers(customerRepo.countByApprovalStatus("REJECTED"));

        List<Object[]> newCusMonthData = customerRepo.countNewCustomersByMonth();
        List<MonthlyCountDTO> newCusMonthly = new ArrayList<>();
        if (newCusMonthData != null) {
            for (Object[] row : newCusMonthData) {
                newCusMonthly.add(new MonthlyCountDTO((String) row[0], ((Number) row[1]).longValue()));
            }
        }
        dto.setNewCustomersByMonth(newCusMonthly.stream().limit(6).collect(Collectors.toList()));

        Double avgApprovalHours = customerRepo.getAverageApprovalTimeHours();
        dto.setAverageApprovalTimeHours(avgApprovalHours != null ? avgApprovalHours : 0.0);

        // ========== TRANSACTION ==========
        dto.setTotalTransactions(transactionRepo.countTotalTransactions());

        List<Object[]> transMonthData = transactionRepo.countTransactionsByMonth();
        List<MonthlyCountDTO> transMonthly = new ArrayList<>();
        if (transMonthData != null) {
            for (Object[] row : transMonthData) {
                transMonthly.add(new MonthlyCountDTO((String) row[0], ((Number) row[1]).longValue()));
            }
        }
        dto.setTransactionsByMonth(transMonthly);

        List<Object[]> transTypeData = transactionRepo.countTransactionsByType();
        Map<String, Long> typeMap = new LinkedHashMap<>();
        if (transTypeData != null) {
            for (Object[] row : transTypeData) {
                typeMap.put((String) row[0], ((Number) row[1]).longValue());
            }
        }
        dto.setTransactionsByType(typeMap);

        // ========== STAFF & ASSIGNMENT ==========
        Long activeStaff = userRepo.countActiveStaff();
        dto.setTotalActiveStaff(activeStaff != null ? activeStaff : 0L);

        List<Object[]> buildingAssignData = assignBuildingRepo.countBuildingsAssignedByStaff();
        List<TopStaffDTO> topStaffBuildings = buildTopStaffList(buildingAssignData, "building");
        dto.setTop3StaffByBuildings(topStaffBuildings.stream().limit(3).collect(Collectors.toList()));

        List<Object[]> customerAssignData = assignCustomerRepo.countCustomersAssignedByStaff();
        List<TopStaffDTO> topStaffCustomers = buildTopStaffList(customerAssignData, "customer");
        dto.setTop3StaffByCustomers(topStaffCustomers.stream().limit(3).collect(Collectors.toList()));

        List<UserEntity> allActiveStaffList = userRepo.findAllActiveStaff();
        long staffWithAssignment = 0;
        if (allActiveStaffList != null) {
            for (UserEntity staff : allActiveStaffList) {
                Long buildingCount = assignBuildingRepo.countByStaffId(staff.getId());
                Long customerCount = assignCustomerRepo.countByStaffId(staff.getId());
                if ((buildingCount != null && buildingCount > 0) || (customerCount != null && customerCount > 0)) {
                    staffWithAssignment++;
                }
            }
        }
        double utilization = (allActiveStaffList == null || allActiveStaffList.isEmpty()) ? 0.0 :
                (double) staffWithAssignment / allActiveStaffList.size() * 100;
        dto.setStaffUtilizationRate(utilization);

        // ========== IMAGE ==========
        dto.setTotalImages(buildingImageRepo.count());
        dto.setBuildingsWithThumbnail(buildingRepo.countBuildingsWithThumbnail());

        return dto;
    }

    private List<TopStaffDTO> buildTopStaffList(List<Object[]> data, String type) {
        List<TopStaffDTO> result = new ArrayList<>();
        if (data == null) return result;
        for (Object[] row : data) {
            Integer staffId = ((Number) row[0]).intValue();
            Long count = ((Number) row[1]).longValue();
            TopStaffDTO dto = new TopStaffDTO();
            dto.setStaffId(staffId);
            if ("building".equals(type)) {
                dto.setTotalBuildings(count);
            } else {
                dto.setTotalCustomers(count);
            }
            userRepo.findById(staffId).ifPresent(u -> dto.setStaffName(u.getFullname()));
            result.add(dto);
        }
        return result;
    }
}