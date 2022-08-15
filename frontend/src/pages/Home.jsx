import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      {/* !!! either 'Clean Hotels' or 'Welcome' or 'Book Your Stay' */}
      <Banner title='Book Your Stay' classes='banner-home' />
      <div className='section'>
        <div className="panel">
          <div className='panel-title'>Discover</div>
          <p className='panel-text'>With cleanliness and comfort guaranteed, take a look at our locations</p>
        </div>

        <div className="card-container">
          <div className="card card-tokyo">
            <div className="card-title">
              <div className="overlay">
                <p className='card-title-text'>Tokyo</p>
              </div>
            </div>
          </div>

          <div className="card card-ishigaki">
            <div className="card-title">
              <div className="overlay">
                <p className='card-title-text'>Ishigaki</p>
              </div>
            </div>
          </div>

          <div className="card card-kamakura">
            <div className="card-title">
              <div className="overlay">
                <p className='card-title-text'>Kamakura</p>
              </div>
            </div>
          </div>

          <div className="card card-yokohama">
            <div className="card-title">
              <div className="overlay">
                <p className='card-title-text'>Yokohama</p>
              </div>
            </div>
          </div>

          <div className="card card-okinawa">
            <div className="card-title">
              <div className="overlay">
                <p className='card-title-text'>Okinawa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">

        {/* <div className="panel">
          <div className='panel-title'>Room types</div>
          <p className='panel-text'>Find a room that's right for you</p>
        </div> */}

        <div className="background-panel">
          <div className="panel">
            <Link to='/rooms'><div className='panel-title'>Room types</div></Link>
            <Link to='/rooms'><p className='panel-text'>Find a room that's right for you</p></Link>

          </div>
        </div>

      </div>




    </div>
  )
}

export default Home