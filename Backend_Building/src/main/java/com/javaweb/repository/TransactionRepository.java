package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaweb.model.TransactionDTO;
import com.javaweb.repository.entity.TransactionEntity;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer> {

    @Query(
        "select new com.javaweb.model.TransactionDTO(" +
        "t.id, " +
        "t.customerId, " +
        "tt.id, " +
        "tt.name, " +
        "c.fullname, " +
        "c.phone, " +
        "t.note, " +
        "t.date) " +
        "from TransactionEntity t " +
        "join t.transactionType tt " +
        "join CustomerEntity c on c.id = t.customerId " +
        "where t.customerId = :customerId " +
        "order by t.date desc"
    )
    List<TransactionDTO> findDTOForAdmin(@Param("customerId") Integer customerId);

    @Query(
        "select new com.javaweb.model.TransactionDTO(" +
        "t.id, " +
        "t.customerId, " +
        "tt.id, " +
        "tt.name, " +
        "c.fullname, " +
        "c.phone, " +
        "t.note, " +
        "t.date) " +
        "from TransactionEntity t " +
        "join t.transactionType tt " +
        "join CustomerEntity c on c.id = t.customerId " +
        "where t.customerId = :customerId " +
        "and t.staffId = :staffId " +          // ✅ thêm điều kiện này
        "order by t.date desc"
    )
    List<TransactionDTO> findDTOForStaff(@Param("customerId") Integer customerId,
                                         @Param("staffId") Integer staffId);
}