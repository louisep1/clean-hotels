const express = require('express')
const router = express.Router()
const { searchRooms, reserveRoom } = require('../controllers/roomController')

// router.get('/', (req, res) => {
//   res.send('Test')
// })

// Both of these work:
// router.get('/filter/:location/:type/:date', searchRooms)
// http://localhost:5000/api/rooms/filter/tokyo/single/2022-09-01

router.get('/filter/:location&:checkIn&:checkOut', searchRooms)
router.put('/reserve', reserveRoom)

// router.get('/filter/:location&:type&:date', searchRooms)
// http://localhost:5000/api/rooms/filter/tokyo&single&2022-09-01

// https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express

module.exports = router
