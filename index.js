const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const sqlQueries = require('./queries/sqlQueries');
const departments = [];
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
  db.query(`SELECT first_name, last_name FROM employees ORDER BY id ASC`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      for(let i = 0; i < result.length; i++) {
        let newStr = result[i].first_name + " " + result[i].last_name
        employees.push(newStr);
      }
    }
  });
}

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
    .prompt(inquirerQueries.addDepartment)
    .then(({ depName }) => {
      if ((depName.length > 0) && (depName.length <= 30)) {
        db.query(sqlQueries.addDepartment, depName, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`Added '${depName}' to departments!`);
          }
          choose();
        })
      }
    })
}

function addARole() {
  // inquirer
  //   .prompt(inquirerQueries.addRole)
  //   .then(({ title, salary, department_id }) => {
  //     if ((title.length > 0) && (title.length <= 30) && (typeof salary === "string")) {
  //       const elems = [];
  //       elems.push(title);
  //       elems.push(salary);
  //       elems.push(department_id);
  //       db.query(sqlQueries.addRole, elems, (err) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           console.log(`Added '${depName}' to departments!`);
  //         }
  //         choose();
  //       })
  //     } else {
  //       console.log("Invalid input for role");
  //       choose();
  //     }
  //   })
}

function addAEmployee() {
  console.log(`Selected 'add an employee'`);
  choose();
}

function updateAnEmployeeRole() {
  console.log(`Selected 'add an employee role'`);
  choose();
}

init();
// choose();
