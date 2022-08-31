// add the customers information input section on this page
// submit button
// send put request to backend x 2
//     => update availability table to be false (not available) for selected room and dates
//     => add a new reservation to the reservations table (to be created) 


import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import { BsFillPersonFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'

import singleRoom from '../imgs/room-single.jpg'
import doubleRoom from '../imgs/room-double.jpg'


const BookingForm = () => {

  const [email, setEmail] = useState('')

  const location = useLocation()
  const { result, search } = location.state
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      navigate(-1)
    }

    if (location && location.state && location.state.result && location.state.search) {
      console.log(result)
      console.log(search)
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
      // night1: result[0] ? result[0].date : null,
      // night2: result[1] ? result[1].date : null,
      // night3: result[2] ? result[2].date : null,
      // night4: result[3] ? result[3].date : null,
      // night5: result[4] ? result[4].date : null,
      // night6: result[5] ? result[5].date : null,
      // night7: result[6] ? result[6].date : null,
    }

    const reservedDatesId = search.dateRange

    console.log(booking)
    console.log(reservedDatesId)
    // dispatch(newBooking(booking))
    // dispatch(updateToReserved(reservedDatesId))

    setEmail('')
  }

  return (
    <div className='section'>
      {location && location.state && location.state.result && location.state.search && (
        <div className='results-container'>
          <div className='title py-4'>Booking details</div>

          {/* !!! BACK BUTTON */}

          <div className="result" key={result[0].id}>
            <img src={result[0].type === 'single' ? singleRoom : doubleRoom} alt="room" className='img' />
            <p className='room'>{result[0].type === 'single' ? 'Single ' : 'Double '} Room</p>
            <p className='cost'>${result[0].rate}</p>
            <p className='details'>{search.guests} <BsFillPersonFill className='icon' /> / {search.nights} <MdNightlight className='icon' /></p>
            <div className="link"></div>
            <div className="reserve"></div>
            {/* <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
            <button className='reserve btn btn-light' >Reserve</button> */}
          </div>
        </div>)}

      <form className='booking' onSubmit={handleSubmit}>
        <div className="email">
          <p>Enter your details to confirm booking</p>
          <label className='pt-3' htmlFor="">Email address:</label>
          <input className='my-1 p-1' type="text" placeholder='example@example.com' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button className='mt-2 btn' type='submit'>Confirm booking</button>
      </form>
    </div>
  )
}

export default BookingForm