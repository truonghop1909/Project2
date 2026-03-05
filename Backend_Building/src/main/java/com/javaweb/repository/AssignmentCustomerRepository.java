package com.javaweb.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.repository.entity.AssignmentCustomerEntity;
import com.javaweb.repository.entity.AssignmentCustomerId;

public interface AssignmentCustomerRepository extends JpaRepository<AssignmentCustomerEntity, AssignmentCustomerId> {

    @Query(value = "SELECT staff_id FROM assignmentcustomer WHERE customer_id = :customerId", nativeQuery = true)
    List<Integer> findStaffIdsByCustomerId(@Param("customerId") Integer customerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM assignmentcustomer WHERE customer_id = :customerId", nativeQuery = true)
    void deleteByCustomerId(@Param("customerId") Integer customerId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO assignmentcustomer(customer_id, staff_id) VALUES(:customerId, :staffId)", nativeQuery = true)
    void insert(@Param("customerId") Integer customerId, @Param("staffId") Integer staffId);

    @Query(value =
        "SELECT COUNT(*) FROM assignmentcustomer WHERE customer_id = :customerId AND staff_id = :staffId",
        nativeQuery = true)
    Integer countByCustomerIdAndStaffId(@Param("customerId") Integer customerId, @Param("staffId") Integer staffId);

    @Modifying
    @Transactional
    @Query(value =
        "DELETE FROM assignmentcustomer WHERE customer_id = :customerId AND staff_id = :staffId",
        nativeQuery = true)
    void deleteByCustomerIdAndStaffId(@Param("customerId") Integer customerId, @Param("staffId") Integer staffId);
}