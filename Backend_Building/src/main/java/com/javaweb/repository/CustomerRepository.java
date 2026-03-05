package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaweb.repository.entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer> {

    @Query(value = "SELECT DISTINCT c.* " +
            "FROM customer c " +
            "LEFT JOIN `transaction` t ON t.customer_id = c.id " +
            "WHERE (:fullname IS NULL OR :fullname = '' OR LOWER(c.fullname) LIKE LOWER(CONCAT('%', :fullname, '%'))) "
            +
            "AND (:phone IS NULL OR :phone = '' OR c.phone LIKE CONCAT('%', :phone, '%')) " +
            "AND (:transactionTypeId IS NULL OR t.transactiontype_id = :transactionTypeId)", nativeQuery = true)
    List<CustomerEntity> searchCustomers(
            @Param("fullname") String fullname,
            @Param("phone") String phone,
            @Param("transactionTypeId") Integer transactionTypeId);

// ✅ staff xem các customer được giao
    @Query(value =
            "SELECT DISTINCT c.* " +
            "FROM customer c " +
            "INNER JOIN assignmentcustomer ac ON ac.customer_id = c.id " +
            "WHERE ac.staff_id = :staffId",
            nativeQuery = true)
    List<CustomerEntity> findCustomersByStaffId(@Param("staffId") Integer staffId);
}