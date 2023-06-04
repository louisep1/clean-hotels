const connection = require('../config/db')

// @@@@@  GET
// @@@@@  /api/rooms/filter/:location&:checkIn&:checkOut  (/api/rooms//filter/tokyo&single&2022-09-01&2022-09-02)
const searchRooms = (req, res) => {
  const { location, checkIn, checkOut } = req.params

  const query = `
    SELECT 
      r.id,
      room_number,
      location,
      type,
      rate,
      date,
      a.available,
      a.id AS room_date_id
    FROM availability a
    JOIN rooms r
      ON a.room_id = r.id 
    WHERE 
      r.location=? AND a.available=? 
      AND 
      date >= ? AND date < ?;
    `

  // backend QUERY returns all the dates available in this range, doesn't error if every date is not available
  // (returns an empty array if ALL dates in the range are not available)
  // frontend checks that all dates in the range are available

  connection.query(query, [location, 1, checkIn, checkOut], (err, results) => {
    if (err) console.log(err)

    if (results) {
      res.json(results)
    }
  })
}

// @@@@@  PUT
// @@@@@  /api/rooms/reserve
const reserveRoom = async (req, res) => {
  const { dateRoomIdArray, available } = req.body

  const queryArray = dateRoomIdArray.map(dateRoomId => 'id = ?')
  const queryString = queryArray.join(' OR ')

  const query =
    `UPDATE availability SET available = ? WHERE ` + queryString + ';'

  // connection.query(
  //   query,
  //   [available === true ? 1 : 0, ...dateRoomIdArray],
  //   (err, results) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       res.json(results)
  //     }
  //   }
  // )
  console.log('test')
  try {
    await connection.query(
      query,
      [available === true ? 1 : 0, ...dateRoomIdArray],
      (err, results) => {
        if (err) {
          console.log(err)
          // !!! if it errors, the frontend needs to not display the reservation confirmation message
        } else {
          console.log('results', results)
          res.json(results)
          return results
        }
      }
    )
  } catch (error) {
    console.log(error)
    console.log('test 2')
    // !!! if it errors, the frontend needs to not display the reservation confirmation message
    // throw some error
  }
}

module.exports = {
  searchRooms,
  reserveRoom,
}
