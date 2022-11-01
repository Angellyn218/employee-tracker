const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const sqlQueries = require('./queries/sqlQueries');

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

function choose() {
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
  console.log(`Selected 'view all roles'`);
  choose();
}

function viewAllEmployees() {
  console.log(`Selected 'view all employees'`);
  choose();
}

function addADepartment() {
  console.log(`Selected 'add a department'`);
  choose();
}

function addARole() {
  console.log(`Selected 'add a role'`);
  choose();
}

function addAEmployee() {
  console.log(`Selected 'add an employee'`);
  choose();
}

function updateAnEmployeeRole() {
  console.log(`Selected 'add an employee role'`);
  choose();
}

choose();
