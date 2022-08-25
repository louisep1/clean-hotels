import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BookingForm = () => {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      navigate(-1)
    }

    if (location && location.state && location.state.result && location.state.search) {
      console.log(location.state.result)
      console.log(location.state.search)
    }
  }, [location])

  return (
    <div>BookingForm</div>
  )
}

export default BookingForm