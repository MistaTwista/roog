import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Debug.css'

class Debug extends PureComponent {
  render() {
    return (
      <div className={styles.debug}>
        {this.props.debug &&
          <div>
            {
              Object.keys(this.props.data).map((name, index) => {
                return(
                  <div key={index}>
                    <code>{name}:&nbsp;</code>
                    <code>{this.props.data[name]}</code>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    );
  }
}

Debug.defaultProps = {
  debug: false
}

Debug.propTypes = {
  debug: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
}

export default Debug
