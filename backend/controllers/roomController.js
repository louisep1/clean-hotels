const connection = require('../config/db')

// examples of queries that work:
// SELECT * FROM availability WHERE date='2022-09-01';
// SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id;

// SELECT * FROM rooms INNER JOIN availability ON availability.room_id = rooms.id;

// SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id WHERE rooms.location='tokyo' AND rooms.type='single' AND availability.date='2022-09-01';

// @@@@@  GET
// @@@@@  /api/rooms/filter/tokyo&single&2022-09-01
const searchRooms = async (req, res) => {
  const { location, type, date } = req.params

  try {
    const query =
      'SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id WHERE rooms.location=? AND rooms.type=? AND availability.date=?;'

    const searchResults = await connection.query(
      query,
      [location, type, date],
      (err, results) => {
        if (err) throw new Error(err.message)

        if (results) {
          console.log(results)
          res.json(results)
        }
      }
    )
    if (!searchResults) throw new Error('Could not search')
  } catch (error) {
    console.log(error)
  }
}

const reserveRooms = () => {}

module.exports = {
  searchRooms,
  reserveRooms,
}
