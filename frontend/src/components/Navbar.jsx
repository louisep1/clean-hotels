import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='logo'><Link to={'/'}>Clean Hotels</Link></div>
      <ul>
        <li><Link to={'/rooms'}>Rooms</Link></li>
        <li><Link to={'/services'}>Services</Link></li>
        <li><Link to={'/reservation'} className='reservation'>Reservation</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar