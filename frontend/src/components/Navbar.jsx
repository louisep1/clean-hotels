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
        <Link to={'/rooms'}><li>Rooms</li></Link>
        <Link to={'/services'}><li className='active'>Services</li></Link>
        <Link to={'/reservation'}><li className='reservation'>Reservation</li></Link>

        {/* <li><Link to={'/rooms'}>Rooms</Link></li>
        <li className='active'><Link to={'/services'}>Services</Link></li>
        <li><Link to={'/reservation'} className='reservation'>Reservation</Link></li> */}
      </ul>
    </nav>
  )
}

export default Navbar