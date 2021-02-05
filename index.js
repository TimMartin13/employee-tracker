const inquirer = require('inquirer');
const fs = require('fs');
// const mainMenuQuestions = require('./lib/questions.js');
// console.log(questions);
const { allowedNodeEnvironmentFlags, exit } = require('process');

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
    console.log("Print employee log here");
    
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
    console.log("Updating role");
    mainMenu();
}

function updateManager() {
    console.log("Updating manager");
    mainMenu();
}

function viewEmployees() {
    console.log("Viewing employees");
    mainMenu();
}

function viewEmployeesByDept() {
    console.log("Viewing employees by dept");
    mainMenu();
}

function viewEmployeesByManager() {
    console.log("Viewing employees by manager");
    mainMenu();
}              
 
function viewDept() {
    console.log("Viewing departments");
    mainMenu();
}

function viewRoles() {
    console.log("Viewing roles");
    mainMenu();
}
   
function exitProgram() {
    console.log("exiting");
    exit();
}
                
mainMenu();