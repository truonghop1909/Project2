package com.javaweb.repository.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.javaweb.model.BuildingDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.entity.BuildingEntity;

@Repository

public class BuildingRepositoryImpl implements BuildingRepository{
	static final String DB_URL = "jdbc:mysql://localhost: 3306/building_database";
	static final String USER = "root";
	static final String PASS = "H@p5643221";
	
	@Override
	public List<BuildingEntity> findAll(String name, String district) {
		StringBuilder sql = new StringBuilder("SELECT * FROM building b Where 1 = 1 ");
		if(name != null && !name.equals("")) {
			sql.append("AND b.name like '%" + name + "%' ");
		}
		if(district != null && !district.equals("")) {
			sql.append("AND b.district like '%" + district + "%' ");
		}
		List<BuildingEntity> result = new ArrayList<>();
	try(Connection conn = DriverManager.getConnection(DB_URL, USER, PASS); 
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql.toString());){
		while(rs.next()) {
			BuildingEntity building = new BuildingEntity();
			building.setName(rs.getString("name"));
			building.setStreet(rs.getString("street"));
			building.setWard(rs.getString("ward"));
			building.setDistrict(rs.getString("district"));
			building.setNumberOfBasement(rs.getInt("numberOfBasement"));
            building.setFloorArea(rs.getDouble("floorArea"));
            building.setRentPrice(rs.getDouble("rentPrice"));
            building.setServiceFee(rs.getDouble("serviceFee"));
            building.setBrokerageFee(rs.getDouble("brokerageFee"));

            building.setHasInterior(rs.getBoolean("hasInterior"));
            building.setHasGroundFloor(rs.getBoolean("hasGroundFloor"));
            building.setIsWholeBuilding(rs.getBoolean("isWholeBuilding"));

            building.setManagerName(rs.getString("managerName"));
            building.setManagerPhone(rs.getString("managerPhone"));

            building.setRegionId(rs.getInt("regionId"));
            building.setTypeId(rs.getInt("typeId"));
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
