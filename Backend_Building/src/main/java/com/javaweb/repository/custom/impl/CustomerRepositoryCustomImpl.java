package com.javaweb.repository.custom.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.javaweb.constant.CustomerApprovalStatus;
import com.javaweb.model.CustomerSearchDTO;
import com.javaweb.repository.custom.CustomerRepositoryCustom;
import com.javaweb.repository.entity.CustomerEntity;

@Repository
public class CustomerRepositoryCustomImpl implements CustomerRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CustomerEntity> searchForAdmin(CustomerSearchDTO searchDTO) {
        StringBuilder sql = buildAdminSearchSql(searchDTO);
        Query query = entityManager.createNativeQuery(sql.toString(), CustomerEntity.class);
        setCommonParams(query, searchDTO);
        setAdminParams(query, searchDTO);
        return query.getResultList();
    }

    @Override
    public List<CustomerEntity> searchForStaff(Integer staffId, CustomerSearchDTO searchDTO) {
        StringBuilder sql = buildStaffSearchSql(searchDTO);
        Query query = entityManager.createNativeQuery(sql.toString(), CustomerEntity.class);

        query.setParameter("staffId", staffId);
        setCommonParams(query, searchDTO);

        return query.getResultList();
    }

    // =========================================================
    // BUILD SQL - ADMIN
    // =========================================================
    private StringBuilder buildAdminSearchSql(CustomerSearchDTO searchDTO) {
        StringBuilder sql = new StringBuilder(
                "SELECT DISTINCT c.* FROM customer c " +
                "LEFT JOIN `transaction` t ON t.customer_id = c.id " +
                "LEFT JOIN assignmentcustomer ac ON ac.customer_id = c.id " +
                "LEFT JOIN `users` u ON u.id = ac.staff_id " +
                "WHERE 1 = 1 "
        );

        appendCommonConditions(sql, searchDTO);

        if (hasText(searchDTO.getApprovalStatus())) {
            sql.append(" AND c.approval_status = :approvalStatus ");
        }
        if (searchDTO.getStaffId() != null) {
            sql.append(" AND ac.staff_id = :staffId ");
        }
        if (hasText(searchDTO.getStaffName())) {
            sql.append(" AND LOWER(u.fullname) LIKE LOWER(CONCAT('%', :staffName, '%')) ");
        }

        return sql;
    }

    // =========================================================
    // BUILD SQL - STAFF
    // =========================================================
    private StringBuilder buildStaffSearchSql(CustomerSearchDTO searchDTO) {
        StringBuilder sql = new StringBuilder(
                "SELECT DISTINCT c.* FROM customer c " +
                "INNER JOIN assignmentcustomer ac ON ac.customer_id = c.id " +
                "LEFT JOIN `transaction` t ON t.customer_id = c.id " +
                "WHERE ac.staff_id = :staffId " +
                "AND c.approval_status = '" + CustomerApprovalStatus.APPROVED + "' "
        );

        appendCommonConditions(sql, searchDTO);
        return sql;
    }

    // =========================================================
    // COMMON CONDITIONS
    // =========================================================
    private void appendCommonConditions(StringBuilder sql, CustomerSearchDTO searchDTO) {
        if (hasText(searchDTO.getFullname())) {
            sql.append(" AND LOWER(c.fullname) LIKE LOWER(CONCAT('%', :fullname, '%')) ");
        }

        if (hasText(searchDTO.getPhone())) {
            sql.append(" AND c.phone LIKE CONCAT('%', :phone, '%') ");
        }

        if (searchDTO.getTransactionTypeId() != null) {
            sql.append(" AND t.transactiontype_id = :transactionTypeId ");
        }
    }

    // =========================================================
    // SET COMMON PARAMS
    // =========================================================
    private void setCommonParams(Query query, CustomerSearchDTO searchDTO) {
        if (hasText(searchDTO.getFullname())) {
            query.setParameter("fullname", searchDTO.getFullname());
        }

        if (hasText(searchDTO.getPhone())) {
            query.setParameter("phone", searchDTO.getPhone());
        }

        if (searchDTO.getTransactionTypeId() != null) {
            query.setParameter("transactionTypeId", searchDTO.getTransactionTypeId());
        }
    }

    // =========================================================
    // SET ADMIN PARAMS
    // =========================================================
    private void setAdminParams(Query query, CustomerSearchDTO searchDTO) {
        if (hasText(searchDTO.getApprovalStatus())) {
            query.setParameter("approvalStatus", searchDTO.getApprovalStatus());
        }

        if (searchDTO.getStaffId() != null) {
            query.setParameter("staffId", searchDTO.getStaffId());
        }

        if (hasText(searchDTO.getStaffName())) {
            query.setParameter("staffName", searchDTO.getStaffName());
        }
    }

    // =========================================================
    // HELPER
    // =========================================================
    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}