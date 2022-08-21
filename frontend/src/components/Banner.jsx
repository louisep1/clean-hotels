import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Banner = ({ title, classes, slide }) => {
  // if there is a slide feature, instead of showing classes as is, will only show the class being displayed

  const [classArray, setclassArray] = useState(slide ? classes.split(' ') : [])
  const [imgNo, setImgNo] = useState(0)
  const [slideClass, setSlideClass] = useState(classes)

  useEffect(() => {
    slide && setSlideClass(classes.split(' ')[0])
  }, [])

  useEffect(() => {
    slide && setSlideClass(classArray[imgNo])
  }, [imgNo])

  const handleLeftClick = () => {
    imgNo === 0 ? setImgNo(classArray.length - 1) : setImgNo(prevNo => prevNo - 1)
  }

  const handleRightClick = () => {
    imgNo === classArray.length - 1 ? setImgNo(0) : setImgNo(prevNo => prevNo + 1)
  }

  return (
    <div className={`banner banner-${title.toLowerCase()} ${slide ? slideClass : classes}`}>
      <div className="overlay">
        <h1 className='title'>{title}</h1>
        {slide && (
          <>
            <button className="arrow arrow-left" onClick={handleLeftClick}><FiChevronLeft /></button>
            <button className="arrow arrow-right" onClick={handleRightClick}><FiChevronRight /></button>
          </>
        )}
      </div>
    </div>
  )
}

Banner.defaultProps = {
  slide: false
}

export default Banner