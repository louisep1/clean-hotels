import { useState } from 'react'
import Banner from '../components/Banner'

const Reservation = () => {
  const [searching, setSearching] = useState(false)

  const [results, setResults] = useState({})
  // null is false, but {} is true
  // ('' is also false)

  const [search, setSearch] = useState({
    location: 'Tokyo',
    date: '',
    // !!! CHECK CORRECT FORMAT FOR DATES
    nights: 1,
    guests: 1,
    rooms: 1
  })

  const { location, date, nights, guests, rooms } = search

  const handleChange = e => {
    setSearch(prevState => ({
      ...prevState,
      [e.target.name]: e.target.name === 'location' || e.target.name === 'date' ? e.target.value : Number(e.target.value)
    })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(search)

    // check if date has already passed => error
    // check number of rooms <= number of people   otherwise  =>   error
    setSearching(true)
    // !!! find a cute hotel searching/processing gif

    // maybe then fetch in useEffect, then once returned results, setSearchng(false) iin useEffect
  }

  return (
    <>
      <Banner title='Reservation' />

      <div className="section">
        <div className="form-container p-4">
          <p className='text-md'>Book your stay</p>
          <form onSubmit={handleSubmit}>
            <div className='reservation-form'>

              {/* <div> */}
              <div className="input-group">
                <label htmlFor="hotel-location">Location</label>
                <select value={location} name="location" id="hotel-location" onChange={handleChange}>
                  <option value='Tokyo'>Tokyo</option>
                  <option value='Yokohama'>Yokohama</option>
                </select>
              </div>


              <div className="input-group">
                <label htmlFor="">Check-in date</label>
                <input value={date} name='date-in' onChange={handleChange} type="date" />
              </div>

              <div className="input-group">
                <label htmlFor="">Check-out date</label>
                <input value={date} name='date-out' onChange={handleChange} type="date" />
              </div>
              {/* </div> */}

              {/* <div> */}
              {/* <div className="input-group">
                  <label htmlFor="">Nights</label>
                  <select value={nights} name="nights" onChange={handleChange} id="">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                  </select>
                </div> */}

              <div className="input-group">
                <label htmlFor="total-guests">Number of guests (adults)</label>
                <select name="guests" value={guests} id="total-guests" onChange={handleChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>

              {/* </div> */}



              <div className="input-group">
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
        </div>

        {
          results && (
            <section className='p-4'>
              <div className='title'>Results</div>

              {/* have some kind of panel or something to display each room type matching the search results */}
            </section>
          )
        }

      </div >
    </>
  )
}

export default Reservation