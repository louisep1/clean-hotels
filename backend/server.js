const express = require('express')
const dotenv = require('dotenv').config()
const mysql = require('mysql')

const app = express()

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}`)
)
