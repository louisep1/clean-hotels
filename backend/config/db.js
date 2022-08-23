const mysql = require('mysql')
const dotenv = require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
})

connection.connect(err => {
  if (err) console.log(`Error connection: ${err.stack}`)

  console.log(`connected as ${connection.threadId}`)
})

module.exports = connection
