package com.javaweb.api.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.TransactionDTO;
import com.javaweb.service.TransactionService;

@RestController
@RequestMapping("/api/customer")
public class TransactionAPI {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/{customerId}/transactions")
    public void create(@PathVariable Integer customerId, @RequestBody TransactionDTO dto) {
        transactionService.createTransactionForCurrentStaff(customerId, dto);
    }

    // Admin xem hết (nếu bạn phân quyền bằng @PreAuthorize thì tách endpoint admin riêng)
    @GetMapping("/{customerId}/transactions/admin")
    public List<TransactionDTO> getForAdmin(@PathVariable Integer customerId) {
        return transactionService.getTransactionsForAdmin(customerId);
    }

    // Staff xem của mình
    @GetMapping("/{customerId}/transactions")
    public List<TransactionDTO> getForStaff(@PathVariable Integer customerId) {
        return transactionService.getTransactionsForCurrentStaff(customerId);
    }
}