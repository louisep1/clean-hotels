import axios from 'axios'

const API_URL = '/api/rooms'

const searchRooms = async searchParams => {
  const { location, type, date } = searchParams

  console.log(location)
  console.log(type)
  console.log(date)

  const { data } = await axios.get(
    `${API_URL}/filter/${location}&${type}&${date}`
  )
  return data
}

const roomService = {
  searchRooms,
}

export default roomService
