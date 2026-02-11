USE building_database;

-- Create roles first
INSERT INTO role (code, name) VALUES
('ADMIN', 'Quản trị'),
('STAFF', 'Nhân viên kinh doanh')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Create admin user (password: admin123)
-- Note: Using plain text for demo - in production use proper password hashing
INSERT INTO user (username, password, fullname, phone, email, status) VALUES
('admin', '$2a$10$xOWnecBo1T7FEqhEbmJ2cex2B1DqMxnJoOT6F5e5k4wZE6C7yP51e', 'Administrator', '0909000000', 'admin@system.com', 1)
ON DUPLICATE KEY UPDATE password = VALUES(password);

-- Create staff users
INSERT INTO user (username, password, fullname, phone, email, status) VALUES
('staff1', '$2a$10$xOWnecBo1T7FEqhEbmJ2cex2B1DqMxnJoOT6F5e5k4wZE6C7yP51e', 'Nguyễn Văn Minh', '0908000111', 'minh@gmail.com', 1),
('staff2', '$2a$10$xOWnecBo1T7FEqhEbmJ2cex2B1DqMxnJoOT6F5e5k4wZE6C7yP51e', 'Trần Quốc Tuấn', '0908111222', 'tuan@gmail.com', 1),
('staff3', '$2a$10$xOWnecBo1T7FEqhEbmJ2cex2B1DqMxnJoOT6F5e5k4wZE6C7yP51e', 'Phạm Nhật Anh', '0908222333', 'anh@gmail.com', 1)
ON DUPLICATE KEY UPDATE password = VALUES(password);

-- Assign roles to users
-- Delete existing user_role entries first
DELETE FROM user_role WHERE user_id IN (
  SELECT id FROM user WHERE username IN ('admin', 'staff1', 'staff2', 'staff3')
);

-- Assign ADMIN role to admin user
INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id FROM user u, role r 
WHERE u.username = 'admin' AND r.code = 'ADMIN';

-- Assign STAFF role to staff users
INSERT INTO user_role (user_id, role_id)
SELECT u.id, r.id FROM user u, role r 
WHERE u.username IN ('staff1', 'staff2', 'staff3') AND r.code = 'STAFF';
