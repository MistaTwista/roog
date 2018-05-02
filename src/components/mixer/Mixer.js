import React, { PureComponent } from 'react'
import styles from './Mixer.css'
import Slider from './../slider/Slider'
import Debug from '../debug/Debug'
import PropTypes from 'prop-types'

class Mixer extends PureComponent {
  render() {
    return (
      <div className={styles.mixer}>
        <h2>{this.props.name}</h2>
        <Debug debug={this.props.debug} data={this.props.data} />
        <div>
          {
            Object.keys(this.props.data).map((name) => {
              return(
                <Slider
                  key={name}
                  value={this.props.data[name]}
                  name={name}
                  type={this.props.sliderType}
                  streamType={this.props.streamType}
                  data$={this.props.data$}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

Mixer.propTypes = {
  name: PropTypes.string,
  sliderType: PropTypes.string,
  data: PropTypes.object.isRequired,
  streamType: PropTypes.array.isRequired,
  data$: PropTypes.object.isRequired,
  debug: PropTypes.bool,
}

export default Mixer
