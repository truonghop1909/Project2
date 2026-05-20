package com.javaweb.service;

import java.util.List;

import com.javaweb.model.TransactionTypeDTO;

public interface TransactionTypeService {
    List<TransactionTypeDTO> findAll();
}
