import React, { Component } from 'react'
import logo from './logo.svg'
import Keyboard from './components/keyboard/Keyboard'
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
      env: {
        amplifier: [0, 64, 64, 127],
        filter: [0, 64, 64, 127]
      },
      mixer: {
        oscOne: 127,
        oscSub: 0,
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

  handleKeyPress(note) {
    this.setState(prevState => ({ note: note.text }));
    this.note = note.text
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>{this.note}</h1>
        </header>
        <p className={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Keyboard
          octaves={this.octaves}
          onClick={(note) => this.handleKeyPress(note)}
        />
      </div>
    )
  }
}

export default App
