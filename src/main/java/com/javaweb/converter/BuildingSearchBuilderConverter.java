package com.javaweb.converter;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.javaweb.Utils.MapUtil;
import com.javaweb.builder.BuildingSearchBuilder;
@Component
public class BuildingSearchBuilderConverter {
	public BuildingSearchBuilder toBuildingSearchBuilder(Map<String, Object> params, List<String> typeCode) {
		BuildingSearchBuilder buildingSearchBuilder = new BuildingSearchBuilder.Builder()
										.setName(MapUtil.getObject(params, "name", String.class))
										.setFloorArea(MapUtil.getObject(params, "floorArea", Double.class))
										.setWard(MapUtil.getObject(params, "ward", String.class))
										.setAreaFrom(MapUtil.getObject(params, "areaFrom", Integer.class))
										.setAreaTo(MapUtil.getObject(params, "areaTo", Integer.class))
										.setDirection(MapUtil.getObject(params, "direction", String.class))
										.setDistrictId(MapUtil.getObject(params, "districtId", Integer.class))
										.setLevel(MapUtil.getObject(params, "level", String.class))
										.setRentPriceTo(MapUtil.getObject(params, "rentPriceTo", Double.class))
										.setRentPriceFrom(MapUtil.getObject(params, "rentPriceFrom", Double.class))
										.setStaffId(MapUtil.getObject(params, "staffId", Integer.class))
										.setStreet(MapUtil.getObject(params, "street", String.class))			
										.setNumberOfBasement(MapUtil.getObject(params, "numberOfBasement", Integer.class))
										.setTypeCode(typeCode)
										.build();
		 return buildingSearchBuilder;
	}
}
