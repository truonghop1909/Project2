package com.javaweb.repository.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AssignmentCustomerId implements Serializable {
    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "staff_id")
    private Integer staffId;

    public AssignmentCustomerId() {}

    public AssignmentCustomerId(Integer customerId, Integer staffId) {
        this.customerId = customerId;
        this.staffId = staffId;
    }

    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }

    public Integer getStaffId() { return staffId; }
    public void setStaffId(Integer staffId) { this.staffId = staffId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AssignmentCustomerId)) return false;
        AssignmentCustomerId that = (AssignmentCustomerId) o;
        return Objects.equals(customerId, that.customerId)
            && Objects.equals(staffId, that.staffId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, staffId);
    }
}