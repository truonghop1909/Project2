package com.javaweb.repository.entity;

import java.io.Serializable;
import java.util.Objects;

public class AssignmentBuildingId implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer buildingId;
    private Integer staffId;

    public AssignmentBuildingId() {
    }

    public AssignmentBuildingId(Integer buildingId, Integer staffId) {
        this.buildingId = buildingId;
        this.staffId = staffId;
    }

    public Integer getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Integer buildingId) {
        this.buildingId = buildingId;
    }

    public Integer getStaffId() {
        return staffId;
    }

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AssignmentBuildingId that = (AssignmentBuildingId) o;
        return Objects.equals(buildingId, that.buildingId)
                && Objects.equals(staffId, that.staffId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(buildingId, staffId);
    }
}