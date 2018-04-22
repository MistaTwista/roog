import React, { Component } from 'react'
import styles from './Slider.css'
import PropTypes from 'prop-types'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
    }
  }

  sliderClassName() {
    return [styles.slider, styles.inline].join(' ')
  }

  handleChange(e) {
    let val = e.target.value
    this.setState(prevState => ({ value: val }))
    this.props.onChange(val)
  }

  render() {
    return (
      <div className={this.sliderClassName()}>
        <span>{this.props.name}</span>
        <input
          type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
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
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['vertical', 'horizontal']),
  onChange: PropTypes.func.isRequired,
}

export default Slider
