const mysql = require('mysql2')
// const mysql = require('mysql')
const dotenv = require('dotenv').config()

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
})

module.exports = connection
