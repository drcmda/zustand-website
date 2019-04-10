import React from 'react'
import { render } from 'react-dom'
import { useSpring, a } from 'react-spring'
import create from 'zustand'
import PrismCode from 'react-prism'
import 'prismjs'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/themes/prism-okaidia.css'
import code from './resources/code.js'
import './styles.css'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 240}px,${y / 240}px,0)`
const trans2 = (x, y) => `translate3d(${x / 200}px,${y / 200}px,0)`
const trans3 = (x, y) => `translate3d(${x / 160}px,${y / 160}px,0)`
const trans4 = (x, y) => `translate3d(${x / 120}px,${y / 120}px,0)`
const trans5 = (x, y) => `translate3d(${x / 80}px,${y / 80}px,0)`
const trans6 = (x, y) => `translate3d(${x / 40}px,${y / 40}px,0)`

const [useStore] = create(set => ({
  count: 1,
  inc: () => set(state => ({ count: state.count + 1 })),
  dec: () => set(state => ({ count: state.count - 1 }))
}))

function Counter() {
  const { count, inc, dec } = useStore()
  return (
    <div class="counter">
      <span>{count}</span>
      <button onClick={inc}>up</button>
      <button onClick={dec}>down</button>
    </div>
  )
}

const App = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0] }))
  return (
    <div class="main" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <a.div class="bg" style={{ transform: props.xy.interpolate(trans1) }} />
      <a.div class="stars" style={{ transform: props.xy.interpolate(trans2) }} />
      <a.div class="ground" />
      <a.div class="code" style={{ transform: props.xy.interpolate(trans3) }}>
        <div class="code-container">
          <PrismCode className="language-jsx" children={code} />
          <Counter />
        </div>
      </a.div>
      <a.div class="bear" style={{ transform: props.xy.interpolate(trans4) }} />
      <a.div class="leaves1" style={{ transform: props.xy.interpolate(trans5) }} />
      <a.div class="leaves2" style={{ transform: props.xy.interpolate(trans6) }} />
      <a href="https://github.com/drcmda/zustand" class="top-right" children="Github" />
      <a href="https://twitter.com/0xca0a" class="bottom-right" children="Twitter" />
      <a href="https://www.instagram.com/tina.henschel/" class="bottom-left" children="Illustrations @ Tina Henschel" />
      <span class="header-left">Zustand</span>
    </div>
  )
}

render(<App />, document.getElementById('root'))
