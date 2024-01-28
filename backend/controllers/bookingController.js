const connection = require('../config/db')

// @@@@@  POST
// @@@@@  /api/bookings/new
const newBooking = (req, res) => {
  console.log('req.body', req.body)
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
  } = req.body.booking

  // !!!!! FIRST, we need to check the room we are booking is actually still available => then change the room to unavailable => then create the booking for the room
  // In this case, it is better to use transactions to roll back if query fails
  // (problem: since we are not re-checking room availability, you can create multiple bookings for the same room in different tabs)

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
        // !!! add proper errors for different cases here:
        res.status(500).send({ message: 'booking could not be created' })
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
