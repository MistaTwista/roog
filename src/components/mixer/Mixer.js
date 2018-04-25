import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Mixer.css'
import Slider from './../slider/Slider'
import Debug from '../debug/Debug'

class Mixer extends PureComponent {
  mixerChange(type) {
    return (value) => {
      this.props.onChange(
        Object.assign({}, this.props.channels, {[type]: +value})
      )
    }
  }

  render() {
    return (
      <div className={styles.mixer}>
        <h2>{this.props.name}</h2>
        <Debug debug={this.props.debug} data={this.props.channels} />
        <div>
          {
            Object.keys(this.props.channels).map((name, index) => {
              return(
                <Slider
                  key={index}
                  value={this.props.channels[name]}
                  name={name}
                  type={this.props.sliderType}
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
  channels: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Mixer
