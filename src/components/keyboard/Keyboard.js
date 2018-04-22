import React, { Component } from 'react'
import keys from './keys'
import styles from './Keyboard.css'

const keyClassName = obj => {
  const sharp = obj.text.includes('#') ? styles.blackKey : styles.whiteKey
  return [styles.key, sharp].join(' ')
}

class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.octaves = props.octaves
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  mouseDownHandler(obj) {
    return () => {
      this.props.onChange({type: 'KEY_DOWN', obj: obj})
    }
  }

  mouseUpHandler(obj) {
    return () => {
      this.props.onChange({type: 'KEY_UP', obj: obj})
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
