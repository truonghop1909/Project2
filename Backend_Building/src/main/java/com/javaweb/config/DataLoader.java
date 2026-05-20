package com.javaweb.config;

import com.javaweb.repository.RoleRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.RoleEntity;
import com.javaweb.repository.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        
        // ========== Tạo ROLES ==========
        // Tạo role USER
        RoleEntity userRole = roleRepository.findByCode("ROLE_USER");
        if (userRole == null) {
            userRole = new RoleEntity();
            userRole.setCode("ROLE_USER");
            userRole.setName("User Role");
            roleRepository.save(userRole);
            System.out.println("✅ Created ROLE_USER");
        }
        
        // Tạo role STAFF
        RoleEntity staffRole = roleRepository.findByCode("ROLE_STAFF");
        if (staffRole == null) {
            staffRole = new RoleEntity();
            staffRole.setCode("ROLE_STAFF");
            staffRole.setName("Staff Role");
            roleRepository.save(staffRole);
            System.out.println("✅ Created ROLE_STAFF");
        }
        
        // Tạo role ADMIN
        RoleEntity adminRole = roleRepository.findByCode("ROLE_ADMIN");
        if (adminRole == null) {
            adminRole = new RoleEntity();
            adminRole.setCode("ROLE_ADMIN");
            adminRole.setName("Admin Role");
            roleRepository.save(adminRole);
            System.out.println("✅ Created ROLE_ADMIN");
        }
        
        // ========== Tạo ADMIN USER ==========
        // Kiểm tra xem admin đã tồn tại chưa
        UserEntity existingAdmin = userRepository.findByUsername("admin");
        if (existingAdmin == null) {
            UserEntity admin = new UserEntity();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123")); // Mật khẩu: admin123
            admin.setStatus(1);
            admin.getRoles().add(adminRole); // Gán role ADMIN
            admin.getRoles().add(staffRole); // Có thể gán thêm STAFF nếu muốn
            admin.getRoles().add(userRole);  // Có thể gán thêm USER nếu muốn
            
            userRepository.save(admin);
            System.out.println("✅ Created ADMIN user: username=admin, password=admin123");
        } else {
            System.out.println("⚠️ Admin user already exists");
        }
        
        // ========== (Tuỳ chọn) Tạo STAFF demo ==========
        UserEntity existingStaff = userRepository.findByUsername("staff1");
        if (existingStaff == null) {
            UserEntity staff = new UserEntity();
            staff.setUsername("staff1");
            staff.setPassword(passwordEncoder.encode("staff123"));
            staff.setStatus(1);
            staff.getRoles().add(staffRole);
            staff.getRoles().add(userRole);
            
            userRepository.save(staff);
            System.out.println("✅ Created STAFF user: username=staff1, password=staff123");
        }
        
        // ========== (Tuỳ chọn) Tạo USER demo ==========
        UserEntity existingUser = userRepository.findByUsername("user1");
        if (existingUser == null) {
            UserEntity user = new UserEntity();
            user.setUsername("user1");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setStatus(1);
            user.getRoles().add(userRole);
            
            userRepository.save(user);
            System.out.println("✅ Created USER user: username=user1, password=user123");
        }
    }
}