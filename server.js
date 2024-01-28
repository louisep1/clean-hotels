const path = require('path')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/rooms', require('./backend/routes/roomRoutes'))
app.use('/api/bookings', require('./backend/routes/bookingRoutes'))

// For deployment:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, './', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))
