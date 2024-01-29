import axios from 'axios'

const API_URL = '/api/bookings'

const newBooking = async booking => {
  const { data } = await axios.post(`${API_URL}/new`, booking)

  return data
}

const bookingService = {
  newBooking,
}

export default bookingService
