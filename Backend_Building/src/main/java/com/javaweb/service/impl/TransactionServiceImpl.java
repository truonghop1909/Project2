package com.javaweb.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.model.TransactionDTO;
import com.javaweb.repository.TransactionRepository;
import com.javaweb.repository.TransactionTypeRepository;
import com.javaweb.repository.entity.TransactionEntity;
import com.javaweb.repository.entity.TransactionTypeEntity;
import com.javaweb.service.AssignmentCustomerService;
import com.javaweb.service.TransactionService;
import com.javaweb.utils.SecurityUtils;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @Autowired
    private AssignmentCustomerService assignmentCustomerService;

    @Override
    public void createTransactionForCurrentStaff(Integer customerId, TransactionDTO dto) {

        Integer staffId = SecurityUtils.getCurrentUserId();

        if (!assignmentCustomerService.staffCanAccess(customerId, staffId)) {
            throw new RuntimeException("Bạn không được thao tác với khách hàng này");
        }

        if (dto.getTransactiontypeId() == null) {
            throw new RuntimeException("transactiontypeId is required");
        }

        TransactionTypeEntity type = transactionTypeRepository
                .findById(dto.getTransactiontypeId())
                .orElseThrow(() -> new RuntimeException("Transaction type not found"));

        TransactionEntity e = new TransactionEntity();
        e.setCustomerId(customerId);
        e.setStaffId(staffId);
        e.setTransactionType(type); // ✅ set relation
        e.setNote(dto.getNote());
        e.setDate(dto.getDate() != null ? dto.getDate() : new Date());

        transactionRepository.save(e);
    }

    @Override
    public List<TransactionDTO> getTransactionsForAdmin(Integer customerId) {
        return transactionRepository.findDTOForAdmin(customerId);
    }

    @Override
    public List<TransactionDTO> getTransactionsForCurrentStaff(Integer customerId) {

        Integer staffId = SecurityUtils.getCurrentUserId();

        if (!assignmentCustomerService.staffCanAccess(customerId, staffId)) {
            throw new RuntimeException("Bạn không được xem khách hàng này");
        }

        return transactionRepository.findDTOForStaff(customerId, staffId);
    }
}