import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div>
        <p>Clean Hotels Ltd.</p>
        <p className='pt-1'>For bookings or enquiries, contact:</p>
        <p>contact@cleanhotels.com</p>
        <p>01234 567890</p>
      </div>
      <div className='links'>
        <p className='bold'>Hotel Guide</p>
        <ul>
          <li><Link to='/reservation'>Reservation</Link></li>
          <li><Link to='/services'>Services</Link></li>
          <li><Link to='/rooms'>Rooms</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer