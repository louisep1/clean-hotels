import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newBooking, reset as resetBooking } from '../features/booking/bookingSlice'

import { BsFillPersonFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'

import singleRoom from '../imgs/room-single.jpg'
import doubleRoom from '../imgs/room-double.jpg'


const BookingForm = () => {

  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')
  const [search, setSearch] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isSuccess: bookingSuccess, isError: bookingError, message, booking } = useSelector(state => state.booking)

  useEffect(() => {
    window.onbeforeunload = () => {
      navigate('/reservation')
    };
  }, [])

  useEffect(() => {
    if (!location || !location.state) {
      navigate(-1)
    }
    if (location && location.state && location.state.result && location.state.search) {
      setSearch(location.state.search)
      setResult(location.state.result)
    }
    return () => {
      dispatch(resetBooking())
    }
  }, [location])

  const handleSubmit = e => {
    e.preventDefault()
    if (!email) {
      alert('Please enter your email')
      return
    }
    const reservedDateRoomIds = result.map(night => night.room_date_id)
    const booking = {
      email,
      room_id: result[0].id,
      check_in: search.checkIn,
      check_out: search.checkOut,
      nights: search.nights,
      booking_date: new Date().toLocaleDateString('en-CA'),
      paid_date: null,
      total: result.map(date => date.rate).reduce((a, b) => a + b),
      guests: search.guests,
      reservedDateRoomIds
    }
    dispatch(newBooking(booking))
    setEmail('')
  }

  return (
    <div className='section'>
      {location && location.state && location.state.result && location.state.search && search && result && (
        <div className='results-container'>
          <div className='title py-4'>Booking details</div>

          <div className="result" key={result[0].id}>
            <img src={result[0].type === 'single' ? singleRoom : doubleRoom} alt="room" className='img' />
            <p className='room'>{result[0].type === 'single' ? 'Single ' : 'Double '} Room x {search.rooms}</p>
            <p className='cost'>${result[0].rate}</p>
            <p className='details'>{search.guests} <BsFillPersonFill className='icon' /> / {search.nights} <MdNightlight className='icon' /></p>
            <div className="link"></div>
            <div className="reserve">{search.location}</div>
          </div>
          <p className='text-xs'>Check in: {search.checkIn}</p>
          <p className='bold-styled'>{bookingSuccess ? 'CONFIRMED' : 'Unconfirmed'}</p>
          <p className='text-xs pt-4'>{bookingSuccess && booking.email}</p>
        </div>)}

      {!bookingSuccess && (<form className='booking' onSubmit={handleSubmit}>
        <div className="email">
          <p>Enter your details to confirm booking</p>
          <label className='pt-3' htmlFor="">Email address:</label>
          <input className='my-1 p-1' type="email" placeholder='example@example.com' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button className='mt-2 btn' type='submit'>Confirm booking</button>
      </form>
      )}
      {
        bookingSuccess && (
          <p className='booking-success'>Your booking has been complete.</p>
        )
      }
      {
        bookingError && (
          <p className='booking-success'>{message === 'dates no longer available' ? 'Sorry, the room you selected is no longer available. Please search again.' : 'Oops. Something went wrong.'}</p>
        )
      }
      <button className='btn m-4' onClick={() => navigate('/reservation')}>Back</button>
    </div>
  )
}

export default BookingForm