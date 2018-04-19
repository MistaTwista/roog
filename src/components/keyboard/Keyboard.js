import React, { Component } from 'react';
import keys from './keys';
import styles from './Keyboard.css';

const keyClassName = obj => {
  const sharp = obj.text.includes('#') ? styles.blackKey : styles.whiteKey
  return [styles.key, sharp].join(' ');
}

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.octaves = 2;
  }

  render() {
    return (
      <div className={styles.keyboard}>
        <ul className={styles.keys}>
          {
            keys[0].map((obj) => {
              return <li key={obj.key} className={keyClassName(obj)}>
                {obj.text} | {obj.keycode} | {obj.key}
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default Keyboard
