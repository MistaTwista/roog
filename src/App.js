import React from 'react'
import logo from './logo.svg'
import Keyboard from './components/keyboard/Keyboard'
import Envelope from './components/envelope/Envelope'
import Mixer from './components/mixer/Mixer'
import styles from './App.css'
import { state$ } from './store'
import connect from './connect'


function App() {
  const Synth = connect(
    { state: state$ },
    ({ state }) => {
      return (
        <div className={styles.app}>
          <header className={styles.header}>
            <img src={logo} className={styles.logo} alt='logo' />
            <h1>{state.keyboard.note}</h1>
          </header>
          <Keyboard />
          <Envelope
            name='Filter'
            path='filterEnv'
            data={state.filterEnv}
          />
          <Envelope
            name='Amp'
            path='ampEnv'
            data={state.ampEnv}
          />
          <Mixer
            name='Mixer'
            data={state.mixer}
          />
        </div>
      )
    }
  )

  return <Synth />
}

export default App
