import React, { Component } from 'react'
const R = require('ramda')
const K = require('kefir')

function connect(streamsToProps, ComponentToWrap) {
  class Wrapper extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    componentWillMount() {
      const props$ = K.combine(streamsToProps).throttle(20, { leading: false })

      this.sb = props$.observe(data => {
        this.setState(data)
      })
    }

    componentWillUnmount() {
      this.sb.unsubscribe()
    }

    render() {
      return React.createElement(
        ComponentToWrap,
        R.merge(this.props, this.state),
        this.props.children
      )
    }
  }

  return Wrapper
}

export default connect
