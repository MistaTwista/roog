import React from 'react'
import styles from './Mixer.css'
import Slider from '../slider/Slider'
import Debug from '../debug/Debug'
import PropTypes from 'prop-types'
import { makePath } from '../../utils'


const Mixer = (props) => {
  const { name, debug, path = 'mixer', data, sliderType = 'horizontal' } = props

  return (
    <div className={styles.mixer}>
      <h2>{name}</h2>
      <Debug debug={debug} data={data} />
      <div>
        {
          Object.keys(data).map((sliderName) => {
            return(
              <Slider
                key={sliderName}
                value={data[sliderName]}
                name={sliderName}
                path={makePath(path, [sliderName])}
                type={sliderType}
              />
            )
          })
        }
      </div>
    </div>
  )
}

Mixer.propTypes = {
  name: PropTypes.string,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sliderType: PropTypes.string,
  debug: PropTypes.bool,
}

export default Mixer
