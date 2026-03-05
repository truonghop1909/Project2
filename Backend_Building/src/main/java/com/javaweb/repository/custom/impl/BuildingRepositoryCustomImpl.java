package com.javaweb.repository.custom.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import org.springframework.stereotype.Repository;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingSearchDTO;
import com.javaweb.repository.custom.BuildingRepositoryCustom;
import com.javaweb.utils.ConnectionJDBCUtil;

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

        // JOIN DISTRICT
        sql.append(" LEFT JOIN district d ON b.district_id = d.id ");
    }

    /* ================= WHERE NORMAL ================= */
    private void queryNormal(BuildingSearchBuilder builder, StringBuilder where, List<Object> params) {

        // Tên tòa nhà
        if (isNotBlank(builder.getName())) {
            where.append(" AND b.name LIKE ? ");
            params.add("%" + builder.getName().trim() + "%");
        }

        // Quận (theo tên)
        if (isNotBlank(builder.getDistrict())) {
            where.append(" AND d.name LIKE ? ");
            params.add("%" + builder.getDistrict().trim() + "%");
        }

        // Phường
        if (isNotBlank(builder.getWard())) {
            where.append(" AND b.ward LIKE ? ");
            params.add("%" + builder.getWard().trim() + "%");
        }

        // Đường
        if (isNotBlank(builder.getStreet())) {
            where.append(" AND b.street LIKE ? ");
            params.add("%" + builder.getStreet().trim() + "%");
        }

        // Số tầng hầm
        if (builder.getNumberOfBasement() != null) {
            where.append(" AND b.number_of_basement = ? ");
            params.add(builder.getNumberOfBasement());
        }

        // Diện tích sàn
        if (builder.getFloorAreaFrom() != null) {
            where.append(" AND b.floor_area >= ? ");
            params.add(builder.getFloorAreaFrom());
        }

        if (builder.getFloorAreaTo() != null) {
            where.append(" AND b.floor_area <= ? ");
            params.add(builder.getFloorAreaTo());
        }
    }

    /* ================= WHERE SPECIAL ================= */
    private void querySpecial(BuildingSearchBuilder builder, StringBuilder where, List<Object> params) {

        if (builder.getStaffId() != null) {
            where.append(" AND asb.staff_id = ? ");
            params.add(builder.getStaffId());
        }

        if (builder.getRentAreaFrom() != null) {
            where.append(" AND ra.value >= ? ");
            params.add(builder.getRentAreaFrom());
        }

        if (builder.getRentAreaTo() != null) {
            where.append(" AND ra.value <= ? ");
            params.add(builder.getRentAreaTo());
        }

        if (builder.getRentPriceFrom() != null) {
            where.append(" AND b.rent_price >= ? ");
            params.add(builder.getRentPriceFrom());
        }

        if (builder.getRentPriceTo() != null) {
            where.append(" AND b.rent_price <= ? ");
            params.add(builder.getRentPriceTo());
        }

        // rent types: IN (?, ?, ...)
        if (builder.getRentTypes() != null && !builder.getRentTypes().isEmpty()) {
            where.append(" AND rt.code IN (");
            where.append(String.join(",", Collections.nCopies(builder.getRentTypes().size(), "?")));
            where.append(") ");
            params.addAll(builder.getRentTypes());
        }
    }

    /* ================= PAGING & SORT ================= */
    private void queryPagingAndSort(BuildingSearchBuilder builder, StringBuilder sql, List<Object> params) {

        appendOrderBySafe(builder, sql);

        if (builder.getPage() != null && builder.getSize() != null) {
            int page = builder.getPage();
            int size = builder.getSize();

            // tránh page/size âm hoặc =0
            if (page < 1) page = 1;
            if (size < 1) size = 10;

            int offset = (page - 1) * size;

            sql.append(" LIMIT ? OFFSET ? ");
            params.add(size);
            params.add(offset);
        }
    }

    /**
     * ORDER BY: bắt buộc whitelist để tránh injection từ sortBy/sortDirection.
     */
    private void appendOrderBySafe(BuildingSearchBuilder builder, StringBuilder sql) {
    if (builder.getSortBy() == null || builder.getSortBy().trim().isEmpty()) return;

    Set<String> allowedSortColumns = new HashSet<>(Arrays.asList(
        "id",
        "name",
        "rent_price",
        "floor_area",
        "number_of_basement",
        "service_fee",
        "brokerage_fee",
        "manager_name",
        "manager_phone"
    ));

    String sortBy = builder.getSortBy().trim().toLowerCase();
    if (!allowedSortColumns.contains(sortBy)) return;

    String direction = "ASC";
    if (builder.getSortDirection() != null && "DESC".equalsIgnoreCase(builder.getSortDirection().trim())) {
        direction = "DESC";
    }

    sql.append(" ORDER BY b.").append(sortBy).append(" ").append(direction).append(" ");
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
        List<Object> params = new ArrayList<>();

        queryNormal(builder, where, params);
        querySpecial(builder, where, params);

        sql.append(where);
        queryPagingAndSort(builder, sql, params);

        System.out.println("SQL (prepared): " + sql);
        System.out.println("Params: " + params);

        List<BuildingSearchDTO> result = new ArrayList<>();

        try (Connection conn = ConnectionJDBCUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {

            // bind params
            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    BuildingSearchDTO dto = new BuildingSearchDTO();

                    dto.setId(rs.getInt("id"));
                    dto.setName(rs.getString("name"));

                    String street = rs.getString("street");
                    String ward = rs.getString("ward");
                    String districtName = rs.getString("district_name");

                    // build address sạch hơn (không bị "null")
                    String address = joinNotBlank(", ", street, ward, districtName);
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
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return result;
    }

    /* ================= HELPERS ================= */
    private static boolean isNotBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }

    private static String joinNotBlank(String delimiter, String... parts) {
        List<String> cleaned = new ArrayList<>();
        for (String p : parts) {
            if (p != null) {
                String t = p.trim();
                if (!t.isEmpty()) cleaned.add(t);
            }
        }
        return String.join(delimiter, cleaned);
    }
}