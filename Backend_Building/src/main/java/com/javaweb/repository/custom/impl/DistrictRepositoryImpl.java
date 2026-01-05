package com.javaweb.repository.custom.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

import com.javaweb.Utils.ConnectionJDBCUtil;
import com.javaweb.repository.DistrictRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.DistrictEntity;

@Repository
public class DistrictRepositoryImpl implements DistrictRepositoryCustom{
	
	@Override
	public DistrictEntity findNameById(Integer id) {
		String sql = " SELECT d.name FROM district d WHERE d.id = " + id + ";";
		DistrictEntity districtEntity = new DistrictEntity();
		try(Connection conn = ConnectionJDBCUtil.getConnection(); 
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql.toString());){
			if (rs.next()) {
				districtEntity.setName(rs.getString("name"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return districtEntity;
	}
	
	
}
