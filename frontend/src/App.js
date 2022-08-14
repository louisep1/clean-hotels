import Banner from './components/Banner'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />

      {/* move this banner to the top of each page and put the image as a prop ??? */}
      <Banner title="Rooms" />
      {/* img={require('./imgs/hotel-1.jpg')} */}
    </div>
  )
}

export default App
