package com.javaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaweb.repository.entity.RentTypeEntity;


public interface RentTypeRepository extends JpaRepository<RentTypeEntity, Integer> {

    @Query("SELECT r.id FROM RentTypeEntity r WHERE r.code = ?1")
    Integer findIdByCode(String code);
}
