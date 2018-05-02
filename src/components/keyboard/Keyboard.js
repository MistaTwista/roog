import React, { PureComponent } from 'react'
import keys from './keys'
import styles from './Keyboard.css'
import Kefir from 'kefir'

const keyClassName = obj => {
  const sharp = obj.text.includes('#') ? styles.blackKey : styles.whiteKey
  return [styles.key, sharp].join(' ')
}

class Keyboard extends PureComponent {
  constructor(props) {
    super(props)
    this.cType = 'KEYBOARD'
    this.data$ = Kefir.pool();
    this.props.cStream(this.data$)
  }

  mouseDownHandler(obj) {
    return () => {
      const e = { type: `${this.cType}:KEY_DOWN`, data: obj }
      this.data$.plug(Kefir.constant(e))
    }
  }

  mouseUpHandler(obj) {
    return () => {
      const e = { type: `${this.cType}:KEY_UP`, data: obj }
      this.data$.plug(Kefir.constant(e))
    }
  }

  render() {
    return (
      <div className={styles.keyboard}>
        <ul className={styles.keys}>
          {
            keys[0].map((obj) => {
              return(
                <li
                  key={obj.key}
                  className={keyClassName(obj)}
                  onMouseDown={this.mouseDownHandler(obj)}
                  onMouseUp={this.mouseUpHandler(obj)}
                >
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Keyboard
