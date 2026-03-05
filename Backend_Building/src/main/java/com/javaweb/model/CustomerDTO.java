package com.javaweb.model;

public class CustomerDTO {
    private Integer id;
    private String fullname;
    private String phone;
    private String email;
    private String demand;
    private String note;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getDemand() {
        return demand;
    }
    public void setDemand(String demand) {
        this.demand = demand;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }

    // option: để admin thấy đang giao ai
    // private List<Integer> staffIds;

    // getter/setter
    
}