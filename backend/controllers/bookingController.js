const pool = require('../config/db')

// @@@@@  POST
// @@@@@  /api/bookings/new
const newBooking = async (req, res) => {
  let connection
  try {
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
      reservedDateRoomIds,
    } = req.body
    connection = await pool.getConnection()
    await connection.query('START TRANSACTION')
    // const queryRoomStillAvailable = ''

    console.log(reservedDateRoomIds)
    const queryDateArray = reservedDateRoomIds.map(dateRoomId => 'id = ?')
    const queryDateString = queryDateArray.join(' OR ')

    const querySetRoomUnavailable =
      `UPDATE availability SET available = 0 WHERE ` + queryDateString + ';'
    await connection.execute(querySetRoomUnavailable, reservedDateRoomIds)

    // !!!!! FIRST, we need to check the room we are booking is actually still available => then change the room to unavailable => then create the booking for the room
    // In this case, it is better to use transactions to roll back if query fails
    // (problem: since we are not re-checking room availability, you can create multiple bookings for the same room in different tabs)

    const query = `
    INSERT INTO bookings 
    (email, room_id, checkIn, checkOut, nights, booking_date, paid_date, total, guests) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `

    const [response, meta] = await connection.query(query, [
      email,
      room_id,
      checkIn,
      checkOut,
      nights,
      booking_date,
      paid_date,
      total,
      guests,
    ])
    await connection.query('COMMIT')
    console.log('response', response)
    console.log('meta', meta)
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
  } catch (error) {
    // !!! later go back and test this rollback actually works
    // !!! also when backend fails, frontend needs to show an error
    console.log(error)
    if (connection) await connection.query('ROLLBACK')
    res.status(500).send({ message: 'booking could not be created' })
  } finally {
    if (connection) connection.release()
  }
}

module.exports = {
  newBooking,
}
