import React, { Component } from 'react'
import logo from './logo.svg'
import Keyboard from './components/keyboard/Keyboard'
import Envelope from './components/envelope/Envelope'
import Mixer from './components/mixer/Mixer'
import styles from './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.octaves = 2
    this.state = {
      filter: {
        type: 'LP',
        value: 100
      },
      filterEnv: { A: 0, D: 64, S: 64, R: 127 },
      ampEnv: { A: 0, D: 64, S: 64, R: 127 },
      mixer: {
        oscOne: 0,
        oscTwo: 0,
        noise: 0
      },
      oscillators: [
        { octave: 1, frequency: 64 },
        { octave: 1, frequency: 127 }
      ],
      masterVolume: 127,
      note: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.note !== nextState.note) {
      return true
    }
    return false
  }

  keyboardChange(event) {
    if (event.type === 'KEY_DOWN') {
      this.setState(prevState => ({ note: event.obj.text }))
    } else if (event.type === 'KEY_UP') {
      this.setState(prevState => ({ note: null }))
    }
  }

  envelopeChange(val) {
    this.setState(prevState => ({ amplifierEnv: val }))
  }

  filterChange(val) {
    this.setState(prevState => ({ filterEnv: val }))
  }

  mixerChange(state) {
    this.setState(prevState => ({mixer: state}))
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>{this.state.note}</h1>
        </header>
        <Keyboard
          octaves={this.octaves}
          onChange={(event) => this.keyboardChange(event)}
        />
        <Mixer
          sliderType='horizontal'
          state={this.state.mixer}
          onChange={(state) => this.mixerChange(state)}
        />
        <Envelope
          name='Filter'
          state={this.state.filterEnv}
          sliderType='vertical'
          onChange={(val) => this.filterChange(val)}
        />
        <Envelope
          name='Amp'
          state={this.state.ampEnv}
          sliderType='vertical'
          onChange={(val) => this.envelopeChange(val)}
        />
      </div>
    )
  }
}

export default App
