import React, { Component } from 'react'
import logo from './logo.svg'
import Keyboard from './components/keyboard/Keyboard'
import Envelope from './components/envelope/Envelope'
import Mixer from './components/mixer/Mixer'
import styles from './App.css'
import Kefir from 'kefir'
import handle from './App.handlers'
const R = require('ramda')

const eventHandler = options => handle(options)

class App extends Component {
  constructor(props) {
    super(props)
    this.octaves = 2
    this.dataFlow$ = Kefir.pool()
    var initState = {
      filterEnv: { A: 0, D: 64, S: 64, R: 127 },
      ampEnv: { A: 0, D: 64, S: 64, R: 127 },
      mixer: {
        oscOne: 0,
        oscTwo: 0,
        noise: 0
      },
      keyboard: {
        note: null
      }
    }
    this.state = initState
    this.event$ = this.dataFlow$.map(e => eventHandler(e))
  }

  componentDidMount() {
    this.event$.onValue(state => {
      this.setState(prevState => {
        return R.mergeDeepRight(prevState, state)
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.keyboard.note !== nextState.keyboard.note) {
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

  streams(data$) {
    this.dataFlow$.plug(data$)
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>{this.state.keyboard.note}</h1>
        </header>
        <Keyboard
          octaves={this.octaves}
          streamType={['keyboard']}
          data$={this.dataFlow$}
        />
        <Mixer
          name='Mixer'
          sliderType='horizontal'
          channels={this.state.mixer}
          streamType={['mixer']}
          data$={this.dataFlow$}
        />
        <Envelope
          name='Filter'
          envs={this.state.filterEnv}
          sliderType='vertical'
          streamType={['filterEnv']}
          data$={this.dataFlow$}
        />
        <Envelope
          name='Amp'
          envs={this.state.ampEnv}
          sliderType='vertical'
          streamType={['ampEnv']}
          data$={this.dataFlow$}
        />
      </div>
    )
  }
}

export default App
