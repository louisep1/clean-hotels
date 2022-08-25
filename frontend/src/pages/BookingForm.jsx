// fix styling for the room row on this page
// add other image options on the page and reservation page for other room types
// add the customers information input section on this page
// submit button
// actually requests to backend for reserving room - take dates off of available for that room then produce a second booking item in booking table


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

          {/* if searching for 2 people and one room, filter out the single room option: */}
          {/* !!! need to go back and adjust this for more than 2 people and more than 1 room options */}

          <div className="result" key={result.id}>
            <img src={result.type === 'single' ? singleRoom : doubleRoom} alt="room" className='img' />
            <p className='room'>{result.type === 'single' ? 'Single ' : 'Double '} Room</p>
            <p className='cost'>${result.rate}</p>
            {/* !!! the cost is just for one room - currently unable to book two rooms (and therefore can't book for more than 2 people either) */}

            <p className='details'>{search.guests} <BsFillPersonFill className='icon' /> / {search.rooms} <MdNightlight className='icon' /></p>
            <div className="link"></div>
            <div className="reserve"></div>
            {/* <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
            <button className='reserve btn btn-light' >Reserve</button> */}
          </div>
        </div>)}

      <form className='m-4'>
        <label htmlFor="">Email address:</label>
        <input type="text" />
        <button>Submit booking</button>
      </form>
    </div>
  )
}

export default BookingForm