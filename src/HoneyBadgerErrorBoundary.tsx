import React, {Component, ReactNode} from 'react'
import HoneybadgerClient from '@honeybadger-io/js/dist/browser/types/core/client'
import DefaultErrorComponent, {DefaultErrorComponentProps} from "./DefaultErrorComponent"
import PropTypes from "prop-types";

interface HoneyBadgerErrorBoundaryProps {
  honeybadger: HoneybadgerClient
  ErrorComponent?: ReactNode
}

interface HoneyBadgerErrorBoundaryState extends DefaultErrorComponentProps {
  errorOccurred: boolean
}

export default class HoneyBadgerErrorBoundary extends Component<HoneyBadgerErrorBoundaryProps, HoneyBadgerErrorBoundaryState> {

  static propTypes = {
    honeybadger: PropTypes.object.isRequired,
    children: PropTypes.element,
    ErrorComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  }

  constructor(props: HoneyBadgerErrorBoundaryProps) {
    super(props)
    this.state = {
      error: null,
      info: null,
      errorOccurred: false
    }
  }

  public static getDerivedStateFromError(error: Error): HoneyBadgerErrorBoundaryState {
    return {error: error, errorOccurred: true, info: null}
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({errorOccurred: true, error: error, info: errorInfo})
    this.props.honeybadger.notify(error, {context: errorInfo as any})
  }

  private getErrorComponent(): ReactNode {
    return this.props.ErrorComponent
      ? React.createElement(this.props.ErrorComponent as any, this.state)
      : <DefaultErrorComponent {...this.state} />
  }

  render() {
    return (
      <>
        {this.state.errorOccurred
          ? this.getErrorComponent()
          : this.props.children
        }
      </>
    )
  }
}
