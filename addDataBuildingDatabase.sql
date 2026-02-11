use building_database;

-- INSERT INTO district (id, code, name) VALUES
-- (1, 'Q1', 'Quận 1'),
-- (2, 'Q2', 'Quận 2'),
-- (3, 'Q3', 'Quận 3'),
-- (4, 'QPN', 'Quận Phú Nhuận'),
-- (5, 'Q10', 'Quận 10'),
-- (6, 'QTB', 'Quận Tân Bình'),
-- (7, 'QBT', 'Quận Bình Thạnh'),
-- (8, 'Q7', 'Quận 7'),
-- (9, 'Q11', 'Quận 11'),
-- (10, 'Q5', 'Quận 5');

-- INSERT INTO building (
--  name, district_id, ward, street, structure, number_of_basement,
--  floor_area, direction, level, rent_price, rent_price_description,
--  service_fee, car_fee, motor_fee, overtime_fee, electricity_fee,
--  water_fee, deposit, payment, rent_time, decoration_time,
--  manager_name, manager_phone, brokerage_fee, note
-- )
-- VALUES
-- ('Saigon Prime Tower', 1, 'Bến Nghé', 'Nguyễn Huệ', 'BTCT + kính', 2,
--  1200, 'Đông Nam', 'Hạng A', 45, 'Giá chưa VAT, phí 6$/m2',
--  6, 2000000, 200000, 100000, '4000đ/kWh', '20000đ/m3',
--  '3 tháng', '3 tháng/lần', '3 năm', '30 ngày',
--  'Nguyễn Văn Hùng', '0909123456', 10, 'Tòa nhà trung tâm quận 1'),

-- ('Mapletree Business Center', 8, 'Tân Phong', 'Nguyễn Văn Linh', 'Kính hộp', 1,
--  2500, 'Tây Bắc', 'Hạng A', 38, 'Bao gồm VAT',
--  5, 1500000, 150000, 80000, '4500đ/kWh', '18000đ/m3',
--  '2 tháng', '2 tháng/lần', '5 năm', '45 ngày',
--  'Lê Hoàng Minh', '0909988899', 8, 'Khu Phú Mỹ Hưng'),

-- ('Pearl Plaza Office', 7, 'P.22', 'Điện Biên Phủ', 'Kính Low-E', 3,
--  1800, 'Nam', 'Hạng B+', 30, 'Miễn phí 3 tháng dịch vụ',
--  7, 1200000, 120000, 60000, '3800đ/kWh', '19000đ/m3',
--  '3 tháng', '3 tháng/lần', '3 năm', '20 ngày',
--  'Trần Hải Đăng', '0912345678', 12, 'View đẹp, gần cầu Sài Gòn'),

-- ('Lim Tower 3', 1, 'Đa Kao', 'Nguyễn Đình Chiểu', 'Kính + thép', 5,
--  3000, 'Đông Bắc', 'Hạng A', 55, 'Phí 8$/m2',
--  8, 2500000, 220000, 150000, '4300đ/kWh', '21000đ/m3',
--  '3 tháng', '3 tháng/lần', '5 năm', '45 ngày',
--  'Đỗ Minh Tuấn', '0908234567', 15, 'Tòa nhà văn phòng cao cấp'),

-- ('Sunwah Tower', 1, 'Bến Nghé', 'Nguyễn Huệ', 'Kính Low-E + BTCT', 2,
--  2000, 'Tây Nam', 'Hạng A', 60, 'Giá gồm VAT & phí',
--  10, 3000000, 250000, 180000, '4800đ/kWh', '22000đ/m3',
--  '3 tháng', '3 tháng/lần', '4 năm', '30 ngày',
--  'Hoàng Văn Bắc', '0908777666', 20, 'Khách nước ngoài thuê nhiều'),

-- ('Vietcombank Tower', 1, 'Bến Nghé', 'Tôn Đức Thắng', 'Kính phản quang', 3,
--  3200, 'Bắc', 'Hạng A+', 75, 'Giá cao, vị trí vàng',
--  12, 3500000, 300000, 200000, '5000đ/kWh', '25000đ/m3',
--  '3 tháng', '6 tháng/lần', '5 năm', '60 ngày',
--  'Ngô Tấn Thành', '0988123456', 25, 'Văn phòng cao cấp nhất trung tâm'),

-- ('E.town Central', 6, '4', 'Hoàng Văn Thụ', 'Kính + nhôm', 2,
--  2100, 'Đông', 'Hạng B', 25, 'Giá chưa VAT, phí 4$/m2',
--  4, 1300000, 100000, 60000, '3900đ/kWh', '18500đ/m3',
--  '2 tháng', '2 tháng/lần', '2 năm', '15 ngày',
--  'Võ Minh Long', '0903445566', 10, 'Phù hợp công ty IT'),

-- ('The Flemington Tower', 5, 'P.15', 'Lê Đại Hành', 'BTCT', 1,
--  1500, 'Tây', 'Hạng B', 22, 'Giá mềm, dễ chốt',
--  5, 900000, 80000, 50000, '3500đ/kWh', '17000đ/m3',
--  '2 tháng', '1 tháng/lần', '1 năm', '10 ngày',
--  'Trần Duy Khang', '0977112233', 5, 'Khách SME nhiều'),

-- ('Phú Mỹ Hưng Tower', 8, 'Tân Phong', 'Nguyễn Văn Linh', 'Kính xanh', 1,
--  2600, 'Nam', 'Hạng A-', 35, 'Chưa VAT',
--  6, 1700000, 150000, 80000, '4200đ/kWh', '20000đ/m3',
--  '2 tháng', '2 tháng/lần', '3 năm', '25 ngày',
--  'Lý Quốc Khánh', '0933112244', 10, 'Chuẩn khu đô thị PMH'),

