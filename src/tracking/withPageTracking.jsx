import React from 'react'
import trackPageView from './trackPageView'

function withPageTracking(WrappedComponent) {
  return class withPageTracking extends React.Component {
    componentDidMount() {
      trackPageView()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withPageTracking
