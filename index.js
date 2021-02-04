const inquirer = require('inquirer');
const fs = require('fs');

const mainMenu = [
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
            'View all roles'   
        ]
    }
]

function init() {
    console.log("Print employee log here");
    inquirer.prompt(mainMenu)
        .then((response) => {
            console.log(response);
        });
}

init();