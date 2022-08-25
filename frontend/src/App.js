import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Services from './pages/Services'
import Reservation from './pages/Reservation'
import Footer from './components/Footer'
import BookingForm from './pages/BookingForm'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/book" element={<BookingForm />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
