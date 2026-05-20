package com.javaweb.converter;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.utils.MapUtil;

@Component
public class BuildingSearchBuilderConverter {

    public BuildingSearchBuilder toBuildingSearchBuilder(Map<String, Object> params,
                                                         List<String> rentTypes) {

        BuildingSearchBuilder.Builder builder = BuildingSearchBuilder.builder();
        
        // ========== THÔNG TIN CƠ BẢN ==========
        builder.name(MapUtil.getObject(params, "name", String.class));
        builder.street(MapUtil.getObject(params, "street", String.class));
        builder.numberOfBasement(MapUtil.getObject(params, "numberOfBasement", Integer.class));
        
        // ========== ĐỊA CHỈ MỚI ==========
        builder.provinceId(MapUtil.getObject(params, "provinceId", String.class));
        builder.provinceName(MapUtil.getObject(params, "provinceName", String.class));
        builder.wardCode(MapUtil.getObject(params, "wardCode", String.class));
        builder.wardName(MapUtil.getObject(params, "wardName", String.class));
        
        // ========== THÔNG TIN TÒA NHÀ ==========
        builder.direction(MapUtil.getObject(params, "direction", String.class));
        builder.level(MapUtil.getObject(params, "level", String.class));
        
        // ========== DIỆN TÍCH ==========
        builder.floorAreaFrom(MapUtil.getObject(params, "floorAreaFrom", Double.class));
        builder.floorAreaTo(MapUtil.getObject(params, "floorAreaTo", Double.class));
        
        // ========== DIỆN TÍCH CHO THUÊ ==========
        builder.rentAreaFrom(MapUtil.getObject(params, "rentAreaFrom", Double.class));
        builder.rentAreaTo(MapUtil.getObject(params, "rentAreaTo", Double.class));
        
        // ========== GIÁ THUÊ ==========
        builder.rentPriceFrom(MapUtil.getObject(params, "rentPriceFrom", Double.class));
        builder.rentPriceTo(MapUtil.getObject(params, "rentPriceTo", Double.class));
        
        // ========== NHÂN VIÊN QUẢN LÝ ==========
        builder.staffId(MapUtil.getObject(params, "staffId", Integer.class));
        
        // ========== LOẠI HÌNH THUÊ ==========
        builder.rentTypes(rentTypes);
        
        // ========== PAGINATION & SORT ==========
        builder.page(MapUtil.getObject(params, "page", Integer.class));
        builder.size(MapUtil.getObject(params, "size", Integer.class));
        builder.sortBy(MapUtil.getObject(params, "sortBy", String.class));
        builder.sortDirection(MapUtil.getObject(params, "sortDirection", String.class));
        
        return builder.build();
    }
}