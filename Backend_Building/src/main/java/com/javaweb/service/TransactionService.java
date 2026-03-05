package com.javaweb.service;

import java.util.List;
import com.javaweb.model.TransactionDTO;

public interface TransactionService {
    void createTransactionForCurrentStaff(Integer customerId, TransactionDTO dto);
    List<TransactionDTO> getTransactionsForAdmin(Integer customerId);
    List<TransactionDTO> getTransactionsForCurrentStaff(Integer customerId);
}