import React from 'react'
import styles from './Envelope.css'
import Slider from './../slider/Slider'
import Debug from '../debug/Debug'
import PropTypes from 'prop-types'
import { makePath } from '../../utils'


const Envelope = ({ name, debug, path, data, sliderType }) => {
  return (
    <div className={styles.envelope}>
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
                type={sliderType}
                path={makePath(path, [sliderName])}
              />
            )
          })
        }
      </div>
    </div>
  );
}

Envelope.propTypes = {
  name: PropTypes.string.isRequired,
  sliderType: PropTypes.string,
  data: PropTypes.object.isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  debug: PropTypes.bool,
}

export default Envelope
