import axios from 'axios'

const API_URL = '/api/rooms'

const searchRooms = async searchParams => {
  const { location, checkIn, checkOut } = searchParams

  const { data } = await axios.get(
    `${API_URL}/filter/${location}&${checkIn}&${checkOut}`
  )

  return data
}

const reserveRoom = async reservedDates => {
  const { data } = await axios.put(`${API_URL}/reserve`, reservedDates)

  return data
}

const roomService = {
  searchRooms,
  reserveRoom,
}

export default roomService
