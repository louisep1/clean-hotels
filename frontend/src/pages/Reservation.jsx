import React from 'react'
import Banner from '../components/Banner'

const Reservation = () => {
  return (
    <div>
      <Banner title='Reservation' />

      <div className="section">
        <div className="form-container p-4">
          <p className='text-md'>Book your stay</p>
          <form className='reservation-form'>

            {/* !!! CHANGE VALUE TO STATE */}
            <div>
              <div className="input-group">
                <label htmlFor="hotel-location">Location</label>
                <select name="" id="hotel-location">
                  <option value="tokyo">Tokyo</option>
                </select>
              </div>


              <div className="input-group">
                <label htmlFor="">Check-in date</label>
                <input type="date" />
              </div>
            </div>

            <div>
              <div className="input-group">
                <label htmlFor="">Nights</label>
                <select name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="total-guests">Number of guests (adults)</label>
                <select name="" id="total-guests">
                  {/* !!! maybe make this dynamic so only includes 2 per room, then suggest children are not included  */}
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

            </div>



            <div className="input-group">
              <label htmlFor="total-rooms">Number of rooms</label>
              <select name="" id="total-rooms">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>


            {/* display room type on next search result page */}

          </form>
          <button className='btn my-3' type="submit">Check availability</button>
        </div>

      </div>
    </div>
  )
}

export default Reservation