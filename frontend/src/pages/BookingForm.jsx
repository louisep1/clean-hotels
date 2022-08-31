// !!! ERRORS => for if booking fails etc...
// !!!  => update availability table to be false (not available) for selected room and dates


import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newBooking, reset } from '../features/booking/bookingSlice'

import { BsFillPersonFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'

import singleRoom from '../imgs/room-single.jpg'
import doubleRoom from '../imgs/room-double.jpg'


const BookingForm = () => {

  const [email, setEmail] = useState('')

  const location = useLocation()
  const { result, search } = location.state
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isSuccess, booking } = useSelector(state => state.booking)

  useEffect(() => {
    if (!location.state) {
      navigate(-1)
    }

    if (location && location.state && location.state.result && location.state.search) {
      console.log(result)
      console.log(search)
    }

    return () => {
      dispatch(reset())
    }
  }, [location])

  const handleSubmit = e => {
    e.preventDefault()

    const booking = {
      email,
      room_id: result[0].id,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      nights: search.nights,
      booking_date: new Date().toLocaleDateString('en-CA'),
      paid_date: null,
      total: result.map(date => date.rate).reduce((a, b) => a + b)
    }

    const reservedDatesId = search.dateRange

    console.log(booking)
    console.log(reservedDatesId)
    dispatch(newBooking(booking))
    // dispatch(updateToReserved(reservedDatesId))

    setEmail('')
  }

  return (
    <div className='section'>
      {location && location.state && location.state.result && location.state.search && (
        <div className='results-container'>
          <div className='title py-4'>Booking details</div>

          <div className="result" key={result[0].id}>
            <img src={result[0].type === 'single' ? singleRoom : doubleRoom} alt="room" className='img' />
            <p className='room'>{result[0].type === 'single' ? 'Single ' : 'Double '} Room</p>
            <p className='cost'>${result[0].rate}</p>
            <p className='details'>{search.guests} <BsFillPersonFill className='icon' /> / {search.nights} <MdNightlight className='icon' /></p>
            <div className="link"></div>
            <div className="reserve"></div>
          </div>
          <p className='text-xs'>Check in: {search.checkIn}</p>
          <p className='text-xs'>{isSuccess && booking.email}</p>
        </div>)}

      {!isSuccess && (<form className='booking' onSubmit={handleSubmit}>
        <div className="email">
          <p>Enter your details to confirm booking</p>
          <label className='pt-3' htmlFor="">Email address:</label>
          <input className='my-1 p-1' type="text" placeholder='example@example.com' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button className='mt-2 btn' type='submit'>Confirm booking</button>
      </form>
      )}

      {
        isSuccess && (
          <p className='booking-success'>Your booking has been complete.</p>
        )
      }

      <button className='btn m-4'>Back</button>

    </div>


  )
}

export default BookingForm