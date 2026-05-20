package com.javaweb.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import com.javaweb.repository.entity.AssignmentCustomerEntity;
import com.javaweb.repository.entity.UserEntity;

public interface AssignmentCustomerRepository extends JpaRepository<AssignmentCustomerEntity, Integer> {

    // =========================================================
    // 1. LẤY DANH SÁCH STAFF ID ĐANG ĐƯỢC ASSIGN CHO CUSTOMER
    // =========================================================
    @Query("SELECT a.staff.id FROM AssignmentCustomerEntity a WHERE a.customer.id = :customerId")
    List<Integer> findStaffIdsByCustomerId(@Param("customerId") Integer customerId);

    // =========================================================
    // 2. LẤY DANH SÁCH STAFF ENTITY ĐANG ĐƯỢC ASSIGN CHO CUSTOMER
    // (Có thể dùng để lấy thêm thông tin staff)
    // =========================================================
    @Query("SELECT a.staff FROM AssignmentCustomerEntity a WHERE a.customer.id = :customerId")
    List<UserEntity> findStaffsByCustomerId(@Param("customerId") Integer customerId);

    // =========================================================
    // 3. XÓA TOÀN BỘ STAFF ĐANG ĐƯỢC ASSIGN CHO CUSTOMER
    // =========================================================
    @Modifying
    @Transactional
    @Query("DELETE FROM AssignmentCustomerEntity a WHERE a.customer.id = :customerId")
    void deleteByCustomerId(@Param("customerId") Integer customerId);

    // =========================================================
    // 4. THÊM MỘT ASSIGNMENT MỚI (Cần có sẵn Customer và Staff trong DB)
    // =========================================================
    // Cách này dùng method naming convention (tự động JPA implement)
    // Không cần @Query, chỉ cần method name đúng chuẩn
    AssignmentCustomerEntity save(AssignmentCustomerEntity entity);
    
    // Hoặc dùng JPQL insert (nhưng JPA ko hỗ trợ INSERT JPQL, nên dùng save)

    // =========================================================
    // 5. KIỂM TRA CUSTOMER ĐÃ ĐƯỢC ASSIGN CHO STAFF CHƯA
    // =========================================================
    boolean existsByCustomerIdAndStaffId(Integer customerId, Integer staffId);
    
    // Hoặc nếu muốn đếm số lượng:
    long countByCustomerIdAndStaffId(Integer customerId, Integer staffId);

    // =========================================================
    // 6. XÓA MỘT ASSIGNMENT CỤ THỂ
    // =========================================================
    @Modifying
    @Transactional
    @Query("DELETE FROM AssignmentCustomerEntity a WHERE a.customer.id = :customerId AND a.staff.id = :staffId")
    void deleteByCustomerIdAndStaffId(@Param("customerId") Integer customerId,
                                      @Param("staffId") Integer staffId);

    // =========================================================
    // 7. LẤY DANH SÁCH CUSTOMER ID ĐANG ĐƯỢC ASSIGN CHO STAFF
    // (Thường dùng để hiển thị danh sách khách hàng của 1 nhân viên)
    // =========================================================
    @Query("SELECT a.customer.id FROM AssignmentCustomerEntity a WHERE a.staff.id = :staffId")
    List<Integer> findCustomerIdsByStaffId(@Param("staffId") Integer staffId);
}