package com.javaweb.Utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionJDBCUtil {

    private static final String DB_URL =
            "jdbc:mysql://localhost:3306/building_database?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASS = "123456";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, USER, PASS);
    }
}
