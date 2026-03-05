package com.javaweb.repository.entity;

import javax.persistence.*;

@Entity
@Table(name = "customer")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fullname;
    private String phone;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String demand;

    @Column(columnDefinition = "TEXT")
    private String note;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDemand() { return demand; }
    public void setDemand(String demand) { this.demand = demand; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}