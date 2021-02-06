const mainMenuQ = [
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
]

const addDeptQ = [
    {
        type: 'input',
        message: "Department name?",
        name: 'departmentName'
    }
];

const addEmployeeQ = [
    {
        type: 'input',
        message: "First name?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "Last name?",
        name: 'LastName',
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
]

module.exports = { mainMenuQ, addDeptQ, addEmployeeQ };
