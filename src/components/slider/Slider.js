import React from 'react'
import styles from './Slider.css'
import PropTypes from 'prop-types'
import { actions$ } from '../../store'

const R = require('ramda')

function handleChange(statePath) {
  return (e) => {
    const val = e.target.value
    actions$.plug(R.over(R.lensPath(statePath), R.always(+val)))
  }
}

function sliderClassName() {
  return [styles.slider, styles.inline].join(' ')
}

const Slider = (props) => {
  const { name, path, min, max, value, type } = props

  return (
    <div className={sliderClassName()}>
      <span>{name}</span>
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        className={styles[type]}
        onChange={handleChange(path)}
      />
    </div>
  )
}

Slider.defaultProps = {
  min: 0,
  max: 127,
  type: 'vertical',
}

Slider.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['vertical', 'horizontal']),
  path: PropTypes.array.isRequired,
}

export default Slider
