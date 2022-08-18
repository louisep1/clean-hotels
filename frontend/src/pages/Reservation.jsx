import { useState } from 'react'
import Banner from '../components/Banner'

const Reservation = () => {
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
    // console.log(e.target.value)
    // console.log(e.target.name)
    setSearch(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(search)
  }

  return (
    <>
      <Banner title='Reservation' />

      <div className="section">
        <div className="form-container p-4">
          <p className='text-md'>Book your stay</p>
          <form onSubmit={handleSubmit}>
            <div className='reservation-form'>

              <div>
                <div className="input-group">
                  <label htmlFor="hotel-location">Location</label>
                  <select value={location} name="location" id="hotel-location" onChange={handleChange}>
                    {/* <option value="Tokyo">Tokyo</option>
                    <option value="Yokohama">Yokohama</option> */}
                    <option>Yokohama</option>
                    <option>Tokyo</option>
                    {/* !!! for some reason, e.target.value is coming back as the value inside the option - is this correct ??? */}
                    {/* !!! check state and onChange done correctly */}
                  </select>
                </div>


                <div className="input-group">
                  <label htmlFor="">Check-in date</label>
                  <input value={date} name='date' onChange={handleChange} type="date" />
                </div>
              </div>

              <div>
                <div className="input-group">
                  <label htmlFor="">Nights</label>
                  <select value={nights} name="nights" onChange={handleChange} id="">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="total-guests">Number of guests (adults)</label>
                  <select name="guests" value={guests} id="total-guests" onChange={handleChange}>
                    {/* !!! maybe make this dynamic so only includes 2 per room, then suggest children are not included  */}
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>

              </div>



              <div className="input-group">
                <label htmlFor="total-rooms">Number of rooms</label>
                <select name="rooms" value={rooms} id="total-rooms" onChange={handleChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>


              {/* display room type on next search result page */}

            </div>
            <button className='btn my-3' type="submit">Check availability</button>
          </form>

        </div>

      </div>
    </>
  )
}

export default Reservation