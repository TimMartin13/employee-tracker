const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
const questions = require('./lib/questions.js');

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

function mainMenu() {
       
    inquirer
        .prompt(questions.mainMenuQ)
        .then(({ selection }) => {
            console.log(selection);
            switch(selection) {
                case 'Add employee':                        addEmployee();  break;
                case 'Add department':                      addDept();                  break;
                case 'Add role':                            getDepartmentList("addRole");                  break;
                case 'Remove employee':                     removeEmployee();           break;
                case 'Remove department':                   getDepartmentList("removeDept");               break;
                case 'Remove role':                         removeRole();               break;
                case 'Update employee role':                updateRole();               break;
                case 'Update employee manager':             updateManager();            break;
                case 'View all employees':                  viewEmployees();            break;
                case 'View all employees by Department':    getDepartmentList("viewEmployees");      break;
                case 'View all employees by Manager':       viewEmployeesByManager();   break;
                case 'View all departments':                viewDept();                 break;
                case 'View all roles':                      viewRoles();                break;
                case 'Exit':                                exitProgram();              break;
                default: console.log("Default");            mainMenu();                 break;
            }
        });
        
}

function addEmployee() {
    console.log("Adding employee");

    // queryURL = `SELECT employee (first_name, last_name, role_id, manager_id)
    //         VALUES ("${ firstName }", ${ lastName }, ${ employeeRole }, ${ employeeManager });`;
    //         console.log(queryURL);
    //         connection.query(queryURL, function(err, res, field) {
    //         if (err) throw err;
    //         console.table(res);
    //         mainMenu();
    //         });

    inquirer
        .prompt(questions.addEmployeeQ)
        .then(( { firstName, lastName, employeeRole, employeeManager }) => {
            console.log(`Put in db: ${ firstName }, ${ lastName }, ${ employeeRole }, ${ employeeManager }`);
            queryURL = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ("${ firstName }", ${ lastName }, ${ employeeRole }, ${ employeeManager });`;
            console.log(queryURL);
            connection.query(queryURL, function(err, res, field) {
            if (err) throw err;
            console.table(res);
            mainMenu();
            });
            
        });
}

function addDept() {
    inquirer
        .prompt(questions.addDeptQ)
        .then(( { departmentName }) => {
            queryURL = `INSERT INTO department (dept_name)
            VALUES ("${ departmentName }");`;
            connection.query(queryURL, function(err) {
            if (err) throw err;
            mainMenu();
            });
    });
}

function getDepartmentList(reason) {
    const departments = [];
    queryURL = `SELECT dept_name, id FROM department`;

    connection.query(queryURL, function(err, res, field) {
        if (err) throw err;
        
        for (let i = 0; i < res.length; i++) {
            let department = {
                name: res[i].dept_name,
                value: res[i].id
            };
            departments.push(department);
        };
        
        switch(reason) {
            case 'addRole': addRole(departments); break;
            case 'removeDept': removeDept(departments); break;
            case 'viewEmployees': viewEmployeesByDept(departments); break;
        }
    });
}

function addRole(departmentArray) {
    
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
            queryURL = `INSERT INTO role (title, salary, department_id)
            VALUES ('${ roleName }', ${ salary }, ${ departmentChoice } )`;
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                mainMenu();
            });
    });  
}

function removeEmployee() {
    const addRemoveEmployeeQuestions = [
        {
            type: 'list',
            message: "Which employee would you like to remove?",
            name: 'employeeName',
            choices: [
                'Need a query of employee names here'
            ]
        },
        {
            type: 'confirm',
            message: "Are you sure?",
            name: 'remove'
        }
    ];
    inquirer
        .prompt(addRemoveEmployeeQuestions)
        .then(( { employeeName, remove }) => {
            console.log(`Remove ${ employeeName } from the employee table. ${ remove } I'm sure.`);
            mainMenu();
    });  
}

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
            }
            connection.query(queryURL, function(err, res, field) {
                if (err) throw err;
                mainMenu();
            });
    }); 
}

function removeRole() {
    const addRemoveRoleQuestions = [
        {
            type: 'list',
            message: "Which role would you like to remove?",
            name: 'roleName',
            choices: [
                'Need a query of role names here'
            ]
        },
        {
            type: 'confirm',
            message: "Are you sure?",
            name: 'remove'
        }
    ];
    inquirer
        .prompt(addRemoveRoleQuestions)
        .then(( { roleName, remove }) => {
            console.log(`Remove ${ roleName } from the role table. ${ remove } I'm sure.`);
            mainMenu();
    }); 
}

function updateRole() {
    const addUpdateQuestions = [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            name: 'employeeName',
            choices: [
                'Need a query of employee names here'
            ]
        },
        {
            type: 'list',
            message: "Which role would you like?",
            name: 'roleName',
            choices: [
                'Need a query of roles here'
            ]
        }
    ];
    inquirer
        .prompt(addUpdateQuestions)
        .then(( { employeeName, roleName }) => {
            console.log(`Update ${ employeeName } to ${ roleName } in SQL`);
            mainMenu();
    });
}

function updateManager() {
    const addUpdateQuestions = [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            name: 'employeeName',
            choices: [
                'Need a query of employee names here'
            ]
        },
        {
            type: 'list',
            message: "Which manager would you like?",
            name: 'managerName',
            choices: [
                'Need a query of employees here'
            ]
        }
    ];
    inquirer
        .prompt(addUpdateQuestions)
        .then(( { employeeName, managerName }) => {
            console.log(`Update ${ employeeName } to ${ managerName } in SQL`);
            mainMenu();
    });
}

function viewEmployees() {
    queryURL = `SELECT * FROM employee`;
    console.log(queryURL);
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewEmployeesByDept(departmentArray) {
    const addRemoveDeptQuestions = [
        {
            type: 'list',
            message: "Which department would you like to view?",
            name: 'departmentID',
            choices: departmentArray
        }
    ];
    inquirer
        .prompt(addRemoveDeptQuestions)
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

function viewEmployeesByManager() {
    console.log("SELECT * FROM employees WHERE manager = manager_id");
    queryURL = `SELECT * FROM employee`;
    console.log(queryURL);
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });

    mainMenu();
}              
 
function viewDept() {
    queryURL = `SELECT * FROM department`;
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewRoles() {
    queryURL = `SELECT * FROM role`;
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}
   
function exitProgram() {
    connection.end();
}
                
// mainMenu();