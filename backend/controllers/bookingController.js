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

    const helperQueryDateArray = reservedDateRoomIds.map(dateRoomId => 'id = ?')
    const helperQueryDateString = helperQueryDateArray.join(' OR ')

    const queryRoomStillAvailable =
      `SELECT
      id,
      date,
      available
    FROM availability
    WHERE ` +
      helperQueryDateString +
      ';'
    const [availabilityData, availabilityMeta] = await connection.execute(
      queryRoomStillAvailable,
      reservedDateRoomIds
    )
    const datesNotAvailable = availabilityData.some(
      date => date.available === 0
    )
    if (datesNotAvailable) {
      throw new Error('dates no longer available')
    }

    const queryUpdateRoomUnavailable =
      `UPDATE availability SET available = 0 WHERE ` +
      helperQueryDateString +
      ';'
    await connection.execute(queryUpdateRoomUnavailable, reservedDateRoomIds)

    const queryCreateBooking = `
    INSERT INTO bookings 
    (email, room_id, checkIn, checkOut, nights, booking_date, paid_date, total, guests) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `
    const [response, meta] = await connection.query(queryCreateBooking, [
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
    if (connection) await connection.query('ROLLBACK')
    const message = error.message || 'booking could not be created'
    res.status(500).send({ message })
  } finally {
    if (connection) connection.release()
  }
}

module.exports = {
  newBooking,
}
