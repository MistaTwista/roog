import React from 'react'
import Keyboard from './components/keyboard/Keyboard'
import Envelope from './components/envelope/Envelope'
import Mixer from './components/mixer/Mixer'
import styles from './App.css'
import { state$ } from './store'
import connect from './connect'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const getSubstream = (name) => state$.map(s => s[name]).skipDuplicates();

const filterEnv$ = getSubstream('filterEnv')
const ampEnv$ = getSubstream('ampEnv')
const mixer$ = getSubstream('mixer')
const keyboard$ = getSubstream('keyboard')

function FilterEnv() {
  const FilterEnvelope = connect(
    { filterEnv: filterEnv$ },
    ({ filterEnv }) => {
      return (
        <Envelope name='Filter' path='filterEnv' data={filterEnv} />
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

function NoteMonitor() {
  const Note = connect(
    { keyboard: keyboard$ },
    ({ keyboard }) => {
      return (
        <div className={styles.noteMonitor}>{keyboard.note}</div>
      )
    }
  )

  return <Note />
}

const App = (props) => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NoteMonitor />
      </header>
      <Keyboard />
      <FilterEnv />
      <AmpEnv />
      <OscMixer />
    </div>
  )
}

export default App
