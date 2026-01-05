README – BUILDING MANAGEMENT SYSTEM
1. Giới thiệu

Building Management System là một ứng dụng backend được xây dựng bằng Spring Boot, phục vụ quản lý và tìm kiếm thông tin các tòa nhà cho thuê văn phòng.

Hệ thống hỗ trợ:

CRUD tòa nhà

Tìm kiếm tòa nhà theo nhiều tiêu chí

Quản lý diện tích thuê, loại hình thuê

Kiến trúc tách rõ JPA và JDBC để tối ưu hiệu năng và khả năng mở rộng

2. Công nghệ sử dụng (Tech Stack)
Thành phần	  Công nghệ
Ngôn ngữ	  Java 8
Framework	  Spring Boot 2.0
ORM	          Spring Data JPA (Hibernate)
SQL Custom	  JDBC
Database	  MySQL
Build Tool	  Maven
API	RESTful   API
Mapping	      DTO + Converter
IDE	          Eclipse
3. Kiến trúc tổng thể (Architecture Overview)
Mô hình kiến trúc: Layered Architecture
Controller (API)
        ↓
Service (Business Logic)
        ↓
Repository
   ├── JPA Repository (CRUD)
   └── JDBC Custom Repository (Search)
        ↓
Database (MySQL)
Giải thích từng layer:
3.1 Controller Layer

Nhận request từ client

Validate dữ liệu đầu vào

Trả response dạng JSON

Ví dụ:
GET    /api/building
POST   /api/building
PUT    /api/building/{id}
DELETE /api/building/{id}
3.2 Service Layer

Xử lý nghiệp vụ

Điều phối giữa:

JPA Repository (CRUD)

JDBC Custom Repository (Search)

Thực hiện transaction
3.3 Repository Layer
a) JPA Repository

Sử dụng JpaRepository

Phục vụ các thao tác CRUD đơn giản

save()
findById()
deleteById()

b) Custom Repository (JDBC)

Sử dụng JDBC thuần

Xây dựng SQL động cho nghiệp vụ tìm kiếm phức tạp

Dễ kiểm soát hiệu năng và câu SQL

👉 Lý do tách JPA và JDBC:

Search nhiều điều kiện → SQL động → JDBC linh hoạt

CRUD đơn giản → JPA giúp code gọn, dễ maintain

4. Luồng xử lý Search Building
Client Request
     ↓
BuildingAPI
     ↓
BuildingService
     ↓
BuildingSearchBuilderConverter
     ↓
BuildingRepositoryCustomImpl (JDBC)
     ↓
Database
     ↓
Mapping Entity → DTO
     ↓
Response JSON

5. Luồng xử lý CRUD Building
Create / Update
Client Request
     ↓
BuildingAPI
     ↓
BuildingService (@Transactional)
     ↓
JpaRepository.save()
     ↓
Database

Delete
Client Request
     ↓
BuildingAPI
     ↓
BuildingService
     ↓
JpaRepository.deleteById()

6. DTO & Converter

Entity đại diện cho database

DTO dùng cho API response/request

Converter chịu trách nhiệm mapping giữa Entity ↔ DTO

👉 Giúp:

Không lộ cấu trúc DB ra ngoài

Dễ thay đổi response

Dễ mở rộng API

7. Cấu trúc thư mục
src/main/java
└── com.javaweb
    ├── api
    ├── service
    │   └── impl
    ├── repository
    │   ├── custom
    │   │   └── impl
    │   └── entity
    ├── builder
    ├── converter
    ├── utils
    ├── controllerAdvice
    └── Application.java

8. Database Design (tóm tắt)

building

district

rentarea

renttype

buildingrenttype

assignmentbuilding

user / role

👉 Quan hệ được thiết kế theo chuẩn 1–n, n–n

9. Điểm nổi bật của đồ án

✅ Kết hợp JPA + JDBC hợp lý
✅ SQL dynamic cho search phức tạp
✅ Kiến trúc rõ ràng, dễ mở rộng
✅ Tuân thủ best practice Spring Boot
✅ Phù hợp đồ án backend thực tế

10. Hướng phát triển

Phân quyền Admin / Staff

Quản lý khách hàng

Giao dịch & lịch sử chăm sóc

Authentication / Authorization (Spring Security)
