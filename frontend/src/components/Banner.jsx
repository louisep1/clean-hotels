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

    // const setSlideTimer = setTimeout(handleRightClick, 3000)

    // return () => {
    //   clearTimeout(setSlideTimer)
    // }
  }, [imgNo])

  const handleLeftClick = () => {
    imgNo === 0 ? setImgNo(classArray.length - 1) : setImgNo(prevNo => prevNo - 1)
  }

  const handleRightClick = () => {
    imgNo === classArray.length - 1 ? setImgNo(0) : setImgNo(prevNo => prevNo + 1)
  }

  const handleDotClick = i => {
    classArray[i] !== slideClass && setImgNo(i)
  }

  // !!! the fade feature doesn't work - go back and sort
  // https://www.w3schools.com/w3css/w3css_animate.asp
  // https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_animate-opacity
  return (
    <div className={`fade banner banner-${title.toLowerCase()} ${slide ? slideClass : classes}`}>
      <div className="overlay">
        <h1 className='title'>{title}</h1>
        {slide && (
          <>
            <button className="arrow arrow-left" onClick={handleLeftClick}><FiChevronLeft /></button>
            <button className="arrow arrow-right" onClick={handleRightClick}><FiChevronRight /></button>
            <div className="dots">
              {classArray.map((classes, i) => (
                <div key={classes} className={`dot ${classArray[i] === slideClass ? 'dot-current' : 'dot-hover'}`} onClick={() => handleDotClick(i)}></div>
              ))}
            </div>
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