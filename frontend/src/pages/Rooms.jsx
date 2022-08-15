import React from 'react'
import Banner from '../components/Banner'

const Rooms = () => {
  return (
    <div>
      <Banner title='Rooms' />
      {/* BOTH RESERVATION SEARCH AND ROOM TYPE DETAILS HERE */}
      {/* SEPARATE PAGE FOR SEARCH RESULTS */}

      <div className="section grey">

        <div className="room-card">
          <div className="room-card-img single"></div>
          <div className="room-card-body">
            <div className="title">Single Room </div>
            <div className="text">Spacious single room with wider-sized bed.
              {/* Our classic room for when you want to be away from home, whilst still feeling at home. */}
            </div>
          </div>
        </div>

        <div className="room-card">
          <div className="room-card-img double"></div>
          <div className="room-card-body">
            <div className="title">Double Room </div>
            <div className="text">Our renouned double rooms provide enough space for a comfortable stay. For families, additional beds can be provided for children. Please enquire upon booking.</div>
          </div>
        </div>

        {/* could have a twin room here */}

        <p className='footnote'>**An additional charge for breakfast and meals will apply.</p>
        <p className='footnote'>***All of our rooms are equipped with air conditioning, fridge, TV, table with chair, telephone, hairdryer and include the following ammenities: toothbrush, toothpaste, shampoo, conditioner, body soap, bath towels and robe and slippers.</p>

      </div>
    </div>
  )
}

export default Rooms