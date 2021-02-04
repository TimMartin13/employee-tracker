DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL (6,2),
    department_id INTEGER
);

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- INSERT INTO employee (first_name, last_name, role_id)
-- VALUES ("Major Tom", "Peter Schilling", "80s");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Square Hammer", "Ghost", "Rock");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Moving On", "Asking Alexandria", "Rock");