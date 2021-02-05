DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);
DROP TABLE role;
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL (10,2),
    department_id INTEGER
);

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

INSERT INTO department (dept_name)
VALUES ("Finance");

INSERT INTO department (dept_name)
VALUES ("Human Resources");

INSERT INTO department (dept_name)
VALUES ("Engineering");

INSERT INTO department (dept_name)
VALUES ("Marketing");

INSERT INTO department (dept_name)
VALUES ("Legal");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "Martin", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "Bauer", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Moon", 1, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 3); 

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 250000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 75000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 200000, 5);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Square Hammer", "Ghost", "Rock");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Moving On", "Asking Alexandria", "Rock");