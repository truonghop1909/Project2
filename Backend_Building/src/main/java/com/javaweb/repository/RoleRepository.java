package com.javaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.repository.entity.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {

    RoleEntity findByCode(String code);
}
