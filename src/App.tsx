import { css } from '@emotion/react'
import { useState } from 'react'

const itemCss = css({
  width: "100%",
  background: 'green'
})


function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="container" css={css`
      width: 800px;
      background-color: gray;
      margin: auto;
      overflow: hidden;
    `}>
      <div css={itemCss}>
        item1
      </div>
      <div css={itemCss}>
        item2
      </div>
      <div css={itemCss}>
        item3
      </div>
    </div>
  )
}

export default App
