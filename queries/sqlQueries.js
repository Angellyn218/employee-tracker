const sqlQueries = {
    viewDepartments: `SELECT * FROM departments
    ORDER BY id ASC`,
    viewRoles: `SELECT roles.id, roles.title, departments.name AS department, roles.salary  
    FROM roles JOIN departments 
    ON roles.department_id = departments.id
    ORDER BY id ASC`,
    viewEmployees: `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS job_title, departments.name AS department, roles.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employees employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employee.manager_id = manager.id
    ORDER BY id ASC`,
    addDepartment: `INSERT INTO departments (name)
    VALUES (?)`,
    addRole: "",
    addEmployee: "",
    updateEmployeeRole: ""
};

module.exports = sqlQueries;