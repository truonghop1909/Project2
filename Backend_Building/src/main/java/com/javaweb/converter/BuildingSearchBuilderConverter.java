package com.javaweb.converter;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.javaweb.Utils.MapUtil;
import com.javaweb.builder.BuildingSearchBuilder;

@Component
public class BuildingSearchBuilderConverter {

    public BuildingSearchBuilder toBuildingSearchBuilder(Map<String, Object> params,
                                                         List<String> rentTypes) {

        return new BuildingSearchBuilder.Builder()
                // search fields
                .setName(MapUtil.getObject(params, "name", String.class))
                .setDistrict(MapUtil.getObject(params, "district", String.class))
                .setWard(MapUtil.getObject(params, "ward", String.class))
                .setStreet(MapUtil.getObject(params, "street", String.class))
                .setNumberOfBasement(MapUtil.getObject(params, "numberOfBasement", Integer.class))

                .setFloorAreaFrom(MapUtil.getObject(params, "floorAreaFrom", Double.class))
                .setFloorAreaTo(MapUtil.getObject(params, "floorAreaTo", Double.class))

                .setDirection(MapUtil.getObject(params, "direction", String.class))
                .setLevel(MapUtil.getObject(params, "level", String.class))

                .setRentPriceFrom(MapUtil.getObject(params, "rentPriceFrom", Double.class))
                .setRentPriceTo(MapUtil.getObject(params, "rentPriceTo", Double.class))

                .setRentAreaFrom(MapUtil.getObject(params, "rentAreaFrom", Integer.class))
                .setRentAreaTo(MapUtil.getObject(params, "rentAreaTo", Integer.class))

                .setStaffId(MapUtil.getObject(params, "staffId", Integer.class))
                .setRentTypes(rentTypes)

                // 👉 pagination & sort (BỔ SUNG)
                .setPage(MapUtil.getObject(params, "page", Integer.class))
                .setSize(MapUtil.getObject(params, "size", Integer.class))
                .setSortBy(MapUtil.getObject(params, "sortBy", String.class))
                .setSortDirection(MapUtil.getObject(params, "sortDirection", String.class))

                .build();
    }
}
