const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table')

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
  choose();
}

const prompt = 
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

function choose() {
  prompt.then(({ choice }) => {
    if (choice === "view all departments") {
      viewAllDepartments();
    } else if (choice === "view all roles") {
      viewAllRoles();
    } else if (choice === "view all employees") {
      viewAllEmployees();
    } else if (choice === "add a department") {
      addADepartment();
    } else if (choice === "add a role") {
      addARole();
    } else if (choice === "add an employee") {
      addAEmployee();
    } else if (choice === "update an employee role") {
      updateAnEmployeeRole();
    } else if (choice === "quit") {
      console.log(`See you again next time!`);
      exit();
    } else {
      console.log("Not an available option. Please try again!");
      choose();
    }
  });
}

function viewAllDepartments() {
  console.log(`Selected 'view all departments'`);
  choose();
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

function exit() {
  prompt.ui.close();
}

init();
