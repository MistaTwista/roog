import React, { PureComponent } from 'react'
import styles from './Slider.css'
import PropTypes from 'prop-types'
import Kefir from 'kefir'

class Slider extends PureComponent {
  constructor(props) {
    super(props)
    this.streamType = this.props.streamType.concat([this.props.name])
  }

  sliderClassName() {
    return [styles.slider, styles.inline].join(' ')
  }

  handleChange(e) {
    const val = e.target.value
    this.props.data$.plug(Kefir.constant({
      type: this.streamType,
      data: val
    }))
  }

  render() {
    return (
      <div className={this.sliderClassName()}>
        <span>{this.props.name}</span>
        <input
          type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          className={styles[this.props.type]}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

Slider.defaultProps = {
  min: 0,
  max: 127,
}

Slider.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['vertical', 'horizontal']),
  streamType: PropTypes.array.isRequired,
  data$: PropTypes.object.isRequired,
}

export default Slider
