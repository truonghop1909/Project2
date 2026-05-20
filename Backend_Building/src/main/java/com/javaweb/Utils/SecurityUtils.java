package com.javaweb.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof Integer) {
            return (Integer) principal;
        }

        throw new RuntimeException("User not authenticated");
    }

    public static boolean hasRole(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getAuthorities() == null) {
            return false;
        }

        String expectedRole = "ROLE_" + role;

        for (GrantedAuthority authority : authentication.getAuthorities()) {
            if (expectedRole.equals(authority.getAuthority())) {
                return true;
            }
        }

        return false;
    }
}