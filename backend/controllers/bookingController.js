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
  } = req.body

  const query = `
    INSERT INTO bookings 
    (email, room_id, checkIn, checkOut, nights, booking_date, paid_date, total) 
    values (?, ?, ?, ?, ?, ?, ?, ?);
  `

  connection.query(
    query,
    [email, room_id, checkIn, checkOut, nights, booking_date, paid_date, total],
    err => {
      // if (err) throw new Error(err.message)
      if (err) {
        console.log(err.message)
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
        })
      }
    }
  )
}

module.exports = {
  newBooking,
}
