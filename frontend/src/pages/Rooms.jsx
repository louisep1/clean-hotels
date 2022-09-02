import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'

const Rooms = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Banner title='Rooms' />
      <div className="section grey">

        <div className="card">
          <div className="card-img single"></div>
          <div className="card-body">
            <div className="title">Single Room </div>
            <div className="text">Spacious single room with wider-sized bed.
            </div>
            <Link to='/reservation' className='text'>Book now!</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-img double"></div>
          <div className="card-body">
            <div className="title">Double Room </div>
            <div className="text">Our renouned double rooms provide enough space for a comfortable stay. For families, additional beds can be provided for children. Please enquire upon booking.</div>

            <Link to='/reservation' className='text'>Book now!</Link>
          </div>

        </div>

        {/* could have a twin room here */}


        <div className="my-4 py-4">
          <p className='footnote'>**An additional charge for breakfast and meals will apply.</p>
          <p className='footnote'>***All of our rooms are equipped with air conditioning, fridge, kettle, TV, table with chair, telephone, hairdryer and include the following ammenities: tea and coffee, toothbrush, toothpaste, shampoo, conditioner, body soap, bath towels and robe and slippers.</p>
        </div>

      </div>
    </>
  )
}

export default Rooms