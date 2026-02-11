package com.javaweb.api.auth;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.LoginRequestDTO;
import com.javaweb.model.RegisterRequestDTO;
import com.javaweb.model.LoginResponseDTO;
import com.javaweb.repository.RoleRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.entity.RoleEntity;
import com.javaweb.repository.entity.UserEntity;
import com.javaweb.security.jwt.JwtTokenProvider;

@RestController
@RequestMapping("/api/auth")
public class AuthAPI {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RoleRepository roleRepository;

    public AuthAPI(UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(1);

        // ⭐ GÁN ROLE_USER
        RoleEntity roleUser = roleRepository.findByCode("ROLE_USER");
        user.getRoles().add(roleUser);

        userRepository.save(user);

        return ResponseEntity.ok("Register success");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        try {
            if (request == null || request.getUsername() == null || request.getPassword() == null) {
                return ResponseEntity.badRequest().body("Username and password are required");
            }

            System.out.println("🔐 LOGIN REQUEST: username=" + request.getUsername());

            UserEntity user = userRepository.findByUsername(request.getUsername());
            if (user == null) {
                System.out.println("❌ User not found: " + request.getUsername());
                return ResponseEntity.badRequest().body("Username not found");
            }

            if (user.getStatus() == null || user.getStatus() == 0) {
                System.out.println("❌ User disabled: " + request.getUsername());
                return ResponseEntity.badRequest().body("User is disabled");
            }

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                System.out.println("❌ Wrong password for: " + request.getUsername());
                return ResponseEntity.badRequest().body("Wrong password");
            }

            // ✅ Tạo JWT
            List<String> roles = (user.getRoles() != null && !user.getRoles().isEmpty())
                    ? user.getRoles().stream()
                            .map(role -> role.getCode())
                            .collect(Collectors.toList())
                    : new java.util.ArrayList<>(java.util.Arrays.asList("ROLE_USER"));

            System.out.println("✅ User roles: " + roles);

            String token = jwtTokenProvider.generateToken(
                    user.getUsername(),
                    roles);

            System.out.println("✅ Token generated for: " + request.getUsername());

            // ✅ Trả JSON
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (Exception ex) {
            System.err.println("❌ LOGIN ERROR: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + ex.getMessage());
        }
    }
}
