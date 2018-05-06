import React from 'react'
import keys from './keys'
import styles from './Keyboard.css'
import { actions$ } from '../../store'

const R = require('ramda')

const keyClassName = obj => {
  const sharp = obj.text.includes('#') ? styles.blackKey : styles.whiteKey
  return [styles.key, sharp].join(' ')
}

function mouseDownHandler(obj) {
  return () => {
    actions$.plug(R.over(R.lensPath(['keyboard']), R.always({note: obj.text})))
  }
}

function mouseUpHandler(obj) {
  return () => {
    actions$.plug(R.over(R.lensPath(['keyboard']), R.always({note: null})))
  }
}

const Keyboard = (props) => {
  return (
    <div className={styles.keyboard}>
      <ul className={styles.keys}>
        {
          keys[0].map((obj) => {
            return(
              <li
                key={obj.key}
                className={keyClassName(obj)}
                onMouseDown={mouseDownHandler(obj)}
                onMouseUp={mouseUpHandler(obj)}
              >
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Keyboard
