package com.javaweb.model;

import java.util.List;

public class UserRoleUpdateRequestDTO {
    private List<String> roleCodes;

    public List<String> getRoleCodes() {
        return roleCodes;
    }

    public void setRoleCodes(List<String> roleCodes) {
        this.roleCodes = roleCodes;
    }
}
