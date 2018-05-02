import React, { PureComponent } from 'react'
import keys from './keys'
import styles from './Keyboard.css'
import Kefir from 'kefir'

const keyClassName = obj => {
  const sharp = obj.text.includes('#') ? styles.blackKey : styles.whiteKey
  return [styles.key, sharp].join(' ')
}

class Keyboard extends PureComponent {
  mouseDownHandler(obj) {
    const type = this.props.streamType.concat(['key_down'])
    return () => {
      const e = { type, data: obj }
      this.props.data$.plug(Kefir.constant(e))
    }
  }

  mouseUpHandler(obj) {
    const type = this.props.streamType.concat(['key_up'])
    return () => {
      const e = { type, data: obj }
      this.props.data$.plug(Kefir.constant(e))
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
