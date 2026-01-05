package com.javaweb.repository.custom.impl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.javaweb.Utils.ConnectionJDBCUtil;
import com.javaweb.repository.RentAreaRepository;
import com.javaweb.repository.custom.RentAreaRepositoryCustom;
import com.javaweb.repository.entity.RentAreaEntity;
@Repository
public class RentAreaRepositoryCustomImpl
        implements RentAreaRepositoryCustom {

    @Override
    public List<RentAreaEntity> getValueByBuildingId(Integer id) {

        String sql = "SELECT * FROM rentarea WHERE building_id = " + id;
        List<RentAreaEntity> rentAreas = new ArrayList<>();

        try (Connection conn = ConnectionJDBCUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                RentAreaEntity area = new RentAreaEntity();
                area.setId(rs.getInt("id"));
                area.setValue(rs.getInt("value"));
                rentAreas.add(area);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return rentAreas;
    }
}
