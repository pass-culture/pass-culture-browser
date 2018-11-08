/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Logger } from 'pass-culture-shared'

class ErrorCatcher extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    Logger.log(`Current react version: ${React.version}`)
    Logger.error(`Error: ${error}`)
    Logger.error(`With info: ${JSON.stringify(info)}`)
    // logErrorToMyService(error, info)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return children
  }
}

ErrorCatcher.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorCatcher
