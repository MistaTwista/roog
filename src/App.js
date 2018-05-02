import React, { Component } from 'react'
import logo from './logo.svg'
import Keyboard from './components/keyboard/Keyboard'
import Envelope from './components/envelope/Envelope'
import Mixer from './components/mixer/Mixer'
import styles from './App.css'
import Kefir from 'kefir'
import handle from './App.handlers'

const eventHandler = options => handle(options)

class App extends Component {
  constructor(props) {
    super(props)
    this.octaves = 2
    this.dataFlow$ = Kefir.pool()
    var defaultState = {
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
    this.state = defaultState
    this.state$ = this.dataFlow$.scan((state, data) => {
      return eventHandler({ state, data })
    }, defaultState)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.note !== nextState.note) {
      return true
    } else if (this.state.mixer !== nextState.mixer) {
      return true
    } else if (this.state.filterEnv !== nextState.filterEnv) {
      return true
    } else if (this.state.ampEnv !== nextState.ampEnv) {
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

  ampChange(val) {
    this.setState(prevState => ({ ampEnv: val }))
  }

  filterChange(val) {
    this.setState(prevState => ({ filterEnv: val }))
  }

  mixerChange(channels) {
    this.setState(prevState => ({ mixer: channels }))
  }

  streams(data$) {
    this.dataFlow$.plug(data$)
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
          cStream={this.streams.bind(this)}
          onChange={this.keyboardChange.bind(this)}
        />
        <Mixer
          sliderType='horizontal'
          channels={this.state.mixer}
          onChange={this.mixerChange.bind(this)}
        />
        <Envelope
          name='Filter'
          envs={this.state.filterEnv}
          sliderType='vertical'
          onChange={this.filterChange.bind(this)}
        />
        <Envelope
          name='Amp'
          envs={this.state.ampEnv}
          sliderType='vertical'
          onChange={this.ampChange.bind(this)}
        />
      </div>
    )
  }
}

export default App
