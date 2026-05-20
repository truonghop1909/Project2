package com.javaweb.converter;

import org.springframework.stereotype.Component;

import com.javaweb.model.TransactionDTO;
import com.javaweb.repository.entity.TransactionEntity;

@Component
public class TransactionConverter {

    public TransactionDTO toDTO(TransactionEntity entity) {
    TransactionDTO dto = new TransactionDTO();

    dto.setId(entity.getId());
    dto.setNote(entity.getNote());
    dto.setDate(entity.getDate());

    /* ===== CUSTOMER ===== */
    if (entity.getCustomer() != null) {
        dto.setCustomerId(entity.getCustomer().getId());
        dto.setCustomerName(entity.getCustomer().getFullname()); // nếu DTO có
    }

    /* ===== STAFF ===== */
    if (entity.getStaff() != null) {
        dto.setStaffId(entity.getStaff().getId());
        dto.setStaffName(entity.getStaff().getUsername()); // nếu DTO có
    }

    /* ===== TRANSACTION TYPE ===== */
    if (entity.getTransactionType() != null) {
        dto.setTransactiontypeId(entity.getTransactionType().getId());
        dto.setTransactionTypeName(entity.getTransactionType().getName());
    }

    return dto;
}
}