package com.javaweb.service.impl.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.javaweb.converter.CustomerConverter;
import com.javaweb.converter.TransactionConverter;
import com.javaweb.model.dto.statistics.StaffStatisticsDTO;
import com.javaweb.repository.*;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.CustomerEntity;
import com.javaweb.repository.entity.TransactionEntity;
import com.javaweb.service.statistics.StaffStatisticsService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StaffStatisticsServiceImpl implements StaffStatisticsService {

    @Autowired private AssignmentBuildingRepository assignBuildingRepo;
    @Autowired private AssignmentCustomerRepository assignCustomerRepo;
    @Autowired private TransactionRepository transactionRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private BuildingRepository buildingRepo;
    @Autowired private CustomerConverter customerConverter;
    @Autowired private TransactionConverter transactionConverter;

    @Override
    public StaffStatisticsDTO getStaffStatistics(Integer staffId) {
        StaffStatisticsDTO dto = new StaffStatisticsDTO();
        dto.setStaffId(staffId);
        userRepo.findById(staffId).ifPresent(u -> dto.setStaffName(u.getFullname()));

        // Số lượng building được giao
        Long buildingCount = assignBuildingRepo.countByStaffId(staffId);
        dto.setAssignedBuildingsCount(buildingCount != null ? buildingCount : 0L);

        // Số lượng customer được giao (chỉ APPROVED)
        Long customerCount = assignCustomerRepo.countByStaffId(staffId);
        dto.setAssignedCustomersCount(customerCount != null ? customerCount : 0L);

        // Số giao dịch
        Long transCount = transactionRepo.countByStaffId(staffId);
        dto.setTransactionsCount(transCount != null ? transCount : 0L);

        // Tổng giá thuê từ các building được giao
        List<BuildingEntity> buildings = assignBuildingRepo.findBuildingsByStaffId(staffId);
        Double revenue = buildings.stream().mapToDouble(b -> b.getRentPrice() != null ? b.getRentPrice() : 0).sum();
        dto.setTotalRevenueFromAssignedBuildings(revenue);

        // 5 customer mới nhất
        List<CustomerEntity> recentCustomers = assignCustomerRepo.findRecentCustomersByStaffId(staffId, PageRequest.of(0, 5));
        dto.setRecentCustomers(recentCustomers.stream().map(customerConverter::toDTO).collect(Collectors.toList()));

        // 5 giao dịch gần nhất
        List<TransactionEntity> recentTransactions = transactionRepo.findRecentTransactionsByStaffId(staffId, PageRequest.of(0, 5));
        dto.setRecentTransactions(recentTransactions.stream().map(transactionConverter::toDTO).collect(Collectors.toList()));

        return dto;
    }
}