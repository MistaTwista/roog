import React from 'react'
import logo from './logo.svg'
import Keyboard from './components/keyboard/Keyboard'
import Envelope from './components/envelope/Envelope'
import Mixer from './components/mixer/Mixer'
import styles from './App.css'
import { state$ } from './store'
import connect from './connect'

const filterEnv$ = state$.map(s => s.filterEnv).skipDuplicates()
const ampEnv$ = state$.map(s => s.ampEnv).skipDuplicates()
const mixer$ = state$.map(s => s.mixer).skipDuplicates()

function FilterEnv() {
  const FilterEnvelope = connect(
    { filterEnv: filterEnv$ },
    ({ filterEnv }) => {
      return (
        <Envelope name='Filter' path='filterEnv' debug={true} data={filterEnv} />
      )
    }
  )

  return <FilterEnvelope />
}

function AmpEnv() {
  const AmpEnvelope = connect(
    { ampEnv: ampEnv$ },
    ({ ampEnv }) => {
      return (
        <Envelope name='Amp' path='ampEnv' data={ampEnv} />
      )
    }
  )

  return <AmpEnvelope />
}

function OscMixer() {
  const OscillatorMixer = connect(
    { mixer: mixer$ },
    ({ mixer }) => {
      return (
        <Mixer name='Mixer' data={mixer} />
      )
    }
  )

  return <OscillatorMixer />
}

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
          <FilterEnv />
          <AmpEnv />
          <OscMixer />
        </div>
      )
    }
  )

  return <Synth />
}

export default App
