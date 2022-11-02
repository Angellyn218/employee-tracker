const sqlQueries = {
    viewDepartments: `SELECT * FROM departments
    ORDER BY id ASC`,
    viewRoles: `SELECT roles.id, roles.title, departments.name AS department, roles.salary  
    FROM roles JOIN departments 
    ON roles.department_id = departments.id
    ORDER BY id ASC`,
    viewEmployees: `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, departments.name AS department, roles.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager
    FROM employees employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employee.manager_id = manager.id
    ORDER BY id ASC`,
    addDepartment: `INSERT INTO departments (name)
    VALUES (?)`,
    addRole: `INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)`,
    addEmployee: `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`,
    updateEmployeeRole: `UPDATE employees SET role_id = ? WHERE employees.id = ?`
};

module.exports = sqlQueries;