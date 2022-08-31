const connection = require('../config/db')

// @@@@@  GET
// @@@@@  /api/rooms//filter/:location&:checkIn&:checkOut  (/api/rooms//filter/tokyo&single&2022-09-01&2022-09-02)

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
    // if (err) throw new Error(err.message)
    // !!!! this error doesn't work here because not async await

    if (results) {
      res.json(results)
    }
  })
}

const reserveRooms = () => {}

module.exports = {
  searchRooms,
  reserveRooms,
}
