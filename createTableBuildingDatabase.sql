Use building_database;

-- CREATE TABLE district (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     code VARCHAR(20) NOT NULL,
--     name VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE building (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(255) NOT NULL,
--     district_id INT,
--     ward VARCHAR(100),
--     street VARCHAR(255),
--     structure VARCHAR(255),
--     number_of_basement INT,
--     floor_area DOUBLE,
--     direction VARCHAR(50),
--     level VARCHAR(50),
--     rent_price DOUBLE,
--     rent_price_description TEXT,
--     service_fee DOUBLE,
--     car_fee DOUBLE,
--     motor_fee DOUBLE,
--     overtime_fee DOUBLE,
--     electricity_fee VARCHAR(50),
--     water_fee VARCHAR(50),
--     deposit VARCHAR(100),
--     payment VARCHAR(100),
--     rent_time VARCHAR(100),
--     decoration_time VARCHAR(100),
--     manager_name VARCHAR(100),
--     manager_phone VARCHAR(20),
--     brokerage_fee DOUBLE,
--     note TEXT,
--     
--     CONSTRAINT fk_building_district
--         FOREIGN KEY (district_id) REFERENCES district(id)
-- );

-- CREATE TABLE rentarea (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     value INT NOT NULL,
--     building_id INT NOT NULL,
--     note TEXT,
--     
--     CONSTRAINT fk_rentarea_building
--         FOREIGN KEY (building_id) REFERENCES building(id)
-- );

-- CREATE TABLE renttype (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     code VARCHAR(50) NOT NULL,
--     name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE buildingrenttype (
--     building_id INT NOT NULL,
--     renttype_id INT NOT NULL,
--     
--     PRIMARY KEY (building_id, renttype_id),

--     CONSTRAINT fk_brt_building
--         FOREIGN KEY (building_id) REFERENCES building(id),
--         
--     CONSTRAINT fk_brt_renttype
--         FOREIGN KEY (renttype_id) REFERENCES renttype(id)
-- );

-- CREATE TABLE user (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     username VARCHAR(100) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     fullname VARCHAR(255),
--     phone VARCHAR(20),
--     email VARCHAR(255),
--     status INT DEFAULT 1
-- );

-- CREATE TABLE role (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     code VARCHAR(50) NOT NULL,
--     name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE user_role (
--     user_id INT NOT NULL,
--     role_id INT NOT NULL,
--     
--     PRIMARY KEY (user_id, role_id),

--     CONSTRAINT fk_userrole_user
--         FOREIGN KEY (user_id) REFERENCES user(id),

--     CONSTRAINT fk_userrole_role
--         FOREIGN KEY (role_id) REFERENCES role(id)
-- );

-- CREATE TABLE customer (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     fullname VARCHAR(255),
--     phone VARCHAR(20),
--     email VARCHAR(255),
--     demand TEXT,
--     note TEXT
-- );

-- CREATE TABLE assignmentbuilding (
--     building_id INT NOT NULL,
--     staff_id INT NOT NULL,
--     
--     PRIMARY KEY (building_id, staff_id),

--     CONSTRAINT fk_asb_building
--         FOREIGN KEY (building_id) REFERENCES building(id),

--     CONSTRAINT fk_asb_user
--         FOREIGN KEY (staff_id) REFERENCES user(id)
-- );

-- CREATE TABLE assignmentcustomer (
--     customer_id INT NOT NULL,
--     staff_id INT NOT NULL,
--     
--     PRIMARY KEY (customer_id, staff_id),

--     CONSTRAINT fk_asc_customer
--         FOREIGN KEY (customer_id) REFERENCES customer(id),

--     CONSTRAINT fk_asc_user
--         FOREIGN KEY (staff_id) REFERENCES user(id)
-- );

-- CREATE TABLE transactiontype (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     code VARCHAR(50) NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     status TINYINT DEFAULT 1,
--     createddate DATETIME,
--     createdby VARCHAR(100),
--     modifieddate DATETIME,
--     modifiedby VARCHAR(100)
-- );

-- CREATE TABLE transaction (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     customer_id INT NOT NULL,
--     staff_id INT NOT NULL,
--     transactiontype_id INT NOT NULL,
--     note TEXT,
--     date DATETIME,
--     
--     CONSTRAINT fk_tran_customer
--         FOREIGN KEY (customer_id) REFERENCES customer(id),

--     CONSTRAINT fk_tran_user
--         FOREIGN KEY (staff_id) REFERENCES user(id),

--     CONSTRAINT fk_tran_type
--         FOREIGN KEY (transactiontype_id) REFERENCES transactiontype(id)
-- );



















