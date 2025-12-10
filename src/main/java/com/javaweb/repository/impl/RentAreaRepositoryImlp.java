package com.javaweb.repository.impl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.javaweb.Utils.ConnectionJDBCUtil;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.entity.RentAreaEntiry;
@Repository
public class RentAreaRepositoryImlp implements RentAreaRepository{

	@Override
	public List<RentAreaEntiry> getValueByBuildingId(Integer id) {
		String sql = " SELECT * FROM rentarea ra WHERE ra.building_id = " + id;
		List<RentAreaEntiry> rentAreas = new ArrayList<>();
		try(Connection conn = ConnectionJDBCUtil.getConnection(); 
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql.toString());){
			while(rs.next()) {
				RentAreaEntiry areaEntity = new RentAreaEntiry();
				areaEntity.setValue(rs.getString("value"));
				rentAreas.add(areaEntity);
				}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rentAreas;
	}
	
}
