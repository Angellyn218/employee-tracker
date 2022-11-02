const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const sqlQueries = require('./queries/sqlQueries');
const inquirerQueries = require('./queries/inquirerQueries')
let departments = [];
let roles = [];
let employees = [];

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

function init() {
  setDepartments();
  setRoles();
  setEmployees();
  choose();
}

function setDepartments() {
  departments = [];
  db.query(`SELECT name FROM departments ORDER BY id ASC`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      for(let i = 0; i < result.length; i++) {
        departments.push(result[i].name);
      }
    }
  });
}

function setRoles() {
  roles = [];
  db.query(`SELECT title FROM roles ORDER BY id ASC`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      for(let i = 0; i < result.length; i++) {
        roles.push(result[i].title);
      }
    }
  });
}

function setEmployees() {
  employees = [];
  db.query(`SELECT first_name, last_name FROM employees ORDER BY id ASC`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      for(let i = 0; i < result.length; i++) {
        let newStr = result[i].first_name + " " + result[i].last_name
        employees.push(newStr);
      }
      employees.push("This employee has no manager");
    }
  });
}

function choose() {
  console.log(departments);
  console.log(roles);
  console.log(employees);
  inquirer
    .prompt([{
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department", 
        "add a role", 
        "add an employee",
        "update an employee role",
        "quit"]
  }])
  .then(({ choice }) => {
    switch (choice) {
      case "view all departments":
        viewAllDepartments();
        break;
      case "view all roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      case "add a department":
        addADepartment();
        break;
      case "add a role":
        addARole();
        break;
      case "add an employee":
        addAEmployee();
        break;
      case "update an employee role":
        updateAnEmployeeRole();
        break;
      case "quit":
        console.log("See you again next time!");
        db.end();
        break;
      default:
        console.log("Not a valid option.");
        db.end();
        return;
    }
  })
};

function viewAllDepartments() {
  db.query(sqlQueries.viewDepartments, (err, result) => {
    if (err) {
      console.error(err)
    }
    console.table(result);
    choose();
  })
}

function viewAllRoles() {
  db.query(sqlQueries.viewRoles, (err, result) => {
    if (err) {
      console.error(err)
    }
    console.table(result);
    choose();
  })
}

function viewAllEmployees() {
  db.query(sqlQueries.viewEmployees, (err, result) => {
    if (err) {
      console.error(err)
    }
    console.table(result);
    choose();
  })
}

function addADepartment() {
  inquirer
    .prompt([{
      type: 'input',
      name: 'depName',
      message: "What is the name of the department that you want to add?"
    }])
    .then(({ depName }) => {
      if ((depName.length > 0) && (depName.length <= 30)) {
        db.query(sqlQueries.addDepartment, depName, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Added '${depName}' to departments!`);
          }
          setDepartments();
          choose();
        })
      } else {
        console.log("Invalid input for department");
        choose();
      }
    })
}

function addARole() {
  inquirer
    .prompt([{ 
      type: 'input',
      name: 'title',
      message: "What is the title of the role that you want to add?"
  }, { 
      type: 'input',
      name: 'salary',
      message: "What is the salary of this role?"
  }, { 
      type: 'list',
      name: 'department',
      message: "What is the department that this role belongs to?",
      choices: departments
  }])
    .then(({ title, salary, department }) => {
      if ((title.length > 0) && (title.length <= 30) && (typeof salary === "string")) {
        const elems = [];
        elems.push(title);
        elems.push(salary);

        let department_id = departments.indexOf(department) + 1;
        elems.push(department_id);
        db.query(sqlQueries.addRole, elems, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Added '${title}' role!`);
          }
          setRoles();
          choose();
        })
      } else {
        console.log("Invalid input for role");
        choose();
      }
    })
}

function addAEmployee() {
  inquirer
    .prompt([{
      type: 'input',
      name: 'first_name',
      message: "What is the first name of this employee?"
    }, {
      type: 'input',
      name: 'last_name',
      message: "What is the last name of this employee?"
    }, { 
      type: 'list',
      name: 'role',
      message: "What role does this employee have?",
      choices: roles
    }, { 
      type: 'list',
      name: 'manager',
      message: "Who is this employee's manager?",
      choices: employees
    }])
    .then(({ first_name, last_name, role, manager }) => {
      if ((first_name.length > 0) && (first_name.length <= 30) && (last_name.length > 0) && (last_name.length <= 30)) {
        const elems = [];
        elems.push(first_name);
        elems.push(last_name);

        let role_id = roles.indexOf(role) + 1;
        elems.push(role_id);
        let manager_id = employees.indexOf(manager) + 1;
        if (manager_id === employees.length) {
          manager_id = null;
        }
        elems.push(manager_id)
        db.query(sqlQueries.addEmployee, elems, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Added '${first_name} ${last_name}' as a ${role}!`);
          }
          setEmployees();
          choose();
        })
      } else {
        console.log("Invalid input for employee");
        choose();
      }
    })
}

function updateAnEmployeeRole() {
  console.log(`Selected 'add an employee role'`);
  choose();
}

init();
// choose();
