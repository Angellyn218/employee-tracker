const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});