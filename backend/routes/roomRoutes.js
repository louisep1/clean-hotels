const express = require('express')
const router = express.Router()
const { searchRooms } = require('../controllers/roomController')

// router.get('/', (req, res) => {
//   res.send('Test')
// })

// Both of these work:
// router.get('/filter/:location/:type/:date', searchRooms)
// http://localhost:5000/api/rooms/filter/tokyo/single/2022-09-01

router.get('/filter/:location&:type&:date', searchRooms)
// http://localhost:5000/api/rooms/filter/tokyo&single&2022-09-01

module.exports = router
