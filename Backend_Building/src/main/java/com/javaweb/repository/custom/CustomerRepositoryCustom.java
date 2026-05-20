package com.javaweb.repository.custom;

import java.util.List;

import com.javaweb.model.CustomerSearchDTO;
import com.javaweb.repository.entity.CustomerEntity;

public interface CustomerRepositoryCustom {
    List<CustomerEntity> searchForAdmin(CustomerSearchDTO searchDTO);
    List<CustomerEntity> searchForStaff(Integer staffId, CustomerSearchDTO searchDTO);
}