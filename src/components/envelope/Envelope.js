import React, { PureComponent } from 'react'
import styles from './Envelope.css'
import Slider from './../slider/Slider'
import Debug from '../debug/Debug'
import PropTypes from 'prop-types'

class Envelope extends PureComponent {
  render() {
    return (
      <div className={styles.envelope}>
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

Envelope.propTypes = {
  name: PropTypes.string.isRequired,
  sliderType: PropTypes.string,
  data: PropTypes.object.isRequired,
  streamType: PropTypes.array.isRequired,
  data$: PropTypes.object.isRequired,
  debug: PropTypes.bool,
}

export default Envelope
