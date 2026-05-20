package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaweb.model.TransactionDTO;
import com.javaweb.repository.entity.TransactionEntity;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Integer> {

    @Query("select new com.javaweb.model.TransactionDTO(" +
            "t.id, " +
            "t.customer.id, " +
            "tt.id, " +
            "tt.name, " +
            "t.customer.fullname, " +
            "t.customer.phone, " +
            "t.note, " +
            "t.date, " +
            "t.staff.id, " + // ✅ thêm
            "t.staff.fullname) " + // ✅ thêm (hoặc username tùy entity)
            "from TransactionEntity t " +
            "join t.transactionType tt " +
            "where t.customer.id = :customerId " +
            "order by t.date desc")
    List<TransactionDTO> findDTOForAdmin(@Param("customerId") Integer customerId);

    @Query("select new com.javaweb.model.TransactionDTO(" +
            "t.id, " +
            "t.customer.id, " +
            "tt.id, " +
            "tt.name, " +
            "t.customer.fullname, " +
            "t.customer.phone, " +
            "t.note, " +
            "t.date, " +
            "t.staff.id, " +
            "t.staff.fullname) " +
            "from TransactionEntity t " +
            "join t.transactionType tt " +
            "where t.customer.id = :customerId " +
            "and t.staff.id = :staffId " + // ✅ fix
            "order by t.date desc")
    List<TransactionDTO> findDTOForStaff(@Param("customerId") Integer customerId,
            @Param("staffId") Integer staffId);
}