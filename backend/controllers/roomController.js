const connection = require('../config/db')

const searchRooms = () => {
  console.log('test')
}

// const getAllData = async (req, res) => {
//   // const db = dbService.getDbServiceInstance()
//   try {
//     const query = 'SELECT * FROM names;'

//     const queryData = await connection.query(query, (err, results) => {
//       if (err) throw new Error(err.message)

//       if (results) {
//         // console.log(results)
//         res.json({ data: results })
//       }
//     })

//     if (!queryData)
//       throw new Error('Something went wrong... Data could not be retrieved.')
//   } catch (error) {
//     console.log(error)
//   }
// }

module.exports = {
  searchRooms,
  // getAllData,
}
