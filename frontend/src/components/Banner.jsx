import React from 'react'

const Banner = ({ title }) => {
  return (
    <div className={`banner banner-${title.toLowerCase()}`}>
      <div className="overlay">
        <h1 className='title'>{title}</h1>
      </div>
    </div>
  )
}

export default Banner