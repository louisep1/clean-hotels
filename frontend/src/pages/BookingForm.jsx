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
      id: result[0].id,
      room_date_id: [],
      dates: [],
      booking_date: new Date(),
    }

    console.log(email)
    // submit both request

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