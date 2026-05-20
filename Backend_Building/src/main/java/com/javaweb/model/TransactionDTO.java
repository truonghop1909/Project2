package com.javaweb.model;

import java.util.Date;

public class TransactionDTO {
    private Integer id;
    private Integer customerId;
    private Integer staffId;
    private Integer transactiontypeId; // ✅ giữ để FE gửi lên/hiển thị
    private String transactionTypeName; // ✅ thêm để FE hiển thị
    private String customerName;
    private String staffName;
    private String customerPhone;
    private String note;
    private Date date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getTransactiontypeId() {
        return transactiontypeId;
    }

    public void setTransactiontypeId(Integer transactiontypeId) {
        this.transactiontypeId = transactiontypeId;
    }

    public String getTransactionTypeName() {
        return transactionTypeName;
    }

    public void setTransactionTypeName(String transactionTypeName) {
        this.transactionTypeName = transactionTypeName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public Integer getStaffId() {
        return staffId;
    }   

    public void setStaffId(Integer staffId) {
        this.staffId = staffId;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public TransactionDTO(
            Integer id,
            Integer customerId,
            Integer transactiontypeId,
            String transactionTypeName,
            String customerName,
            String customerPhone,
            String note,
            Date date,
            Integer staffId,
            String staffName) {
        this.id = id;
        this.customerId = customerId;
        this.transactiontypeId = transactiontypeId;
        this.transactionTypeName = transactionTypeName;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.note = note;
        this.date = date;
        this.staffId = staffId;
        this.staffName = staffName;
    }

    public TransactionDTO() {
    }
}