-- ('SAB Office Building', 7, 'P.7', 'Điện Biên Phủ', 'BTCT + gạch ốp', 2,
--  1400, 'Đông Nam', 'Hạng B', 18, 'Giá rẻ, phù hợp startup',
--  3, 800000, 70000, 40000, '3600đ/kWh', '17500đ/m3',
--  '1 tháng', '1 tháng/lần', '1 năm', '7 ngày',
--  'Phạm Quang Nhật', '0944556677', 8, 'Giá cạnh tranh');

-- INSERT INTO rentarea (value, building_id, note) VALUES
-- (100, 1, 'Tầng 3'),
-- (200, 1, 'Tầng 5'),
-- (150, 2, 'Tầng 7'),
-- (300, 2, 'Tầng 10'),
-- (90, 3, 'Tầng 4'),
-- (160, 3, 'Tầng 6'),
-- (180, 4, 'Tầng 12'),
-- (250, 4, 'Tầng 14'),
-- (120, 5, 'Tầng 8'),
-- (200, 6, 'Tầng 20');


-- INSERT INTO renttype (id, code, name) VALUES
-- (1, 'RENT', 'Cho thuê mặt bằng'),
-- (2, 'FULL', 'Thuê nguyên tòa'),
-- (3, 'SHARE', 'Chia sẻ diện tích');

-- INSERT INTO buildingrenttype VALUES
-- (1, 1), (1, 3),
-- (2, 1),
-- (3, 1), (3, 3),
-- (4, 1),
-- (5, 2),
-- (6, 2),
-- (7, 1),
-- (8, 1),
-- (9, 1),
-- (10, 1);

-- INSERT INTO user (id, username, password, fullname, phone, email) VALUES
-- (1, 'admin', '123456', 'Quản trị hệ thống', '0909000000', 'admin@system.com'),
-- (2, 'minh', '123456', 'Nguyễn Văn Minh', '0908000111', 'minh@gmail.com'),
-- (3, 'tuan', '123456', 'Trần Quốc Tuấn', '0908111222', 'tuan@gmail.com'),
-- (4, 'anh', '123456', 'Phạm Nhật Anh', '0908222333', 'anh@gmail.com'),
-- (5, 'khoa', '123456', 'Lê Văn Khoa', '0908333444', 'khoa@gmail.com');

-- INSERT INTO role (id, code, name) VALUES
-- (1, 'ADMIN', 'Quản trị'),
-- (2, 'STAFF', 'Nhân viên kinh doanh');

-- INSERT INTO user_role VALUES
-- (1, 1), -- admin
-- (2, 2), (3, 2), (4, 2), (5, 2);

-- INSERT INTO customer (fullname, phone, email, demand, note) VALUES
-- ('Lê Minh Hải', '0909123123', 'hai@gmail.com', 'Thuê 200–300m2', 'Khách tiềm năng'),
-- ('Trần Hoàng', '0909888777', 'hoang@gmail.com', 'Thuê nguyên tòa', 'Doanh nghiệp lớn'),
-- ('Phạm Anh Đức', '0909555666', 'duc@gmail.com', 'Thuê 100m2', ''),
-- ('Ngô Nhật Nam', '0909777888', 'nam@gmail.com', 'Thuê 150–200m2', ''),
-- ('Hồ Bảo Long', '0911222333', 'long@gmail.com', 'Thuê 50–80m2', ''),
-- ('Đặng Xuân Nhật', '0911333444', 'nhat@gmail.com', 'Thuê 300–400m2', 'Ưu tiên quận 1'),
-- ('Đào Duy Minh', '0909444555', 'minh@gmail.com', 'Thuê 120m2', ''),
-- ('Trịnh Văn Khang', '0909666777', 'khang@gmail.com', 'Thuê 180m2', ''),
-- ('Trần Minh Trí', '0909888999', 'tri@gmail.com', 'Thuê 90m2', ''),
-- ('Nguyễn Hoàng Phúc', '0909777999', 'phuc@gmail.com', 'Thuê 200m2', '');

-- INSERT INTO assignmentbuilding VALUES
-- (1, 2),
-- (2, 2),
-- (3, 3),
-- (4, 3),
-- (5, 4),
-- (6, 4),
-- (7, 5),
-- (8, 5),
-- (9, 2),
-- (10, 3);

-- INSERT INTO assignmentcustomer VALUES
-- (1, 2),
-- (2, 2),
-- (3, 3),
-- (4, 3),
-- (5, 4),
-- (6, 4),
-- (7, 5),
-- (8, 5),
-- (9, 2),
-- (10, 3);

-- INSERT INTO transactiontype (id, code, name, description, status, createddate)
-- VALUES
-- (1, 'CSKH', 'Chăm sóc khách hàng', 'Gọi điện, gửi email, cập nhật nhu cầu', 1, NOW()),
-- (2, 'GO_MEET', 'Gặp mặt tư vấn', 'Tư vấn trực tiếp tại văn phòng', 1, NOW()),
-- (3, 'SEND_QUOTE', 'Gửi báo giá', 'Gửi báo giá theo diện tích', 1, NOW());

-- INSERT INTO transaction (customer_id, staff_id, transactiontype_id, note, date) VALUES
-- (1, 2, 1, 'Gọi xác nhận nhu cầu thuê.', NOW()),
-- (1, 2, 3, 'Gửi báo giá 200m2.', NOW()),
-- (2, 2, 1, 'CSKH lần 1.', NOW()),
-- (3, 3, 2, 'Gặp mặt tư vấn.', NOW()),
-- (5, 4, 1, 'Gọi điện chăm sóc.', NOW()),
-- (6, 4, 3, 'Gửi báo giá thuê nguyên tòa.', NOW());

