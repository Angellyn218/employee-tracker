const sqlQueries = {
    viewDepartments: `SELECT * FROM departments
    ORDER BY id ASC`,
    viewRoles: `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
    FROM roles JOIN departments 
    ON roles.department_id = departments.id
    ORDER BY id ASC`,
    viewEmployees: "",
    addDepartment: "",
    addRole: "",
    addEmployee: "",
    updateEmployeeRole: ""
};

module.exports = sqlQueries;