package com.javaweb.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionJDBCUtil {

    public static Connection getConnection() throws SQLException {
        String url = System.getenv().getOrDefault(
                "SPRING_DATASOURCE_URL",
                "jdbc:mysql://localhost:3306/building_database?useSSL=false&serverTimezone=UTC"
        );

        String user = System.getenv().getOrDefault("SPRING_DATASOURCE_USERNAME", "root");
        String pass = System.getenv().getOrDefault("SPRING_DATASOURCE_PASSWORD", "123456");

        return DriverManager.getConnection(url, user, pass);
    }
}