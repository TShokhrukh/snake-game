import React from 'react'
import { Game } from './components/Game/Game'
import { store } from './store'
import './css/main.css'

function App () {
  return (
    <React.Fragment>
      <Game map={store.map} />
    </React.Fragment>
  )
}

export default App
