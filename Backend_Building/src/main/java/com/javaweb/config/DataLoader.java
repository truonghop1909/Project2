package com.javaweb.config;

import com.javaweb.repository.RoleRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.RentTypeRepository;          // thêm import
import com.javaweb.repository.entity.RoleEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.repository.entity.RentTypeEntity;      // thêm import
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
    
    @Autowired
    private RentTypeRepository rentTypeRepository;        // thêm dependency
    
    @Override
    public void run(String... args) throws Exception {
        
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
        UserEntity existingAdmin = userRepository.findByUsername("admin");
        if (existingAdmin == null) {
            UserEntity admin = new UserEntity();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setStatus(1);
            admin.getRoles().add(adminRole);
            admin.getRoles().add(staffRole);
            userRepository.save(admin);
            System.out.println("✅ Created ADMIN user: username=admin, password=admin123");
        } else {
            System.out.println("⚠️ Admin user already exists");
        }
        
        // ========== Tạo STAFF demo ==========
        UserEntity existingStaff = userRepository.findByUsername("staff1");
        if (existingStaff == null) {
            UserEntity staff = new UserEntity();
            staff.setUsername("staff1");
            staff.setPassword(passwordEncoder.encode("staff123"));
            staff.setStatus(1);
            staff.getRoles().add(staffRole);
            userRepository.save(staff);
            System.out.println("✅ Created STAFF user: username=staff1, password=staff123");
        }
        
        // ========== THÊM DỮ LIỆU MẪU CHO BẢNG renttype ==========
        // Các loại hình thuê cần có
        String[][] rentTypes = {
            {"OFFICE", "Văn phòng"},
            {"RETAIL", "Cửa hàng bán lẻ"},
            {"WAREHOUSE", "Kho xưởng"},
            {"COWORKING", "Coworking Space"},
            {"SERVICE", "Dịch vụ"}
        };
        
        for (String[] rt : rentTypes) {
            String code = rt[0];
            String name = rt[1];
            RentTypeEntity existing = rentTypeRepository.findByCode(code).orElse(null);
            if (existing == null) {
                RentTypeEntity entity = new RentTypeEntity();
                entity.setCode(code);
                entity.setName(name);
                rentTypeRepository.save(entity);
                System.out.println("✅ Created rent type: " + code + " - " + name);
            } else {
                System.out.println("⚠️ Rent type " + code + " already exists");
            }
        }
    }
}