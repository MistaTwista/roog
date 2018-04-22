import React, { Component } from 'react'
import styles from './Envelope.css'
import Slider from './../slider/Slider'

class Envelope extends Component {
  constructor(props) {
    super(props)
    this.sliderType = this.props.sliderType
    this.debug = false
    this.state = this.props.state
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  sliderChange(type) {
    return (value) => {
      this.setState(prevState => {
        const newState = Object.assign(prevState, {[type]: +value})
        this.props.onChange(this.state)
        return newState
      })
    }
  }

  render() {
    return (
      <div className={styles.envelope}>
        <h2>{this.props.name}</h2>
        {this.debug &&
          <div className={styles.intro}>
            {
              Object.keys(this.state).map((name) => {
                return(
                  <div key={name}>
                    <code>{name}</code>
                    <code>{this.state[name]}</code>
                  </div>
                )
              })
            }
          </div>
        }
        <div>
          {
            Object.keys(this.state).map((name) => {
              return(
                <Slider
                  key={name}
                  value={this.state[name]}
                  name={name}
                  type={this.sliderType}
                  onChange={this.sliderChange(name)}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Envelope
