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

module.exports = { mainMenuQ, addDeptQ };
