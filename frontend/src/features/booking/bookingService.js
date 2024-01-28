import axios from 'axios'

const API_URL = '/api/bookings'

const newBooking = async bookingData => {
  const { data } = await axios.post(`${API_URL}/new`, bookingData)

  return data
}

const bookingService = {
  newBooking,
}

export default bookingService
