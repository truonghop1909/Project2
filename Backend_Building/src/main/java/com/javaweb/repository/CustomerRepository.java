package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.javaweb.constant.CustomerApprovalStatus;
import com.javaweb.repository.custom.CustomerRepositoryCustom;
import com.javaweb.repository.entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer>, CustomerRepositoryCustom {

        /**
         * =========================================================
         * STAFF: Lấy danh sách customer đã được duyệt mà staff được assign
         * =========================================================
         */
        @Query(value = "SELECT DISTINCT c.* " +
                        "FROM customer c " +
                        "INNER JOIN assignmentcustomer ac ON ac.customer_id = c.id " +
                        "WHERE ac.staff_id = :staffId " +
                        "AND c.approval_status = '" + CustomerApprovalStatus.APPROVED + "'", nativeQuery = true)
        List<CustomerEntity> findApprovedCustomersByStaffId(@Param("staffId") Integer staffId);

        /**
         * =========================================================
         * STAFF: Tìm tất cả customer đã APPROVED
         * =========================================================
         * Có thể lọc theo:
         * - fullname
         * - phone
         * - transactionTypeId
         */
        @Query(value = "SELECT DISTINCT c.* " +
                        "FROM customer c " +
                        "LEFT JOIN `transaction` t ON t.customer_id = c.id " +
                        "WHERE c.approval_status = '" + CustomerApprovalStatus.APPROVED + "' " +
                        "AND (:fullname IS NULL OR :fullname = '' OR LOWER(c.fullname) LIKE LOWER(CONCAT('%', :fullname, '%'))) " +
                        "AND (:phone IS NULL OR :phone = '' OR c.phone LIKE CONCAT('%', :phone, '%')) " +
                        "AND (:transactionTypeId IS NULL OR t.transactiontype_id = :transactionTypeId)",
                        nativeQuery = true)
        List<CustomerEntity> searchApprovedCustomersForStaff(
                        @Param("fullname") String fullname,
                        @Param("phone") String phone,
                        @Param("transactionTypeId") Integer transactionTypeId);

        /**
         * =========================================================
         * ADMIN: Lấy danh sách customer theo trạng thái duyệt
         * =========================================================
         */
        @Query(value = "SELECT * FROM customer WHERE approval_status = :approvalStatus", nativeQuery = true)
        List<CustomerEntity> findByApprovalStatus(@Param("approvalStatus") String approvalStatus);

        /**
         * =========================================================
         * ADMIN: Duyệt hoặc từ chối customer
         * =========================================================
         */
        @Modifying
        @Query(value = "UPDATE customer " +
                        "SET approval_status = :approvalStatus, approved_at = NOW(), approved_by = :approvedBy " +
                        "WHERE id = :customerId", nativeQuery = true)
        void approveCustomer(@Param("customerId") Integer customerId,
                        @Param("approvalStatus") String approvalStatus,
                        @Param("approvedBy") Integer approvedBy);

        /**
         * =========================================================
         * CHECK: Kiểm tra customer có tồn tại và đã được duyệt chưa
         * =========================================================
         */
        boolean existsByIdAndApprovalStatus(Integer id, String approvalStatus);
}