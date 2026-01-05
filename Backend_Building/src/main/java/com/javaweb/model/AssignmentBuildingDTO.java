package com.javaweb.model;

import java.util.List;

public class AssignmentBuildingDTO {

    private Integer buildingId;
    private List<Integer> staffIds;

    public Integer getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Integer buildingId) {
        this.buildingId = buildingId;
    }

    public List<Integer> getStaffIds() {
        return staffIds;
    }

    public void setStaffIds(List<Integer> staffIds) {
        this.staffIds = staffIds;
    }
}
