package com.javaweb.repository.impl;

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
import com.javaweb.model.BuildingDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.entity.BuildingEntity;

@Repository

public class BuildingRepositoryImpl implements BuildingRepository{
	
	public static void joinTable(Map<String, Object> params, List<String> typeCode, StringBuilder sql) {
		String staffId = (String)params.get("staffId");
		if(StringUtil.checkString(staffId)) {
			sql.append(" INNER JOIN assignmentbuilding asb ON b.id = asb.building_id ");
		}
		if(typeCode != null || typeCode.size() != 0) {
			sql.append(" INNER JOIN buildingrenttype brt ON b.id = brt.building_id ");
			sql.append(" INNER JOIN renttype rt ON rt.id = brt.renttype_id ");
		}
		String rentAreaTo = (String)params.get("areaTo");
		String rentAreaFrom = (String)params.get("areaFrom");
		if(StringUtil.checkString(rentAreaTo) == true || StringUtil.checkString(rentAreaFrom) == true) {
			sql.append(" INNER JOIN rentarea ra ON b.id = ra.building_id ");
		}
	}
	
	public static void queryNormal(Map<String, Object> params, StringBuilder where) {
		for(Map.Entry<String, Object> item : params.entrySet()) {
			if(!item.getKey().equals("staffId") && !item.getKey().equals("typeCode") &&
				!item.getKey().startsWith("area") && !item.getKey().startsWith("rentPrice")) {
				String value = item.getValue().toString();
				if(StringUtil.checkString(value)) {
					if(NumberUtil.isNumber(value) == true) {
						where.append(" AND b. " + item.getKey() + " = " + value);
					} else {
						where.append(" AND b. " + item.getKey() + " LIKE '%" + value + "%' ");
					}
				}
			}
		}
	}
	
	public static void querySpecial(Map<String, Object> params, List<String> typeCode, StringBuilder where) {
		String staffId = (String)params.get("staffId");
		if(StringUtil.checkString(staffId)) {
			where.append(" AND asb.staff_id = " + staffId);
		}
		String rentAreaTo = (String)params.get("areaTo");
		String rentAreaFrom = (String)params.get("areaFrom");
		if(StringUtil.checkString(rentAreaTo) == true || StringUtil.checkString(rentAreaFrom) == true) {
			if(StringUtil.checkString(rentAreaFrom)) {
				where.append(" AND ra.value >= " + rentAreaFrom);
			}
			if(StringUtil.checkString(rentAreaTo)) {
				where.append(" AND ra.value <= " + rentAreaTo);
			}
		}
		String rentPriceTo = (String)params.get("rentPriceTo");
		String rentPriceFrom = (String)params.get("rentPriceFrom");
		if(StringUtil.checkString(rentPriceTo) == true || StringUtil.checkString(rentPriceFrom) == true) {
			if(StringUtil.checkString(rentPriceFrom)) {
				where.append(" AND b.rent_price >= " + rentPriceFrom);
			}
			if(StringUtil.checkString(rentPriceTo)) {
				where.append(" AND b.rent_price <= " + rentPriceTo);
			}
		}
		if(typeCode != null && !typeCode.isEmpty()) {
			where.append(" AND rt.code IN ('" + String.join("','", typeCode) + "') ");
		}
	}
	@Override
	public List<BuildingEntity> findAll(Map<String, Object> params, List<String> typeCode) {
		StringBuilder sql = new StringBuilder(" SELECT b.id, b.name, b.district_id, " + 
				" b.street, b.ward, b.number_of_basement, " +
				" b.floor_area, b.rent_price, service_fee, b.brokerage_fee, " + 
				" b.manager_phone, b.manager_name " +
				" FROM building b ");
		joinTable(params, typeCode, sql);
		StringBuilder where = new StringBuilder(" WHERE 1 = 1 ");
		queryNormal(params, where);
		querySpecial(params, typeCode, where);
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
