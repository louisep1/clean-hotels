import React from 'react'
import Banner from '../components/Banner'
import Tokyo from '../imgs/locations/tokyo.jpg'

const Home = () => {
  return (
    <div>
      {/* !!! either 'Clean Hotels' or 'Welcome' or 'Book Your Stay' */}
      <Banner title='Book Your Stay' classes='banner-home' />
      <div className="panel">
        <h1>Discover</h1>
        <p>With cleanliness and comfort guaranteed, take a look at our locations</p>

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

        </div>



      </div>
    </div>
  )
}

export default Home