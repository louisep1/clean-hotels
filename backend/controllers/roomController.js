const pool = require('../config/db')
const _ = require('lodash')

// @@@@@  GET
// @@@@@  /api/rooms/filter/:location&:checkIn&:checkOut  (/api/rooms//filter/tokyo&single&2022-09-01&2022-09-02)
const searchRooms = async (req, res) => {
  try {
    const { location, checkIn, checkOut, nights, guests } = req.params
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
      r.location=? AND a.available=1 
      AND 
      date >= ? AND date < ?;
    `
    const connection = await pool.getConnection()
    const [response, meta] = await connection.query(query, [
      location,
      checkIn,
      checkOut,
    ])
    if (response) {
      let singleRoom, doubleRoom
      if (Number(guests) === 1) {
        const responseSingleRooms = response.filter(
          room => room.type === 'single'
        )
        const singleRoomsById = _.groupBy(responseSingleRooms, 'id')
        const singleRoomIds = Object.keys(singleRoomsById)
        const availableSingleRoomId = singleRoomIds.filter(
          roomId => singleRoomsById[roomId].length === Number(nights)
        )[0]
        singleRoom = singleRoomsById[availableSingleRoomId]
      }
      const responseDoubleRooms = response.filter(
        room => room.type === 'double'
      )
      const doubleRoomsById = _.groupBy(responseDoubleRooms, 'id')
      const doubleRoomIds = Object.keys(doubleRoomsById)
      const availableDoubleRoomId = doubleRoomIds.filter(
        roomId => doubleRoomsById[roomId].length === Number(nights)
      )[0]
      doubleRoom = doubleRoomsById[availableDoubleRoomId]

      const resData = { single: singleRoom, double: doubleRoom }
      console.log('RESTDATA', resData)
      res.send(resData)
    } else {
      res.send([])
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'search could not be retrieved' })
  }
}

// @@@@@  PUT
// @@@@@  /api/rooms/reserve
const reserveRoom = async (req, res) => {
  // const { dateRoomIdArray, available } = req.body
  // const connection = await pool.getConnection()
  // const queryArray = dateRoomIdArray.map(dateRoomId => 'id = ?')
  // const queryString = queryArray.join(' OR ')

  // const query =
  //   `UPDATE availability SET available = 0 WHERE ` + queryString + ';'

  // // connection.query(
  // //   query,
  // //   [available === true ? 1 : 0, ...dateRoomIdArray],
  // //   (err, results) => {
  // //     if (err) {
  // //       console.log(err)
  // //     } else {
  // //       res.json(results)
  // //     }
  // //   }
  // // )

  // await connection.execute(query, dateRoomIdArray)
  // res.send([])

  // // try {
  // //   await connection.query(
  // //     query,
  // //     [available === true ? 1 : 0, ...dateRoomIdArray],
  // //     (err, results) => {
  // //       if (err) {
  // //         console.log(err)
  // //         res.status(500).send({ message: 'room does not exist' })
  // //         // !!! if it errors, the frontend needs to not display the reservation confirmation message
  // //       } else {
  // //         console.log('results', results)
  // //         res.json(results)
  // //         return results
  // //       }
  // //     }
  // //   )
  // // } catch (error) {
  // //   console.log(error)
  // //   console.log('test 2')
  // //   // !!! if it errors, the frontend needs to not display the reservation confirmation message
  // //   // throw some error
  // // }
  res.send([])
}

module.exports = {
  searchRooms,
  reserveRoom,
}
