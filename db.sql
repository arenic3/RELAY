# Create database script for RELAY

# Create the database
CREATE DATABASE IF NOT EXISTS RELAY;
USE RELAY;

# Create the tables
--CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT,name VARCHAR(40),email CHAR(16), password VARCHAR(20), primary key (id));
--CREATE TABLE IF NOT EXISTS staff (id INT AUTO_INCREMENT,name VARCHAR(40),email CHAR(16), password VARCHAR(20), primary key (id));
CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, name VARCHAR(40), email CHAR(16), password VARCHAR(20), role ENUM('student', 'staff'), primary key(id))
CREATE TABLE IF NOT EXISTS messages (id INT AUTO_INCREMENT, message VARCHAR(255), sender_id INT,  recipient_id INT, primary key(id), timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (sender_id) REFERENCES users(id), FOREIGN KEY (recipient_id) REFERENCES users(id));

CREATE USER IF NOT EXISTS 'relay_app'@'localhost' IDENTIFIED BY 'relay_password'; 
GRANT ALL PRIVILEGES ON RELAY.* TO 'relay_app'@'localhost';