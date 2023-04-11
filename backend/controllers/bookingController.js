const connection = require('../config/db')

// @@@@@  POTS
// @@@@@  /api/bookings/new
const newBooking = (req, res) => {
  const {
    email,
    room_id,
    checkIn,
    checkOut,
    nights,
    booking_date,
    paid_date,
    total,
    guests,
  } = req.body

  const query = `
    INSERT INTO bookings 
    (email, room_id, checkIn, checkOut, nights, booking_date, paid_date, total, guests) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `

  connection.query(
    query,
    [
      email,
      room_id,
      checkIn,
      checkOut,
      nights,
      booking_date,
      paid_date,
      total,
      guests,
    ],
    err => {
      if (err) {
        console.log(err.message)
        // !!! add proper errors
      } else {
        res.json({
          email,
          room_id,
          checkIn,
          checkOut,
          nights,
          booking_date,
          paid_date,
          total,
          guests,
        })
      }
    }
  )
}

module.exports = {
  newBooking,
}
