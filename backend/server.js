const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/rooms', require('./routes/roomRoutes'))
// app.use('/api/reservations', require('./routes/reservationRoutes'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
