import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { searchRooms, reset } from '../features/rooms/roomSlice'

import { BsFillPersonFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'
import Banner from '../components/Banner'
import running from '../imgs/hotel-loading-gif.gif'

import singleRoom from '../imgs/room-single.jpg'
import doubleRoom from '../imgs/room-double.jpg'

const Reservation = () => {
  const [tomorrow, setTomorrow] = useState('')
  const [max, setMax] = useState('')

  const [searching, setSearching] = useState(false)

  // null is false, but {} is true
  // ('' is also false)
  // [] is also true

  const [dateRange, setDateRange] = useState([])
  const [nights, setNights] = useState(1)

  const [search, setSearch] = useState({
    location: 'Tokyo',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
  })

  const { location, checkIn, checkOut, guests, rooms } = search

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { searchResults, isLoading, isSuccess, isError } = useSelector(state => state.rooms)


  // Updates the check-out date to be the next day from the check in date:
  const resetCheckOut = () => {
    let date = new Date(checkIn);
    date.setDate(date.getDate() + 1);

    setSearch(prevState => ({
      ...prevState,
      checkOut: new Date(date).toLocaleDateString('en-CA')
      // this en-CA formats dates as YYYY-MM-DD which is the required format
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    let today = new Date();
    today.setDate(today.getDate() + 1);

    setTomorrow(new Date(today).toLocaleDateString('en-CA'))

    setSearch(prevState => ({
      ...prevState,
      checkIn: new Date().toLocaleDateString('en-CA')
      // checkIn: new Date(today).toLocaleDateString('en-CA')
    }))

    return () => dispatch
      (reset())
  }, [])

  useEffect(() => {
    // This useEffect loops through each date inbetween the check-in date, up to but not including the check-out date
    let current = new Date(checkIn);
    const end = new Date(checkOut);
    const dateArray = []

    while (current < end) {
      dateArray.push(new Date(current))

      let newDate = current.setDate(current.getDate() + 1);
      current = new Date(newDate);
    }

    if (dateArray.length > 7) {
      alert('Maximum 7 days can be booked at a time')
      resetCheckOut()
    } else if (new Date(checkIn) >= new Date(checkOut)) {
      alert('Check-out date cannot be before or on the check-in date.')
    } else {
      setDateRange(dateArray)
      setNights(dateArray.length)

    }
  }, [checkOut])


  useEffect(() => {
    if (checkIn) {
      resetCheckOut()
    }

    let newMax = new Date(checkIn);
    newMax.setDate(newMax.getDate() + 7);

    setMax(new Date(newMax).toLocaleDateString('en-CA'))
  }, [checkIn])

  useEffect(() => {
    if (!isLoading || isError) {
      setSearching(false)
    }
  }, [isLoading, isSuccess, isError])

  const handleChange = e => {
    setSearch(prevState => ({
      ...prevState,
      [e.target.name]: e.target.name === 'guests' || e.target.name === 'rooms' ? Number(e.target.value) : e.target.value
    })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(reset())

    if (new Date(checkIn) < new Date().toLocaleDateString('en-CA')) {
      alert('Cannot book rooms for dates that have already passed')
      return
    }

    // in future: check number of rooms <= number of people  => otherwise  =>   error 
    setSearching(true)

    const searchParams = {
      location: location.toLowerCase(),
      checkIn,
      checkOut,
      nights
    }

    // Frontend slice returns only rooms that are available for consecutive nights
    dispatch(searchRooms(searchParams))
  }

  return (
    <>
      <Banner title='Reservation' />

      <div className="section">
        {!searching &&
          <div className="form-container px-4">
            <p className='text-md'>Book your stay</p>
            <form onSubmit={handleSubmit}>
              <div className='reservation-form'>

                <div className="input-group location">
                  <label htmlFor="hotel-location">Location</label>
                  <select value={location} name="location" id="hotel-location" onChange={handleChange}>
                    <option value='Tokyo'>Tokyo</option>
                    <option value='Yokohama'>Yokohama</option>
                    <option value='Kamakura'>Kamakura</option>
                    <option value='Okinawa'>Okinawa</option>
                    <option value='Ishigaki'>Ishigaki</option>
                  </select>
                </div>

                <div className="input-group check-in">
                  <label htmlFor="">Check-in date</label>
                  {/* <input value={checkIn} name='checkIn' onChange={handleChange} type="date" min={tomorrow} max={'2022-12-10'} /> */}
                  <input value={checkIn} name='checkIn' onChange={handleChange} type="date" min={new Date().toLocaleDateString('en-CA')} />
                </div>

                <div className="input-group check-out">
                  <label htmlFor="">Check-out date **</label>
                  <input value={checkOut} name='checkOut' onChange={handleChange} type="date" min={checkIn} max={max} />
                </div>

                <div className="input-group guests">
                  <label htmlFor="total-guests">Number of guests (adults)</label>
                  <select name="guests" value={guests} id="total-guests" onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    {/* <option value={3}>3</option>
                    <option value={4}>4</option> */}
                    {/* !!! Future - go back and enable guest and number of rooms adjustments */}
                  </select>
                </div>

                <div className="input-group rooms">
                  <label htmlFor="total-rooms">Number of rooms</label>
                  <select name="rooms" value={rooms} id="total-rooms" onChange={handleChange}>
                    <option value={1}>1</option>
                    {/* <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option> */}
                  </select>
                </div>

              </div>
              <button className='btn my-3' type="submit">Check availability</button>
              <p className='pt-2-xs'>** Bookings of up to 7 nights stay can be made</p>
            </form>


          </div>
        }

        {searching && (
          <div className='searching'>
            <div className="text">Searching... Please wait... </div>
            <div className="searching-gifs">
              <img src={running} alt="" />
            </div>
          </div>
        )}


        {/* SEARCH RESULTS: */}
        {isSuccess && searchResults && !searching && (
          <div className='results-container'>
            <div className="line"></div>
            <div className='title'>Results</div>

            {/* !!! need to go back and adjust this for more than 2 people and more than 1 room options */}

            {/* If there is a single room available matching your search: */}
            {/* No display for number of rooms (but in this current case, will only ever be 1) */}
            {/* Show single room only if only 1 guest */}
            {searchResults.single && searchResults.single.length > 0 && guests === 1 && (
              <div className="result" key={searchResults.single[0].id}>
                <img src={singleRoom} alt="room" className='img' />
                <p className='room'>Single Room</p>
                <p className='cost'>${searchResults.single[0].rate}</p>
                {/* !!! the cost is just for one room - currently unable to book two rooms (and therefore can't book for more than 2 people either) */}
                <p className='details'>{guests} <BsFillPersonFill className='icon' /> / {nights} <MdNightlight className='icon' /></p>
                <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
                <button className='reserve btn btn-light' onClick={() => navigate('/book', { state: { result: searchResults.single, search: { ...search, nights, dateRange } } })}>Reserve</button>
              </div>
            )}

            {/* If there is a double room available matching your search: */}
            {searchResults.double && searchResults.double.length > 0 && (
              <div className="result" key={searchResults.double[0].id}>
                <img src={doubleRoom} alt="room" className='img' />
                <p className='room'>Double Room</p>
                <p className='cost'>${searchResults.double[0].rate}</p>
                <p className='details'>{guests} <BsFillPersonFill className='icon' /> / {nights} <MdNightlight className='icon' /></p>
                <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
                <button className='reserve btn btn-light' onClick={() => navigate('/book', { state: { result: searchResults.double, search: { ...search, nights, dateRange } } })}>Reserve</button>
              </div>
            )}


            {(searchResults.single && searchResults.single.length === 0) && (searchResults.double && searchResults.double.length === 0) && (<div className="text-md mt-4">Sorry, no available rooms matching your search criteria.</div>)}

            {isError && (<div className="text-md mt-4">Oops. Something went wrong.</div>)}
          </div>
        )
        }
      </div >
    </>
  )
}

export default Reservation