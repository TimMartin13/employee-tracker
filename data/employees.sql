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

INSERT INTO department (dept_name)
VALUES ("Sales");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "Martin", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "Bauer", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Moon", 1, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Leon", "Smith", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Justin", "Jefferson", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Harrison", "Smith", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Cameron", "Dantzler", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 3); 

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 250000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 75000, 6);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 200000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Assistant", 40000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Specialist", 45000, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
-- view employees, still need to figure out manager 
SELECT employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, employee.manager_id
FROM employee INNER JOIN role
ON (employee.role_id = role.id)
INNER JOIN department
ON (role.department_id = department.id);

-- View by department 
SELECT employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, employee.manager_id
FROM employee INNER JOIN role
ON (employee.role_id = role.id)

SELECT employee.first_name, employee.last_name, 
-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Square Hammer", "Ghost", "Rock");

-- INSERT INTO songs (title, artist, genre)
-- VALUES ("Moving On", "Asking Alexandria", "Rock");