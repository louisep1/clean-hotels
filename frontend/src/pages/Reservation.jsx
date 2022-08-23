import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { searchRooms } from '../features/rooms/roomSlice'

import { BsFillPersonFill } from 'react-icons/bs'
import { MdNightlight } from 'react-icons/md'
import Banner from '../components/Banner'
import running from '../imgs/hotel-loading-gif.gif'

import room from '../imgs/room-small-2.jpg'

const Reservation = () => {
  const [searching, setSearching] = useState(false)

  const [results, setResults] = useState(null)
  // null is false, but {} is true
  // ('' is also false)

  const [dateRange, setDateRange] = useState([])

  const [search, setSearch] = useState({
    location: 'Tokyo',
    checkIn: '',
    checkOut: '',
    // !!! CHECK CORRECT FORMAT FOR DATES
    guests: 1,
    rooms: 1
  })

  const { location, checkIn, checkOut, guests, rooms } = search

  const dispatch = useDispatch()
  const { searchResults, isLoading, isSuccess } = useSelector(state => state.rooms)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // This useEffect loops through each date inbetween the check-in date, up to but not including the check-out date
    let current = new Date(checkIn);
    const end = new Date(checkOut);
    const dateArray = []

    while (current < end) {
      dateArray.push(new Date(current))

      // console.log(dateArray)
      // console.log(current);

      let newDate = current.setDate(current.getDate() + 1);
      current = new Date(newDate);
    }

    setDateRange(dateArray)
    // !!! not sure if this is correct as not sure if it waits for the loop or not ?
  }, [checkOut])


  useEffect(() => {
    // Updates the check-out date to be the next day from the check in date
    if (checkIn) {
      let date = new Date(checkIn);
      date.setDate(date.getDate() + 1);

      setSearch(prevState => ({
        ...prevState,
        checkOut: new Date(date).toLocaleDateString('en-CA')
        // this en-CA formats dates as YYYY-MM-DD which is the required format
      }))
    }
  }, [checkIn])

  useEffect(() => {
    if (!isLoading) {
      setSearching(false)
    }
  }, [isLoading, isSuccess])

  const handleChange = e => {
    setSearch(prevState => ({
      ...prevState,
      [e.target.name]: e.target.name === 'guests' || e.target.name === 'rooms' ? Number(e.target.value) : e.target.value
    })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(search)

    // !!!check if date has already passed => error
    // !!!check that check-out date is after (or check-in is before)  =>  error
    // !!!check number of rooms <= number of people   otherwise  =>   error
    setSearching(true)

    const searchParams = {
      location: location.toLowerCase(),
      type: 'single',
      date: checkIn
    }

    // @@@@@@@@@@
    // !!!!! this is sample data - go back and fix after text => maybe don't need to have the type at this state
    // maybe need to include the number of people and number of rooms for this bit
    // also need to include all the dates somehow, not just one
    // Need to go back and fix the backend

    dispatch(searchRooms(searchParams))
    // !!!return rooms that are available for consecutive nights only => if not, don't return
    // !!!maybe then fetch in useEffect, then once returned results, setSearching(false) iin useEffect
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
                  </select>
                </div>

                <div className="input-group check-in">
                  <label htmlFor="">Check-in date</label>
                  <input value={checkIn} name='checkIn' onChange={handleChange} type="date" />
                </div>

                <div className="input-group check-out">
                  <label htmlFor="">Check-out date</label>
                  <input value={checkOut} name='checkOut' onChange={handleChange} type="date" />
                </div>

                <div className="input-group guests">
                  <label htmlFor="total-guests">Number of guests (adults)</label>
                  <select name="guests" value={guests} id="total-guests" onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>

                <div className="input-group rooms">
                  <label htmlFor="total-rooms">Number of rooms</label>
                  <select name="rooms" value={rooms} id="total-rooms" onChange={handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>

              </div>
              <button className='btn my-3' type="submit">Check availability</button>
            </form>
            <div className="line"></div>

          </div>
        }

        {searching && (
          <div className='searching'>
            <div className="text">Searching... Please wait... </div>
            <div className="searching-gifs">
              <img src={running} alt="" />
              {/* <img src={running} alt="" />
              <img src={running} alt="" />
              <img src={running} alt="" /> */}
            </div>
          </div>
        )}

        {/* These are from the actual state: */}
        {searchResults && (
          searchResults.map(result => (
            <p className='title' key={result.id}>ROOM {result.room_number}</p>
          ))
        )
        }



        {results && !searching && (
          <div className='results-container'>
            <div className='title'>Results</div>

            <div className="result">
              <img src={room} alt="room" className='img' />
              <p className='room'>Double Room</p>
              <p className='cost'>$50</p>
              <p className='details'>2 <BsFillPersonFill className='icon' /> / 2 <MdNightlight className='icon' /></p>
              <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
              <Link to='/' className='reserve'><button className='btn btn-light'>Reserve</button></Link>
            </div>

            <div className="result">
              <img src={room} alt="room" className='img' />
              <p className='room'>Double Room</p>
              <p className='cost'>$50</p>
              <p className='details'>2 <BsFillPersonFill className='icon' /> / 2 <MdNightlight className='icon' /></p>
              <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
              <Link to='/' className='reserve'><button className='btn btn-light'>Reserve</button></Link>
            </div>

            <div className="result">
              <img src={room} alt="room" className='img' />
              <p className='room'>Double Room</p>
              <p className='cost'>$50</p>
              <p className='details'>2 <BsFillPersonFill className='icon' /> / 2 <MdNightlight className='icon' /></p>
              <Link to='/rooms' className='link'><button className='btn'>See more</button></Link>
              <Link to='/' className='reserve'><button className='btn btn-light'>Reserve</button></Link>
            </div>
          </div>
        )
        }

        {/* !!!! design a room not available error too */}
        {/* <div className="results-container"><div className="text-md">Sorry, no rooms were available matching your search.</div></div> */}

        {/* !!! maybe have either a modal or an actual separate page for reserving the actual room bit and makng the put/post calls */}
        {/* !!! should it be an entry for each room for each day ??? with a available: true/false boolean ??? */}
      </div >
    </>
  )
}

export default Reservation