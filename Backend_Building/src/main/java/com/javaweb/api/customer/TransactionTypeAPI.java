package com.javaweb.api.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.TransactionTypeDTO;
import com.javaweb.repository.TransactionTypeRepository;

@RestController
@RequestMapping("/api/transaction-types")
public class TransactionTypeAPI {

    @Autowired
    private TransactionTypeRepository transactionTypeRepository;

    @GetMapping
    public List<TransactionTypeDTO> getAll() {
        return transactionTypeRepository.findAll().stream()
                .map(t -> new TransactionTypeDTO(t.getId(), t.getName()))
                .collect(Collectors.toList());
    }
}