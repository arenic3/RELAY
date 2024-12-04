# Create database script for RELAY

# Create the database
CREATE DATABASE IF NOT EXISTS RELAY;
USE RELAY;

# Create the tables
CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT,name VARCHAR(40),email CHAR(16), password VARCHAR(20), primary key (id));
CREATE TABLE IF NOT EXISTS staff (id INT AUTO_INCREMENT,name VARCHAR(40),email CHAR(16), password VARCHAR(20), primary key (id));

CREATE USER IF NOT EXISTS 'relay_app'@'localhost' IDENTIFIED BY 'relay_password'; 
GRANT ALL PRIVILEGES ON RELAY.* TO 'relay_app'@'localhost';