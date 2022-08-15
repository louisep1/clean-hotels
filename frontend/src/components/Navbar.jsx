import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../imgs/hotel-logo.jpg'

const Navbar = () => {
  // get the url and style
  const { pathname } = useLocation()
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [])



  return (
    <nav>
      <div className='logo'>
        <Link to={'/'}>
          <img src={Logo} alt="" />
          <div>Clean Hotels</div>
        </Link>
      </div>
      <ul>
        <Link to={'/rooms'}><li className={pathname === '/rooms' ? 'active' : ''}>Rooms</li></Link>
        <Link to={'/services'}><li className={pathname === '/services' ? 'active' : ''}>Services</li></Link>
        <Link to={'/reservation'}><li className={`reservation ${pathname === '/reservation' && 'active'}`}>Reservation</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar