import axios from 'axios'

const API_URL = '/api/rooms'

const searchRooms = async searchParams => {
  const { location, checkIn, checkOut } = searchParams

  const { data } = await axios.get(
    `${API_URL}/filter/${location}&${checkIn}&${checkOut}`
  )
  return data
}

const roomService = {
  searchRooms,
}

export default roomService
