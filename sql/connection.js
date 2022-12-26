// % Get the client
const mysql = require('mysql2');

// % Bringing in the dotenv package so we can access the variables in the .env file.
require('dotenv').config();
// console.log(process.env);

// % Destructuring process.env object and assigning variables.
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

// % Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  port: DB_PORT,
  password: DB_PASSWORD,
});

module.exports = pool;
