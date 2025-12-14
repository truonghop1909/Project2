package com.javaweb.repository.impl;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.javaweb.Utils.ConnectionJDBCUtil;
import com.javaweb.Utils.NumberUtil;
import com.javaweb.Utils.StringUtil;
import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.entity.BuildingEntity;

@Repository

public class BuildingRepositoryImpl implements BuildingRepository{
	
	public static void joinTable(BuildingSearchBuilder buildingSearchBuilder, StringBuilder sql) {
		Integer staffId = buildingSearchBuilder.getStaffId();
		if(staffId != null) {
			sql.append(" INNER JOIN assignmentbuilding asb ON b.id = asb.building_id ");
		}
		List<String> typeCode = buildingSearchBuilder.getTypeCode();
		if(typeCode != null || typeCode.size() != 0) {
			sql.append(" INNER JOIN buildingrenttype brt ON b.id = brt.building_id ");
			sql.append(" INNER JOIN renttype rt ON rt.id = brt.renttype_id ");
		}
		Integer rentAreaTo = buildingSearchBuilder.getAreaTo();
		Integer rentAreaFrom = buildingSearchBuilder.getAreaFrom();
		if(rentAreaFrom != null || rentAreaTo != null) {
			sql.append(" INNER JOIN rentarea ra ON b.id = ra.building_id ");
		}
	}
	
	public static void queryNormal(BuildingSearchBuilder buildingSearchBuilder, StringBuilder where) {
		try {
			Field[] fields = BuildingSearchBuilder.class.getDeclaredFields();
			for(Field item : fields) {
				item.setAccessible(true);
				String fieldName = item.getName();
				if(!fieldName.equals("staffId") && !fieldName.equals("typeCode") &&
					!fieldName.startsWith("area") && !fieldName.startsWith("rentPrice")) {
					Object value = item.get(buildingSearchBuilder);
					if(value != null) {
						if(item.getType().getName().equals("java.lang.Long") || item.getType().getName().equals("java.lang.Integer") || item.getType().getName().equals("java.lang.Double")) {
							where.append(" AND b. " + fieldName + " = " + value);
						} else if (item.getType().getName().equals("java.lang.String")){
							where.append(" AND b. " + fieldName + " LIKE '%" + value + "%' ");
						}
					}
				}
				
			}
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
	}
	
	public static void querySpecial(BuildingSearchBuilder buildingSearchBuilder, StringBuilder where) {
		Integer staffId = buildingSearchBuilder.getStaffId();
		if(staffId != null) {
			where.append(" AND asb.staff_id = " + staffId);
		}
		Integer rentAreaTo = buildingSearchBuilder.getAreaTo();
		Integer rentAreaFrom = buildingSearchBuilder.getAreaFrom();
		if(rentAreaTo != null || rentAreaFrom != null) {
			if(rentAreaFrom != null) {
				where.append(" AND ra.value >= " + rentAreaFrom);
			}
			if(rentAreaTo != null) {
				where.append(" AND ra.value <= " + rentAreaTo);
			}
		}
		Double rentPriceTo = buildingSearchBuilder.getRentPriceTo();
		Double rentPriceFrom = buildingSearchBuilder.getRentPriceFrom();
		if(rentPriceFrom != null || rentPriceTo != null) {
			if(rentPriceFrom != null) {
				where.append(" AND b.rent_price >= " + rentPriceFrom);
			}
			if(rentPriceTo != null) {
				where.append(" AND b.rent_price <= " + rentPriceTo);
			}
		}
		List<String> typeCode = buildingSearchBuilder.getTypeCode();
		if(typeCode != null || typeCode.size() != 0) {
			where.append(" AND rt.code IN ('" + String.join("','", typeCode) + "') ");
		}
	}
	@Override
	public List<BuildingEntity> findAll(BuildingSearchBuilder buildingSearchBuilder) {
		StringBuilder sql = new StringBuilder(" SELECT b.id, b.name, b.district_id, " + 
				" b.street, b.ward, b.number_of_basement, " +
				" b.floor_area, b.rent_price, service_fee, b.brokerage_fee, " + 
				" b.manager_phone, b.manager_name " +
				" FROM building b ");
		joinTable(buildingSearchBuilder, sql);
		StringBuilder where = new StringBuilder(" WHERE 1 = 1 ");
		queryNormal(buildingSearchBuilder, where);
		querySpecial(buildingSearchBuilder, where);
		where.append(" GROUP BY b.id; ");
		sql.append(where);
		System.out.print("SQL: " + sql);
		List<BuildingEntity> result = new ArrayList<>();
	try(Connection conn = ConnectionJDBCUtil.getConnection(); 
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql.toString());){
		while(rs.next()) {
			BuildingEntity building = new BuildingEntity();
			building.setId(rs.getInt("id"));
			building.setName(rs.getString("name"));
			building.setStreet(rs.getString("street"));
			building.setDistrictId(rs.getInt("district_id"));
			building.setWard(rs.getString("ward"));
			building.setNumberOfBasement(rs.getInt("number_of_basement"));
            building.setFloorArea(rs.getDouble("floor_area"));
            building.setRentPrice(rs.getDouble("rent_price"));
            building.setServiceFee(rs.getDouble("service_fee"));
            building.setBrokerageFee(rs.getDouble("brokerage_fee"));
            building.setManagerName(rs.getString("manager_name"));
            building.setManagerPhone(rs.getString("manager_phone"));
			result.add(building);
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
		return result;
	}

	@Override
	public void DeleteById(long id) {
		// TODO Auto-generated method stub
		
	}
}
