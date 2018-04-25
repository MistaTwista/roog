import React, { PureComponent } from 'react'
import styles from './Envelope.css'
import Slider from './../slider/Slider'
import Debug from '../debug/Debug'
import PropTypes from 'prop-types'

class Envelope extends PureComponent {
  sliderChange(type) {
    return (value) => {
      this.props.onChange(
        Object.assign({}, this.props.envs, {[type]: +value})
      )
    }
  }

  render() {
    return (
      <div className={styles.envelope}>
        <h2>{this.props.name}</h2>
        <Debug debug={this.props.debug} data={this.props.envs} />
        <div>
          {
            Object.keys(this.props.envs).map((name) => {
              return(
                <Slider
                  key={name}
                  value={this.props.envs[name]}
                  name={name}
                  type={this.props.sliderType}
                  onChange={this.sliderChange(name)}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

Envelope.propTypes = {
  envs: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Envelope
