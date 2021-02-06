const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
const questions = require('./lib/questions.js');
// Create MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

// Main menu
function mainMenu() {
       
    inquirer
        .prompt(questions.mainMenuQ)
        .then(({ selection }) => {
            switch(selection) {
                case 'Add employee':                        getEmployeeList('add');             break;
                case 'Add department':                      addDept();                          break;
                case 'Add role':                            getDepartmentList("addRole");       break;
                case 'Remove employee':                     getEmployeeList("remove");          break;
                case 'Remove department':                   getDepartmentList("removeDept");    break;
                case 'Remove role':                         getRolesList("remove");             break;
                case 'Update employee role':                getEmployeeList("updateRole");      break;
                case 'Update employee manager':             getEmployeeList("updateManager");   break;
                case 'View all employees':                  viewEmployees();                    break;
                case 'View all employees by Department':    getDepartmentList("viewEmployees"); break;
                case 'View all employees by Manager':       getEmployeeList("viewByManager");   break;
                case 'View all departments':                viewDept();                         break;
                case 'View all roles':                      viewRoles();                        break;
                case 'Exit':                                exitProgram();                      break;
                default: console.log("Default");            mainMenu();                         break;
            }
        });
        
}

// This function takes an employee array and a string which is used to call different functions
function getRoles(employeeArr, type) {
    // Create the roles array
    const roles = [];
    // Get all of the titles and ids from the role array
    queryURL = `SELECT title, id FROM role`;
    connection.query(queryURL, function(err, res, field) {
        if (err) throw err;
        // Put the values into an object
        for (let i = 0; i < res.length; i++) {
            let role = {
                name: res[i].title,
                value: res[i].id
            };
            // Push the objects into the array
            roles.push(role);
        };
        // Add or update based on the type chosen
        switch(type) {
            case 'add': addEmployee(employeeArr, roles); break;
            case 'updateRole': updateRole(employeeArr, roles); break;
        }
        
    });
}

// Add an employee, takes in the list of manager options and the list of role options
function addEmployee(managerList, roleList) {
    // Ask for user input
    const addEmployeeQ = [
        {
            type: 'input',
            message: "First name?",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "Last name?",
            name: 'lastName',
        },
        {
            type: 'list',
            message: "Title?",
            name: 'employeeRole',
            choices: roleList
        },
        {
            type: 'list',
            message: "Manager?",
            name: 'employeeManager',
            choices: managerList
        }
    ]

    inquirer
        .prompt(addEmployeeQ)
        .then(( { firstName, lastName, employeeRole, employeeManager }) => {
            // Insert input into db
            queryURL = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${ firstName }", "${ lastName }", ${ employeeRole }, ${ employeeManager });`;
            connection.query(queryURL, function(err, res, field) {
            if (err) throw err;
            // Go back to mainMenu
            mainMenu();
            });
            
        });
}
// Adds a new department based on user input
function addDept() {
    inquirer
        .prompt(questions.addDeptQ)
        .then(( { departmentName }) => {
            // Insert user info into the db
            queryURL = `INSERT INTO department (dept_name)
            VALUES ("${ departmentName }");`;
            connection.query(queryURL, function(err) {
            if (err) throw err;
            // Back to main menu
            mainMenu();
            });
    });
}

// Get a list of departments and then passes that array to different functions
function getDepartmentList(reason) {
    const departments = [];
    queryURL = `SELECT dept_name, id FROM department`;
    connection.query(queryURL, function(err, res, field) {
        if (err) throw err;
        // Put the query response into an object
        for (let i = 0; i < res.length; i++) {
            let department = {
                name: res[i].dept_name,
                value: res[i].id
            };
            // Push the object into the array
            departments.push(department);
        };
        // Pass the array to the different functions
        switch(reason) {
            case 'addRole': addRole(departments); break;
            case 'removeDept': removeDept(departments); break;
            case 'viewEmployees': viewEmployeesByDept(departments); break;
        }
    });
}

// Get a list of employees and then passes that array to different functions
function getEmployeeList(reason) {
    const employees = [];
    // This array is created because you should be able to pick None for a manager
    const managers = [];
    queryURL = `SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employee`;
    connection.query(queryURL, function(err, res, field) {
        if (err) throw err;
        
        for (let i = 0; i < res.length; i++) {
            let employee = {
                name: res[i].name,
                value: res[i].id
            };
            employees.push(employee);
            managers.push(employee);
        };
        // Send arrays to different functions
        switch(reason) {
            case 'add': 
            case 'updateRole': getRoles(employees, reason); break;
            case 'remove': removeEmployee(employees); break;
            case 'updateManager': 
                managers.push("None");
                updateManager(employees, managers); 
                break;
            case 'viewByManager': viewEmployeesByManager(employees); break;
        }
    });
}

// Adding a role to a particular department
function addRole(departmentArray) {
    // The questions
    const addRoleQ = [
        {
            type: 'input',
            message: "Title?",
            name: 'roleName'
        },
        {
            type: 'number',
            message: "Salary?",
            name: 'salary'
        },
        {
            type: 'list',
            message: "Which department would you like this role in?",
            name: 'departmentChoice',
            choices: departmentArray
        },
    ];
       
    inquirer
        .prompt(addRoleQ)
        .then(( { roleName, salary, departmentChoice }) => {
            // Insert the role, salary, department into the role table
            queryURL = `INSERT INTO role (title, salary, department_id)
            VALUES ('${ roleName }', ${ salary }, ${ departmentChoice } )`;
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                // Back to the main menu
                mainMenu();
            });
    });  
}

