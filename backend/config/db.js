const mysql = require('mysql2/promise')
const dotenv = require('dotenv').config()

// const pool = mysql.createPool(process.env.DATABASE_URL)

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})
// had to grant permission for this user to all ip addresses in phpmyadmin for this to work:
//stackoverflow.com/questions/19101243/error-1130-hy000-host-is-not-allowed-to-connect-to-this-mysql-server
module.exports = pool
