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
    }

    /* ================= WHERE NORMAL ================= */
    private void queryNormal(BuildingSearchBuilder builder, StringBuilder where, List<Object> params) {

        // Tên tòa nhà
        if (isNotBlank(builder.getName())) {
            where.append(" AND b.name LIKE ? ");
            params.add("%" + builder.getName().trim() + "%");
        }

        // Đường / Số nhà
        if (isNotBlank(builder.getStreet())) {
            where.append(" AND b.street LIKE ? ");
            params.add("%" + builder.getStreet().trim() + "%");
        }

        // === ĐỊA CHỈ MỚI (sau 07/2025) ===
        if (isNotBlank(builder.getProvinceId())) {
            where.append(" AND b.province_id = ? ");
            params.add(builder.getProvinceId().trim());
        } else if (isNotBlank(builder.getProvinceName())) {
            where.append(" AND b.province_name LIKE ? ");
            params.add("%" + builder.getProvinceName().trim() + "%");
        }

        if (isNotBlank(builder.getWardCode())) {
            where.append(" AND b.ward_code = ? ");
            params.add(builder.getWardCode().trim());
        } else if (isNotBlank(builder.getWardName())) {
            where.append(" AND b.ward_name LIKE ? ");
            params.add("%" + builder.getWardName().trim() + "%");
        }

        if (builder.getNumberOfBasement() != null) {
            where.append(" AND b.number_of_basement = ? ");
            params.add(builder.getNumberOfBasement());
        }

        if (builder.getFloorAreaFrom() != null) {
            where.append(" AND b.floor_area >= ? ");
            params.add(builder.getFloorAreaFrom());
        }

        if (builder.getFloorAreaTo() != null) {
            where.append(" AND b.floor_area <= ? ");
            params.add(builder.getFloorAreaTo());
        }

        if (isNotBlank(builder.getDirection())) {
            where.append(" AND b.direction = ? ");
            params.add(builder.getDirection().trim());
        }

        if (isNotBlank(builder.getLevel())) {
            where.append(" AND b.level = ? ");
            params.add(builder.getLevel().trim());
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

        if (builder.hasPagination()) {
            Integer page = builder.getPage();
            Integer size = builder.getSize();

            if (page == null || page < 1)
                page = 1;
            if (size == null || size < 1)
                size = 10;

            int offset = (page - 1) * size;

            sql.append(" LIMIT ? OFFSET ? ");
            params.add(size);
            params.add(offset);
        }
    }

    private void appendOrderBySafe(BuildingSearchBuilder builder, StringBuilder sql) {
        if (builder.getSortBy() == null || builder.getSortBy().trim().isEmpty())
            return;

        Set<String> allowedSortColumns = new HashSet<>(Arrays.asList(
                "id", "name", "rent_price", "floor_area", "number_of_basement",
                "service_fee", "brokerage_fee", "manager_name", "manager_phone",
                "province_name", "ward_name", "street", "thumbnail")); // ← THÊM thumbnail

        String sortBy = builder.getSortBy().trim().toLowerCase();
        if (!allowedSortColumns.contains(sortBy))
            return;

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
                        " b.id, b.name, b.street, " +
                        " b.number_of_basement, b.floor_area, " +
                        " b.rent_price, b.service_fee, b.brokerage_fee, " +
                        " b.manager_name, b.manager_phone, " +
                        " b.province_id, b.province_name, " +
                        " b.ward_code, b.ward_name, b.full_address, " +
                        " b.direction, b.level, " +
                        " b.thumbnail " + // ← THÊM thumbnail
                        "FROM building b ");

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

            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    BuildingSearchDTO dto = new BuildingSearchDTO();

                    // ID
                    dto.setId(rs.getInt("id"));
                    dto.setName(rs.getString("name"));

                    // Direction & Level
                    dto.setDirection(rs.getString("direction"));
                    dto.setLevel(rs.getString("level"));

                    // ===== THUMBNAIL =====
                    dto.setThumbnail(rs.getString("thumbnail")); // ← THÊM DÒNG NÀY

                    // Địa chỉ hiển thị
                    String fullAddress = rs.getString("full_address");
                    if (isNotBlank(fullAddress)) {
                        dto.setAddress(fullAddress);
                    } else {
                        String street = rs.getString("street");
                        String wardName = rs.getString("ward_name");
                        String provinceName = rs.getString("province_name");
                        String address = buildAddress(street, wardName, provinceName);
                        dto.setAddress(address);
                    }

                    // Các field khác
                    dto.setNumberOfBasement(rs.getInt("number_of_basement"));
                    dto.setFloorArea(rs.getDouble("floor_area"));
                    dto.setRentPrice(rs.getDouble("rent_price"));
                    dto.setServiceFee(rs.getDouble("service_fee"));
                    dto.setBrokerageFee(rs.getDouble("brokerage_fee"));
                    dto.setManagerName(rs.getString("manager_name"));
                    dto.setManagerPhone(rs.getString("manager_phone"));
                    dto.setProvinceName(rs.getString("province_name"));
                    dto.setWardName(rs.getString("ward_name"));
                    dto.setStreet(rs.getString("street"));

                    result.add(dto);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi truy vấn danh sách tòa nhà: " + e.getMessage(), e);
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
                if (!t.isEmpty() && !"null".equalsIgnoreCase(t)) {
                    cleaned.add(t);
                }
            }
        }
        return String.join(delimiter, cleaned);
    }

    private static String buildAddress(String... parts) {
        return joinNotBlank(", ", parts);
    }

    @Override
    public long count(BuildingSearchBuilder builder) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(DISTINCT b.id) FROM building b ");

        // Thêm JOIN nếu cần
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

        StringBuilder where = new StringBuilder(" WHERE 1 = 1 ");
        List<Object> params = new ArrayList<>();

        // Dùng lại các method queryNormal và querySpecial đã có
        queryNormal(builder, where, params);
        querySpecial(builder, where, params);

        sql.append(where);

        try (Connection conn = ConnectionJDBCUtil.getConnection();
                PreparedStatement ps = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi đếm tổng số tòa nhà: " + e.getMessage(), e);
        }

        return 0;
    }
}