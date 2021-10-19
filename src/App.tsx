import { css } from '@emotion/react'
import { createRef, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

const mainContainerCss = css`
  width: 100%;
  height: 300px;
  margin: auto;
  border: 1px solid gray;
`

const carouselContainerCss = css`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;


  /* remove firefox scroll bar style   */
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;

  /* remove edge and chrome scroll bar style */
  &::-webkit-scrollbar{
    display: none;
  }
`

const carouselItemCss = css`
  display: inline-block;
  flex: 0 0 100%;
  height: 280px;
  scroll-snap-align: start;
`


const carouselIndicatorContainerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const indicatorCss = css`
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  margin: 1px;
`


function App() {
  const containerRef = createRef<HTMLDivElement>()
  // const containerRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(4)
  const [activeIndex, setActiveIndex] = useState(0)

  const [scrollProgress, setScrollProgress] = useState(0);

  const delaySetActiveIndex = debounce((index: number) => {
    setActiveIndex(index)
  }, 150)

  const renderDots = () => {

    return [...Array(count).keys()].map(index => {

      const active = activeIndex === index

      return <div key={index} css={[indicatorCss, active && { background: "black" }]} onClick={() => {

        containerRef.current?.scrollTo({
          left: containerRef.current.clientWidth * index
        })
      }} />
    });
  }


  const handleOnScroll = () => {

    if (!containerRef.current) return

    const el = containerRef.current
    const windowScroll = el.scrollLeft;
    const totalWidth = el.scrollWidth - el.clientWidth

    const progress = (windowScroll / totalWidth) * 100

    setScrollProgress(progress)


    const activeIndex = Math.floor((scrollProgress * count) / 100);
    delaySetActiveIndex(activeIndex)

  }

  return (
    <div id="main-container" css={mainContainerCss}>
      <div id="carousel-container" css={carouselContainerCss} ref={containerRef}
        onScroll={handleOnScroll}
      >
        <div className="carousel-item" css={[carouselItemCss, { background: 'green' }]} >1</div>
        <div className="carousel-item" css={[carouselItemCss, { background: 'blue' }]}>2</div>
        <div className="carousel-item" css={[carouselItemCss, { background: 'red' }]}>3</div>
        <div className="carousel-item" css={[carouselItemCss, { background: 'gray' }]}>4</div>
      </div>
      <div id="carousel-indicator" css={carouselIndicatorContainerCss}>
        {renderDots()}
      </div>
    </div>

  )
}

export default App
