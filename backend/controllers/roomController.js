const connection = require('../config/db')

// examples of queries that work:
// SELECT * FROM availability WHERE date='2022-09-01';
// SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id;

// SELECT * FROM rooms INNER JOIN availability ON availability.room_id = rooms.id;

// SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id WHERE rooms.location='tokyo' AND rooms.type='single' AND availability.date='2022-09-01';

// @@@@@  GET
// @@@@@  /api/rooms/filter/tokyo&single&2022-09-01
const searchRooms = async (req, res) => {
  const { location, checkIn, checkOut } = req.params

  // loop through each date inbetween the check-in date, up to but not including the check-out date
  let current = new Date(checkIn)
  const end = new Date(checkOut)
  const dateArray = []

  while (current < end) {
    dateArray.push(new Date(current).toLocaleDateString('en-CA'))

    let newDate = current.setDate(current.getDate() + 1)
    current = new Date(newDate)
  }

  // const dateQuery = dateArray.join(' OR availability.date=')

  // console.log(dateArray)

  // console.log(dateQuery)

  const resultsArray = []

  try {
    dateArray.map(date => {
      const query =
        'SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id WHERE rooms.location=? AND availability.available=? AND availability.date=?;'

      const searchResults = connection.query(
        query,
        [location, 1, date],
        (err, results) => {
          if (err) throw new Error(err.message)

          if (results) {
            console.log(results)
            // res.json(results)
          }
        }
      )
      if (!searchResults) throw new Error('Could not search')
    })

    // const query =
    //   'SELECT * FROM availability INNER JOIN rooms ON availability.room_id = rooms.id WHERE rooms.location=? AND availability.available=? AND availability.date=?;'

    // const searchResults = await connection.query(
    //   query,
    //   [location, 1, checkIn],
    //   (err, results) => {
    //     if (err) throw new Error(err.message)

    //     if (results) {
    //       console.log(results)
    //       res.json(results)
    //     }
    //   }
    // )
    // if (!searchResults) throw new Error('Could not search')
  } catch (error) {
    console.log(error)
  }
}

const reserveRooms = () => {}

module.exports = {
  searchRooms,
  reserveRooms,
}
