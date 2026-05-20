package com.javaweb.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.TransactionTypeDTO;
import com.javaweb.service.TransactionTypeService;

@RestController
@RequestMapping("/api/transaction-types")
public class TransactionTypeAPI {

    @Autowired
    private TransactionTypeService transactionTypeService;

    @GetMapping
    public List<TransactionTypeDTO> getAll() {
        return transactionTypeService.findAll();
    }
}