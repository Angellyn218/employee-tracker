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