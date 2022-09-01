const express = require('express')
const router = express.Router()
const { searchRooms, reserveRoom } = require('../controllers/roomController')

// Both of these work:
// router.get('/filter/:location/:checkIn/:checkOut', searchRooms)
// http://localhost:5000/api/rooms/filter/tokyo/2022-09-01/2022-09-03

router.get('/filter/:location&:checkIn&:checkOut', searchRooms)
router.put('/reserve', reserveRoom)

// https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express

module.exports = router
