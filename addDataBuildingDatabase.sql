use building_database;

INSERT INTO district (code, name) VALUES
('Q1', 'Quận 1'),
('Q2', 'Quận 2'),
('Q3', 'Quận 3'),
('QPN', 'Phú Nhuận'),
('QBT', 'Bình Thạnh')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO renttype (code, name) VALUES
('RENT', 'Cho thuê mặt bằng'),
('FULL', 'Thuê nguyên tòa'),
('SHARE', 'Chia sẻ diện tích')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- INSERT INTO role (code, name) VALUES
-- ('ADMIN', 'Quản trị'),
-- ('STAFF', 'Nhân viên kinh doanh');

-- INSERT INTO users (username, password, fullname, phone, email, status) VALUES
-- ('admin', '123456', 'Quản trị hệ thống', '0909000000', 'admin@system.com', 1),
-- ('staff1', '123456', 'Nguyễn Văn Minh', '0908000111', 'minh@gmail.com', 1),
-- ('staff2', '123456', 'Trần Quốc Tuấn', '0908111222', 'tuan@gmail.com', 1);

-- INSERT INTO user_role (user_id, role_id) VALUES
-- (1,1), -- admin
-- (2,2),
-- (3,2);

INSERT INTO building
(name, district_id, ward, street, structure, number_of_basement,
floor_area, direction, level, rent_price, manager_name, manager_phone, thumbnail)
VALUES
('Saigon Prime Tower',1,'Bến Nghé','Nguyễn Huệ','BTCT + kính',2,1200,'Đông Nam','Hạng A',45000000,'Nguyễn Văn Hùng','0909123456',''),
('Mapletree Business Center',2,'Thảo Điền','Xa Lộ Hà Nội','Kính hộp',1,2000,'Tây Bắc','Hạng A',38000000,'Lê Hoàng Minh','0909988899',''),
('Pearl Plaza Office',5,'P22','Điện Biên Phủ','Kính Low-E',3,1800,'Nam','Hạng B+',30000000,'Trần Hải Đăng','0912345678','');

INSERT INTO rentarea (value, building_id, note) VALUES
(100,1,'Tầng 3'),
(200,1,'Tầng 5'),
(150,2,'Tầng 7'),
(250,3,'Tầng 10');

INSERT INTO buildingrenttype VALUES
(1,1),
(1,2),
(2,1),
(3,3);

-- INSERT INTO customer (fullname, phone, email, demand, note, approval_status) VALUES
-- ('Lê Minh Hải','0909123123','hai@gmail.com','Thuê 200m2','Khách tiềm năng','PENDING'),
-- ('Trần Hoàng','0909888777','hoang@gmail.com','Thuê nguyên tòa','Doanh nghiệp lớn','APPROVED'),
-- ('Phạm Anh Đức','0909555666','duc@gmail.com','Thuê 100m2','','PENDING');

-- INSERT INTO assignmentcustomer (customer_id, staff_id) VALUES
-- (1,2),
-- (2,2),
-- (3,3);

-- INSERT INTO assignmentbuilding VALUES
-- (1,2),
-- (2,3);

-- INSERT INTO transactiontype (code,name,description,status,createddate)
-- VALUES
-- ('CSKH','Chăm sóc khách hàng','Gọi điện chăm sóc',1,NOW()),
-- ('GO_MEET','Gặp mặt tư vấn','Tư vấn trực tiếp',1,NOW()),
-- ('SEND_QUOTE','Gửi báo giá','Gửi báo giá cho khách',1,NOW());

-- INSERT INTO `transaction` (customer_id, staff_id, transactiontype_id, note, date)
-- VALUES
-- (1,2,1,'Gọi xác nhận nhu cầu',NOW()),
-- (2,2,3,'Gửi báo giá 200m2',NOW()),
-- (3,3,2,'Gặp mặt tư vấn',NOW());
-- SELECT id, username FROM users;
UPDATE users
SET password = '$2a$10$xys/QIu5eqe7HMxdigjOouFvvXeSHrQuRsJm6mZto.mz/o6wXEWoG'
WHERE id IN (1,2,3);