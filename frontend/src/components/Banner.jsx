import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Banner = ({ title, classes, slide }) => {
  // if there is a slide feature, instead of showing classes as is, will only show the class being displayed

  const [classArray, setclassArray] = useState(slide ? classes.split(' ') : [])
  const [imgNo, setImgNo] = useState(0)
  const [slideClass, setSlideClass] = useState(classes)

  const [swipeStart, setSwipeStart] = useState(0)
  const [swipeEnd, setSwipeEnd] = useState(0)

  useEffect(() => {
    slide && setSlideClass(classes.split(' ')[0])
  }, [])

  useEffect(() => {
    slide && setSlideClass(classArray[imgNo])

    const setSlideTimer = setTimeout(handleRightClick, 4000)

    return () => {
      clearTimeout(setSlideTimer)
    }
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

  const handleSwipe = e => {
    const left = document.getElementById('left')
    const right = document.getElementById('right')

    if (swipeStart > left.getBoundingClientRect().right && swipeStart < right.getBoundingClientRect().left) {
      setSwipeEnd(e.changedTouches[0].screenX)
      swipeStart > swipeEnd ? handleRightClick() : handleLeftClick()
    }

    setSwipeStart(0)
  }

  return (
    <div className={`banner banner-${title.toLowerCase()} ${slide ? slideClass : classes}`} onTouchStart={e => setSwipeStart(e.changedTouches[0].screenX)} onTouchEnd={e => handleSwipe(e)}>
      <div className="overlay">
        <h1 className='title'>{title}</h1>
        {slide && (
          <>
            <button className="arrow arrow-left" id='left' onClick={handleLeftClick}><FiChevronLeft /></button>
            <button className="arrow arrow-right" id='right' onClick={handleRightClick}><FiChevronRight /></button>
            <div className="dots">
              {classArray.map((classes, i) => (
                <div key={classes} className={`dot ${classArray[i] === slideClass ? 'dot-current' : 'dot-hover'}`} onClick={() => handleDotClick(i)}></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div >
  )
}

Banner.defaultProps = {
  slide: false
}

export default Banner