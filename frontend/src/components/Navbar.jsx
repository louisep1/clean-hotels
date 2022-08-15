import React from 'react'
import { Link } from 'react-router-dom'
import Clean from '../imgs/clean.jpg'
import Logo from '../imgs/hotel-logo.jpg'

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <Link to={'/'}>
          <img src={Logo} alt="" />
          <div>Clean Hotels</div>
        </Link>
      </div>
      <ul>
        <li><Link to={'/rooms'}>Rooms</Link></li>
        <li><Link to={'/services'}>Services</Link></li>
        <li><Link to={'/reservation'} className='reservation'>Reservation</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar