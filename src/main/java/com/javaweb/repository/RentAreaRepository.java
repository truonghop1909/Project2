package com.javaweb.repository;

import java.util.List;

import com.javaweb.repository.entity.RentAreaEntiry;

public interface RentAreaRepository {
	List<RentAreaEntiry> getValueByBuildingId(Integer id);
}
