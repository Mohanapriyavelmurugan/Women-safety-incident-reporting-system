CREATE DATABASE  IF NOT EXISTS women_safety_project;

USE women_safety_project;

DROP TABLE IF EXISTS users, emergency_contacts, incidents, police, case_tracking;

-- 1. Users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  password VARCHAR(255),
  role ENUM('victim', 'admin') DEFAULT 'victim'
);

-- 2. Emergency Contacts
CREATE TABLE emergency_contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  phone VARCHAR(15),
  relation VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Incidents
CREATE TABLE incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  location TEXT,
  description TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('reported', 'under_investigation', 'closed') DEFAULT 'reported',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Police
CREATE TABLE police (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  badge_id VARCHAR(50) UNIQUE,
  station VARCHAR(100),
  phone VARCHAR(15),
  email VARCHAR(100)
);

-- 5. Case Tracking
CREATE TABLE case_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  incident_id INT,
  police_id INT,
  update_note TEXT,
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('assigned', 'investigating', 'resolved') DEFAULT 'assigned',
  FOREIGN KEY (incident_id) REFERENCES incidents(id),
  FOREIGN KEY (police_id) REFERENCES police(id)
);

select*from users;

