import React from 'react'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      {/* !!! either 'Clean Hotels' or 'Welcome' or 'Book Your Stay' */}
      <Banner title='Book Your Stay' classes='banner-home' />
    </div>
  )
}

export default Home