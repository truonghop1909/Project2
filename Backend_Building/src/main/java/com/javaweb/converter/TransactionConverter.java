package com.javaweb.converter;

import org.springframework.stereotype.Component;

import com.javaweb.model.TransactionDTO;
import com.javaweb.repository.entity.TransactionEntity;

@Component
public class TransactionConverter {

    public TransactionDTO toDTO(TransactionEntity entity) {
        TransactionDTO dto = new TransactionDTO();

        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setNote(entity.getNote());
        dto.setDate(entity.getDate());

        if (entity.getTransactionType() != null) {
            dto.setTransactiontypeId(entity.getTransactionType().getId());
            dto.setTransactionTypeName(entity.getTransactionType().getName());
        }

        return dto;
    }
}