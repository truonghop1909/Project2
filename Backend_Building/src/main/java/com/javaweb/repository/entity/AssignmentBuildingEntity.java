package com.javaweb.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;


@Entity
@Table(name = "assignmentbuilding")
@IdClass(AssignmentBuildingId.class)
public class AssignmentBuildingEntity {

    @Id
    @Column(name = "building_id")
    private Integer buildingId;

    @Id
    @Column(name = "staff_id")
    private Integer staffId;

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
}