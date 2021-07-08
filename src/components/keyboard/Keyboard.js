import React from 'react'
import keys from './keys'
import styles from './Keyboard.css'
import { actions$ } from '../../store'
import { action } from '../../utils'

const keyClassName = obj => {
  const sharp = obj.text.includes('#') ? styles.blackKey : styles.whiteKey
  return [styles.key, sharp].join(' ')
}

const noteAction = action(['keyboard', 'note'])

function mouseDown(obj) {
  return () => {
    actions$.plug(noteAction(obj.text))
  }
}

function mouseUp(_) {
  return () => {
    actions$.plug(noteAction(null))
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
                onMouseDown={mouseDown(obj)}
                onMouseUp={mouseUp(obj)}
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
