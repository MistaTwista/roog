import React, { Component } from 'react';
import keys from './keys';
import styles from './Keyboard.css';
console.log(styles)

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.octaves = 2;
  }

  render() {
    return (
      <div className="Keyboard">
        <header className="Keyboard-header">
          <h1 className={styles.title}>Welcome to React</h1>
        </header>
        <p className={styles.image}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {
            keys[0].map((obj) => {
              return <li key={obj.key}>
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
