package com.javaweb.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
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

        // ================= STATISTICS METHODS (Native Query) =================

        @Query(value = "SELECT COUNT(*) FROM `transaction`", nativeQuery = true)
        Long countTotalTransactions();

        @Query(value = "SELECT DATE_FORMAT(date, '%Y-%m') as month, COUNT(*) " +
                        "FROM `transaction` GROUP BY month ORDER BY month DESC", nativeQuery = true)
        List<Object[]> countTransactionsByMonth();

        @Query(value = "SELECT tt.name, COUNT(t.id) " +
                        "FROM `transaction` t JOIN transactiontype tt ON t.transactiontype_id = tt.id " +
                        "GROUP BY tt.id", nativeQuery = true)
        List<Object[]> countTransactionsByType();

        // Lấy danh sách giao dịch của staff, sắp xếp mới nhất
        @Query("SELECT t FROM TransactionEntity t WHERE t.staff.id = :staffId ORDER BY t.date DESC")
        List<TransactionEntity> findRecentTransactionsByStaffId(@Param("staffId") Integer staffId, Pageable pageable);

        // Đếm tổng số giao dịch của staff
        Long countByStaffId(Integer staffId);

        @Query(value = "SELECT u.id, u.fullname, COUNT(t.id) as trans_count " +
                        "FROM users u " +
                        "JOIN `transaction` t ON u.id = t.staff_id " +
                        "GROUP BY u.id ORDER BY trans_count DESC LIMIT 5", nativeQuery = true)
        List<Object[]> findTop5StaffByTransactionCount();
}