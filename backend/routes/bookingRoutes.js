const express = require('express')
const router = express.Router()
const { newBooking } = require('../controllers/bookingController')

router.post('/new', newBooking)

module.exports = router
