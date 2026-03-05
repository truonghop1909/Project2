package com.javaweb.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static Integer getCurrentUserId() {

        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (principal instanceof Integer) {
            return (Integer) principal;
        }

        return null;
    }
}
