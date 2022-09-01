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

  // !!! this QUERY returns all the dates available in this range, but it doesn't error if every date is not available,
  // => so need to filter through this again - frontend?
  // returns an empty array if ALL dates in the range are not available

  connection.query(query, [location, 1, checkIn, checkOut], (err, results) => {
    if (err) console.log(err)
    // if (err) throw new Error(err.message)
    // !!!! this error doesn't work here because not async await syntax

    if (results) {
      res.json(results)
    }
  })
}

// @@@@@  PUT
// @@@@@  /api/rooms/reserve
const reserveRoom = (req, res) => {
  const { dateRoomIdArray, available } = req.body
  // this is an array of dates

  // UPDATE users SET email = 'freddy@gmail.com' WHERE id = 2;

  // const queryArray = dateRoomIdArray.map(dateRoomId => {
  //   return `UPDATE availability SET available = ${
  //     available ? 1 : 0
  //   } WHERE id = ?;`
  // })

  // console.log(queryArray)

  // const queryString = queryArray.join(' ')

  // const query = `
  // UPDATE availability
  // SET available = ?
  // WHERE id = ?
  // `

  const queryString = `UPDATE availability SET available = 0 WHERE id = 621;`

  // connection.query(queryString, dateRoomIdArray, (err, results) => {
  connection.query(queryString, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Success!')
      console.log(results)
    }
  })
}

module.exports = {
  searchRooms,
  reserveRoom,
}
