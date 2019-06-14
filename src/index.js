import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DefaultErrorComponent extends Component {
  render() {
    return (
      <div className='error'>
        <div>An Error Occurred</div>
        <div>{this.error}</div>
        <div>{this.info}</div>
      </div>
    )
  }
}

export default class HoneyBadgerErrorBoundary extends Component {
  static propTypes = {
    honeybadger: PropTypes.object,
    children: PropTypes.element,
    ErrorComponent: PropTypes.element || PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      error: null,
      info: null,
      errorOccurred: false
    }
  }

  static getDerivedStateFromError (error) {
    return { errorOccurred: true, error: error }
  }

  componentDidCatch (error, info) {
    this.setState({errorOccurred: true, error: error, info: info})
    this.props.honeybadger.notify(error, { context: info })
  }
  render() {
    if (this.state.errorOccurred) {
      const {ErrorComponent} = this.props
      return ErrorComponent ? React.createElement(ErrorComponent, this.state) : <DefaultErrorComponent />
    } else {
      return this.props.children
    }
  }
}
