package com.javaweb.repository.custom.impl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.javaweb.Utils.ConnectionJDBCUtil;
import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.repository.custom.BuildingRepositoryCustom;
import com.javaweb.repository.entity.BuildingEntity;

@Repository
public class BuildingRepositoryCustomImpl implements BuildingRepositoryCustom {

    /* ================= JOIN TABLE ================= */
    private void joinTable(BuildingSearchBuilder builder, StringBuilder sql) {

        if (builder.getStaffId() != null) {
            sql.append(" INNER JOIN assignmentbuilding asb ON b.id = asb.building_id ");
        }

        if (builder.getRentTypes() != null && !builder.getRentTypes().isEmpty()) {
            sql.append(" INNER JOIN buildingrenttype brt ON b.id = brt.building_id ");
            sql.append(" INNER JOIN renttype rt ON rt.id = brt.renttype_id ");
        }

        if (builder.getRentAreaFrom() != null || builder.getRentAreaTo() != null) {
            sql.append(" INNER JOIN rentarea ra ON b.id = ra.building_id ");
        }

        //✅ JOIN DISTRICT (LUÔN JOIN – AN TOÀN)
        sql.append(" LEFT JOIN district d ON b.district_id = d.id ");
      
    }

    /* ================= WHERE NORMAL ================= */
    private void queryNormal(BuildingSearchBuilder builder, StringBuilder where) {

        // Tên tòa nhà
        if (builder.getName() != null && !builder.getName().trim().isEmpty()) {
            where.append(" AND b.name LIKE '%")
                 .append(builder.getName().trim())
                 .append("%' ");
        }

        // Quận (theo tên)
        if (builder.getDistrict() != null && !builder.getDistrict().trim().isEmpty()) {
            where.append(" AND d.name LIKE '%")
                 .append(builder.getDistrict().trim())
                 .append("%' ");
        }


        // Phường
        if (builder.getWard() != null && !builder.getWard().trim().isEmpty()) {
            where.append(" AND b.ward LIKE '%")
                 .append(builder.getWard().trim())
                 .append("%' ");
        }

        // Đường
        if (builder.getStreet() != null && !builder.getStreet().trim().isEmpty()) {
            where.append(" AND b.street LIKE '%")
                 .append(builder.getStreet().trim())
                 .append("%' ");
        }

        // Số tầng hầm
        if (builder.getNumberOfBasement() != null) {
            where.append(" AND b.number_of_basement = ")
                 .append(builder.getNumberOfBasement());
        }

        // Diện tích sàn
        if (builder.getFloorAreaFrom() != null) {
            where.append(" AND b.floor_area >= ")
                 .append(builder.getFloorAreaFrom());
        }

        if (builder.getFloorAreaTo() != null) {
            where.append(" AND b.floor_area <= ")
                 .append(builder.getFloorAreaTo());
        }
    }

    /* ================= WHERE SPECIAL ================= */
    private void querySpecial(BuildingSearchBuilder builder, StringBuilder where) {

        if (builder.getStaffId() != null) {
            where.append(" AND asb.staff_id = ")
                 .append(builder.getStaffId());
        }

        if (builder.getRentAreaFrom() != null) {
            where.append(" AND ra.value >= ")
                 .append(builder.getRentAreaFrom());
        }

        if (builder.getRentAreaTo() != null) {
            where.append(" AND ra.value <= ")
                 .append(builder.getRentAreaTo());
        }

        if (builder.getRentPriceFrom() != null) {
            where.append(" AND b.rent_price >= ")
                 .append(builder.getRentPriceFrom());
        }

        if (builder.getRentPriceTo() != null) {
            where.append(" AND b.rent_price <= ")
                 .append(builder.getRentPriceTo());
        }

        if (builder.getRentTypes() != null && !builder.getRentTypes().isEmpty()) {
            where.append(" AND rt.code IN ('")
                 .append(String.join("','", builder.getRentTypes()))
                 .append("') ");
        }
    }

    /* ================= PAGING & SORT ================= */
    private void queryPagingAndSort(BuildingSearchBuilder builder, StringBuilder sql) {

        if (builder.getSortBy() != null && !builder.getSortBy().trim().isEmpty()) {
            sql.append(" ORDER BY b.")
               .append(builder.getSortBy());

            if (builder.getSortDirection() != null && !builder.getSortDirection().trim().isEmpty()) {
                sql.append(" ").append(builder.getSortDirection());
            } else {
                sql.append(" ASC");
            }
        }

        if (builder.getPage() != null && builder.getSize() != null) {
            int offset = (builder.getPage() - 1) * builder.getSize();
            sql.append(" LIMIT ")
               .append(builder.getSize())
               .append(" OFFSET ")
               .append(offset);
        }
    }

    /* ================= MAIN ================= */
    @Override
    public List<BuildingSearchDTO> findAll(BuildingSearchBuilder builder) {

    	StringBuilder sql = new StringBuilder(
		    "SELECT DISTINCT " +
		    " b.id, b.name, b.street, b.ward, b.district_id, " +
		    " d.name AS district_name, " +
		    " b.number_of_basement, b.floor_area, " +
		    " b.rent_price, b.service_fee, b.brokerage_fee, " +
		    " b.manager_name, b.manager_phone " +
		    "FROM building b "
		);


        joinTable(builder, sql);

        StringBuilder where = new StringBuilder(" WHERE 1 = 1 ");
        queryNormal(builder, where);
        querySpecial(builder, where);

        sql.append(where);
        queryPagingAndSort(builder, sql);

        System.out.println("SQL: " + sql);

        List<BuildingSearchDTO> result = new ArrayList<>();

        try (Connection conn = ConnectionJDBCUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql.toString())) {

        	while (rs.next()) {

    	    BuildingSearchDTO dto = new BuildingSearchDTO();

	    	    dto.setId(rs.getInt("id"));
	    	    dto.setName(rs.getString("name"));
	
	    	    String street = rs.getString("street");
	    	    String ward = rs.getString("ward");
	    	    String districtName = rs.getString("district_name");
	
	    	    String address = String.join(", ",
	    	        street,
	    	        ward,
	    	        districtName
	    	    ).replaceAll(", null", "")
	    	     .replaceAll(", $", "");
	
	    	    dto.setAddress(address);
	
	    	    dto.setNumberOfBasement(rs.getInt("number_of_basement"));
	    	    dto.setFloorArea(rs.getDouble("floor_area"));
	    	    dto.setRentPrice(rs.getDouble("rent_price"));
	    	    dto.setServiceFee(rs.getDouble("service_fee"));
	    	    dto.setBrokerageFee(rs.getDouble("brokerage_fee"));
	    	    dto.setManagerName(rs.getString("manager_name"));
	    	    dto.setManagerPhone(rs.getString("manager_phone"));
	
	    	    result.add(dto);
	    	}
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
        return result;
    }
}

