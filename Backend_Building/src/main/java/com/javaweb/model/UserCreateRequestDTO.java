package com.javaweb.model;

import java.util.List;

public class UserCreateRequestDTO {

    private String username;
    private String password;
    private String fullname;
    private String email;
    private String phone;

    // ADMIN có thể set role
    // REGISTER thường mặc định STAFF
    private List<String> roleCodes;

    // ===== getter / setter =====

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }
    
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getRoleCodes() {
        return roleCodes;
    }
    
    public void setRoleCodes(List<String> roles) {
        this.roleCodes = roles;
    }
}
