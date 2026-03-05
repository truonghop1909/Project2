package com.javaweb.model;

public class CustomerSearchDTO {
    private String fullname;
    private String phone;
    private Integer transactionTypeId; // lọc theo loại giao dịch (id)

    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getTransactionTypeId() { return transactionTypeId; }
    public void setTransactionTypeId(Integer transactionTypeId) { this.transactionTypeId = transactionTypeId; }
}