// com/javaweb/model/PageResponseDTO.java

package com.javaweb.model;

import java.util.List;

public class PageResponseDTO<T> {
    private List<T> content;      // Dữ liệu trang hiện tại
    private int page;              // Trang hiện tại (bắt đầu từ 1)
    private int size;              // Số bản ghi mỗi trang
    private long totalElements;    // Tổng số bản ghi
    private int totalPages;        // Tổng số trang
    private boolean first;         // Có phải trang đầu không
    private boolean last;          // Có phải trang cuối không
    
    public PageResponseDTO() {}
    
    public PageResponseDTO(List<T> content, int page, int size, long totalElements) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = (int) Math.ceil((double) totalElements / size);
        this.first = page == 1;
        this.last = page == totalPages || totalPages == 0;
    }
    
    // Getters and Setters
    public List<T> getContent() {
        return content;
    }
    
    public void setContent(List<T> content) {
        this.content = content;
    }
    
    public int getPage() {
        return page;
    }
    
    public void setPage(int page) {
        this.page = page;
    }
    
    public int getSize() {
        return size;
    }
    
    public void setSize(int size) {
        this.size = size;
    }
    
    public long getTotalElements() {
        return totalElements;
    }
    
    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
        this.totalPages = (int) Math.ceil((double) totalElements / this.size);
        this.last = this.page == this.totalPages || this.totalPages == 0;
    }
    
    public int getTotalPages() {
        return totalPages;
    }
    
    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
    
    public boolean isFirst() {
        return first;
    }
    
    public void setFirst(boolean first) {
        this.first = first;
    }
    
    public boolean isLast() {
        return last;
    }
    
    public void setLast(boolean last) {
        this.last = last;
    }
}