package com.javaweb.repository.entity;

import javax.persistence.*;

@Entity
@Table(name = "assignmentcustomer")
public class AssignmentCustomerEntity {

    @EmbeddedId
    private AssignmentCustomerId id;

    public AssignmentCustomerEntity() {}

    public AssignmentCustomerEntity(AssignmentCustomerId id) {
        this.id = id;
    }

    public AssignmentCustomerId getId() { return id; }
    public void setId(AssignmentCustomerId id) { this.id = id; }
}