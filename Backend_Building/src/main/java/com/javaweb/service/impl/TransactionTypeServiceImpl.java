package com.javaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.model.TransactionTypeDTO;
import com.javaweb.repository.TransactionTypeRepository;
import com.javaweb.service.TransactionTypeService;

@Service
public class TransactionTypeServiceImpl implements TransactionTypeService {

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @Override
    public List<TransactionTypeDTO> findAll() {
        return transactionTypeRepository.findAll().stream()
                .map(t -> {
                    TransactionTypeDTO dto = new TransactionTypeDTO();
                    dto.setId(t.getId());
                    dto.setName(t.getName());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
