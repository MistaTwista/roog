import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Mixer.css'
import Slider from './../slider/Slider'

class Mixer extends Component {
  constructor(props) {
    super(props)
    this.sliderType = this.props.sliderType
    this.state = this.props.state
  }

  mixerChange(type) {
    return (value) => {
      this.setState(prevState => {
        const newState = Object.assign(prevState, {[type]: +value})
        this.props.onChange(this.state)
        return newState
      })
    }
  }

  static defaultProps = {
    oscOne: 0,
    oscTwo: 0,
    noise: 0
  }

  render() {
    return (
      <div className={styles.mixer}>
        <h2>{this.props.name}</h2>
        <div>
          {
            Object.keys(this.state).map((name, index) => {
              return(
                <Slider
                  key={index}
                  value={this.state[name]}
                  name={name}
                  type={this.sliderType}
                  onChange={this.mixerChange(name)}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

Mixer.propTypes = {
  oscOne: PropTypes.number.isRequired,
  oscTwo: PropTypes.number.isRequired,
  noise: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Mixer
