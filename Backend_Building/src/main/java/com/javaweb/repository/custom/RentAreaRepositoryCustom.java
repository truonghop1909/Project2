package com.javaweb.repository.custom;

import java.util.List;

import com.javaweb.repository.entity.RentAreaEntity;

public interface RentAreaRepositoryCustom {
    List<RentAreaEntity> getValueByBuildingId(Integer id);
}