// Remove an employee from the employee table
function removeEmployee(employeeArr) {
    const addRemoveEmployeeQuestions = [
        {
            type: 'list',
            message: "Which employee would you like to remove?",
            name: 'employeeID',
            choices: employeeArr
        },
        {
            type: 'confirm',
            message: "Are you sure?",
            name: 'remove'
        }
    ];
    inquirer
        .prompt(addRemoveEmployeeQuestions)
        .then(( { employeeID, remove }) => {
            // Confirm removal
            if(remove) {
                queryURL = `DELETE FROM employee WHERE ${ employeeID } = id`
                connection.query(queryURL, function(err, res, field) {
                    if (err) throw err;
                    mainMenu();
                });
            }
            else {
                mainMenu();
            }
    });  
}

// Remove a department from the department table
function removeDept(departmentArray) {
    const addRemoveDeptQuestions = [
        {
            type: 'list',
            message: "Which department would you like to remove?",
            name: 'departmentID',
            choices: departmentArray
        },
        {
            type: 'confirm',
            message: "Are you sure?",
            name: 'remove'
        }
    ];
    inquirer
        .prompt(addRemoveDeptQuestions)
        .then(( { departmentID, remove }) => {
            if(remove) {
                queryURL = `DELETE FROM department WHERE ${ departmentID } = department.id`
                connection.query(queryURL, function(err, res, field) {
                    if (err) throw err;
                    mainMenu();
                });
            }
            else {
                mainMenu();
            }
    }); 
}

// Get a list of roles to pass to other functions
function getRolesList(reason) {
    const roles = [];
    queryURL = `SELECT title, id FROM role`;
    connection.query(queryURL, function(err, res, field) {
        if (err) throw err;
        
        for (let i = 0; i < res.length; i++) {
            let role = {
                name: res[i].title,
                value: res[i].id
            };
            roles.push(role);
        };
        switch(reason) {
            case 'remove': removeRole(roles); break;
        }
    });
}

// Remove a role from the role table
function removeRole(rolesArr) {
    const addRemoveRoleQuestions = [
        {
            type: 'list',
            message: "Which role would you like to remove?",
            name: 'roleID',
            choices: rolesArr
        },
        {
            type: 'confirm',
            message: "Are you sure?",
            name: 'remove'
        }
    ];
    inquirer
        .prompt(addRemoveRoleQuestions)
        .then(( { roleID, remove }) => {
            if(remove) {
                queryURL = `DELETE FROM role WHERE ${ roleID } = id`
            
                connection.query(queryURL, function(err, res, field) {
                    if (err) throw err;
                    mainMenu();
                });
            }
            else {
                mainMenu();
            }
    }); 
}

// Update employees role
function updateRole(employeeList, roleList) {
    const addUpdateQuestions = [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            name: 'employeeID',
            choices: employeeList
        },
        {
            type: 'list',
            message: "Which role would you like?",
            name: 'roleID',
            choices: roleList
        }
    ];
    inquirer
        .prompt(addUpdateQuestions)
        .then(( { employeeID, roleID }) => {
            queryURL = `UPDATE employee SET role_id = ${ roleID } WHERE ${ employeeID } = id`;
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                mainMenu();
            });
    });
}

// Updates employees manager
function updateManager(employeeArr, managerArr) {
    const addUpdateQuestions = [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            name: 'employeeID',
            choices: employeeArr
        },
        {
            type: 'list',
            message: "Which manager would you like?",
            name: 'managerID',
            choices: managerArr
        }
    ];
    inquirer
        .prompt(addUpdateQuestions)
        .then(( { employeeID, managerID }) => {
            if (managerID === 'None') {
                queryURL = `UPDATE employee SET manager_id = NULL WHERE ${ employeeID } = id`;
            }
            else {
                queryURL = `UPDATE employee SET manager_id = ${ managerID } WHERE ${ employeeID } = id`;
            }
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                mainMenu();
            });
    });
}

// Lists all the employees by (id, first_name, last_name, title, department, salary, manager name)
function viewEmployees() {
    queryURL = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id 
    LEFT JOIN department
    ON role.department_id = department.id 
    LEFT JOIN employee manager 
    ON manager.id = employee.manager_id;`;
    // console.log(queryURL);
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

// View all employees in a specified department
function viewEmployeesByDept(departmentArray) {
    const viewDeptQuestions = [
        {
            type: 'list',
            message: "Which department would you like to view?",
            name: 'departmentID',
            choices: departmentArray
        }
    ];
    inquirer
        .prompt(viewDeptQuestions)
        .then(( { departmentID }) => {
            queryURL = `SELECT employee.first_name, employee.last_name, department.dept_name 
            FROM employee INNER JOIN role
            ON (employee.role_id = role.id)
            INNER JOIN department
            ON (role.department_id = department.id)
            WHERE ( ${ departmentID } = department.id);`
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
    }); 
}

// View all employees from a specified manager
function viewEmployeesByManager(employeeArr) {
    const viewManagerQuestions = [
        {
            type: 'list',
            message: "Which manager would you like to view?",
            name: 'managerID',
            choices: employeeArr
        }
    ];
    console.log("SELECT * FROM employees WHERE manager = manager_id");
    inquirer
        .prompt(viewManagerQuestions)
        .then(( { managerID }) => {
            queryURL = `SELECT id, first_name, last_name FROM employee 
            WHERE ( ${ managerID } = manager_id);`
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                console.table(res);
                mainMenu();
            });
    }); 
}              
 
// View all departments
function viewDept() {
    queryURL = `SELECT * FROM department`;
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

// View all roles
function viewRoles() {
    queryURL = `SELECT role.id, role.title, role.salary, department.dept_name 
    FROM role INNER JOIN department
    ON (role.department_id = department.id)`;
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}
   
// Exit/end connection to db
function exitProgram() {
    connection.end();
}
            