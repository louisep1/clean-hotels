// add the customers information input section on this page
// submit button
// send put request to backend x 2
//     => update availability table to be false (not available) for selected room and dates
//     => add a new reservation to the reservations table (to be created) 


import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import { BsFillPersonFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'

import singleRoom from '../imgs/room-single.jpg'
import doubleRoom from '../imgs/room-double.jpg'


const BookingForm = () => {

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

  return (
    <div className='section'>
      {location && location.state && location.state.result && location.state.search && (
        <div className='results-container'>
          <div className='title py-4'>Booking details</div>

          {/* !!! BACK BUTTON */}

          <div className="result" key={result.id}>
            <img src={result.type === 'single' ? singleRoom : doubleRoom} alt="room" className='img' />
            <p className='room'>{result.type === 'single' ? 'Single ' : 'Double '} Room</p>
            <p className='cost'>${result.rate}</p>
            <p className='details'>{search.guests} <BsFillPersonFill className='icon' /> / {search.rooms} <MdNightlight className='icon' /></p>
            <div className="link"></div>
            <div className="reserve"></div>
            {/* <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
            <button className='reserve btn btn-light' >Reserve</button> */}
          </div>
        </div>)}

      <form className='booking'>
        <div className="email">
          <label htmlFor="">Email address:</label>
          <input type="text" />
        </div>
        <button>Submit booking</button>
      </form>
    </div>
  )
}

export default BookingForm