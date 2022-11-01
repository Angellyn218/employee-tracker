const inquirerQueries = {
    addDepartment: [{
        type: 'input',
        name: 'depName',
        message: "What is the name of the department that you want to add?"
    }],
    addRole: [{ 
        type: 'input',
        name: 'title',
        message: "What is the title of the role that you want to add?"
    }, { 
        type: 'input',
        name: 'salary',
        message: "What is the salary of this role?"
    }, { 
        type: 'rawList',
        name: 'department_id',
        message: "What is the department that this role belongs to?",
        choices: [""]
    }],
    addEmployee: "",
    updateEmployeeRole: ""
}

module.exports = inquirerQueries;