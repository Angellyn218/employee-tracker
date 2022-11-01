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
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
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
  .then(choice => {
    switch (choice) {
      case "view all departments":
        // code
        break;
      case "view all roles":
        // code
        break;
      case "view all employees":
        // code
        break;
      case "add a department":
        // code
        break;
      case "add a role":
        // code
        break;
      case "add an employee":
        // code
        break;
      case "update an employee role":
        // code
        break;
      case "quit":
        console.log("See you again next time!");
      default:
        return;
    }
  })
};

