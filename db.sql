# Create database script for RELAY

# Create the database
CREATE DATABASE IF NOT EXISTS RELAY;
USE RELAY;

# Create the tables
CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT,name VARCHAR(40),email CHAR(16), password VARCHAR(20), primary key (id));
CREATE TABLE IF NOT EXISTS staff (id INT AUTO_INCREMENT,name VARCHAR(40),email CHAR(16), password VARCHAR(20), primary key (id));
CREATE TABLE IF NOT EXISTS messages (id INT AUTO_INCREMENT, message VARCHAR(255), student_id INT, FOREIGN KEY (student_id) REFERENCES students(id), teacher_id INT, FOREIGN KEY (teacher_id) REFERENCES staff(id), primary key(id), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);


CREATE USER IF NOT EXISTS 'relay_app'@'localhost' IDENTIFIED BY 'relay_password'; 
GRANT ALL PRIVILEGES ON RELAY.* TO 'relay_app'@'localhost';