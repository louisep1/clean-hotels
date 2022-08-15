import React from 'react'

const Banner = ({ title, classes }) => {
  return (
    <div className={`banner banner-${title.toLowerCase()} ${classes}`}>
      <div className="overlay">
        <h1 className='title'>{title}</h1>
      </div>
    </div>
  )
}

export default Banner