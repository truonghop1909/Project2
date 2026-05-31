package com.javaweb;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        // Load file .env từ thư mục hiện tại (nơi chạy jar)
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        // Đưa các biến vào System properties để Spring Boot @Value đọc được
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
        SpringApplication.run(Application.class, args);
    }
}