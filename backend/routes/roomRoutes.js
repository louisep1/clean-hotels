const express = require('express')
const router = express.Router()
const { searchRooms } = require('../controllers/roomController')

// router.get('/', (req, res) => {
//   res.send('Test')
// })

router.get('/filter/:query', searchRooms)

module.exports = router
