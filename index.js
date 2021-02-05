const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
// const mainMenuQuestions = require('./lib/questions.js');
// console.log(questions);
// const { allowedNodeEnvironmentFlags, exit } = require('process');

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

const mainMenuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'selection',
        choices: [
            'Add employee',
            'Add department',
            'Add role',
            'Remove employee',
            'Remove department',
            'Remove role',
            'Update employee role',
            'Update employee manager',
            'View all employees',
            'View all employees by Department',
            'View all employees by Manager',
            'View all departments',
            'View all roles',
            'Exit'   
        ]
    }
];

function mainMenu() {
       
    inquirer
        .prompt(mainMenuQuestions)
        .then(({ selection }) => {
            console.log(selection);
            switch(selection) {
                case 'Add employee':  addEmployee(); break;
                case 'Add department':  addDept(); break;
                case 'Add role':        addRole(); break;
                case 'Remove employee': removeEmployee(); break;
                case 'Remove department': removeDept(); break;
                case 'Remove role': removeRole(); break;
                case 'Update employee role': updateRole(); break;
                case 'Update employee manager': updateManager(); break;
                case 'View all employees': viewEmployees(); break;
                case 'View all employees by Department': viewEmployeesByDept(); break;
                case 'View all employees by Manager': viewEmployeesByManager(); break;
                case 'View all departments': viewDept(); break;
                case 'View all roles': viewRoles(); break;
                case 'Exit': exitProgram(); break;
                default: console.log("Default"); mainMenu(); break;
            }
        });
        
}

function addEmployee() {
    console.log("Adding employee");

    console.log("Needs to be populated by MySQL");
    
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
            choices: [
                'MySQL role choices'
            ]
        },
        {
            type: 'list',
            message: "Manager?",
            name: 'employeeManager',
            choices: [
                "MySQL manager choices"
            ]
        }
    ];

    inquirer
        .prompt(addEmployeeQ)
        .then(( { firstName, lastName, employeeRole, employeeManager }) => {
            console.log(`Put in db: ${ firstName }, ${ lastName }, ${ employeeRole }, ${ employeeManager }`);
            mainMenu();
        });
}

function addDept() {
    const addDeptQuestions = [
        {
            type: 'input',
            message: "Department name?",
            name: 'departmentName'
        }
    ];
    inquirer
        .prompt(addDeptQuestions)
        .then(( { departmentName }) => {
            console.log(`Add ${ departmentName } to department table in SQL`);
            mainMenu();
    });
}

function addRole() {
    const addRoleQuestions = [
        {
            type: 'input',
            message: "Title?",
            name: 'roleName'
        },
        {
            type: 'number',
            message: "Salary?",
            name: 'salary'
        }
    ];
    inquirer
        .prompt(addRoleQuestions)
        .then(( { roleName, salary }) => {
            console.log(`Add ${ roleName }, salary ${ salary } to role table in SQL`);
            mainMenu();
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

function removeDept() {
    const addRemoveDeptQuestions = [
        {
            type: 'list',
            message: "Which department would you like to remove?",
            name: 'departmentName',
            choices: [
                'Need a query of department names here'
            ]
        },
        {
            type: 'confirm',
            message: "Are you sure?",
            name: 'remove'
        }
    ];
    inquirer
        .prompt(addRemoveDeptQuestions)
        .then(( { departmentName, remove }) => {
            console.log(`Remove ${ departmentName } from the department table. ${ remove } I'm sure.`);
            mainMenu();
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

function viewEmployeesByDept() {
    console.log("SELECT * FROM employees WHERE role_id = dept");
    mainMenu();
}

function viewEmployeesByManager() {
    console.log("SELECT * FROM employees WHERE manager = manager_id");
    mainMenu();
}              
 
function viewDept() {
    queryURL = `SELECT * FROM department`;
    console.log(queryURL);
    connection.query(queryURL, function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewRoles() {
    queryURL = `SELECT * FROM role`;
    console.log(queryURL);
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