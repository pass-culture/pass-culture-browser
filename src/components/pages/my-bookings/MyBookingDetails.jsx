import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'

import BookingContainer from '../../booking/BookingContainer'
import Recto from '../../recto/Recto'
import Verso from '../../verso/Verso'
import getAreDetailsVisible from '../../../helpers/getAreDetailsVisible'

class MyBookingDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentRecommendation: null,
      forceDetailsVisible: false
    }
  }

  componentDidMount() {
    const { booking, recommendation, requestGetBooking } = this.props

    if (booking) {
      this.handleMountDetails()
      return
    }

    requestGetBooking(this.handleSetForceDetailsVisible)
  }

  componentDidUpdate (prevProps) {
    const { match, recommendation } = this.props
    const { forceDetailsVisible } = this.state

    const shouldMountDetails = !forceDetailsVisible &&
      recommendation &&
      !prevProps.recommendation
    if (shouldMountDetails) {
      this.handleMountDetails()
      return
    }

    const areDetailsVisible = getAreDetailsVisible(match)
    const previousAreDetailsVisible = getAreDetailsVisible(prevProps.match)
    const shouldUnmountDetails = !areDetailsVisible && previousAreDetailsVisible
    if (shouldUnmountDetails) {
      this.handleUnmountDetails()
    }

  }

  handleMountDetails = () => {
    const { recommendation } = this.props
    this.setState({ currentRecommendation: recommendation })
    this.handleSetForceDetailsVisible(true)
  }

  handleSetForceDetailsVisible = forceDetailsVisible => {
    // We need to wait to go out the mount lifecycle
    // in order to force the dom to render twice
    setTimeout(() => this.setState({ forceDetailsVisible }))
  }

  handleUnmountDetails = () => {
    this.handleSetForceDetailsVisible(false)
    setTimeout(() => this.setState({ currentRecommendation: null }), 300)
  }

  renderBooking = route => {
    const { booking, recommendation } = this.props
    return (
      <BookingContainer
        booking={booking}
        extraClassName="with-header"
        {...route}
        recommendation={recommendation}
      />
    )
  }

  render() {
    const { booking } = this.props
    const { currentRecommendation, forceDetailsVisible } = this.state

    return (
      <Fragment>
        {forceDetailsVisible && (
          <Route
            path="/reservations/:details(details)/:bookingId([A-Z0-9]+)/:cancellation(annulation)/:confirmation(confirmation)?"
            render={this.renderBooking}
          />
        )}
        {currentRecommendation && (
          <Fragment>
            <Verso
              areDetailsVisible={forceDetailsVisible}
              booking={booking}
              extraClassName="with-header"
              recommendation={currentRecommendation}
            />
            {forceDetailsVisible && (
              <Recto
                areDetailsVisible
                extraClassName="with-header"
                recommendation={currentRecommendation}
              />)}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

MyBookingDetails.defaultProps = {
  booking: null,
  recommendation: null
}

MyBookingDetails.propTypes = {
  booking: PropTypes.shape(),
  match: PropTypes.shape({
    params: PropTypes.shape({
      details: PropTypes.string
    }).isRequired
  }).isRequired,
  recommendation: PropTypes.shape(),
  requestGetBooking: PropTypes.func.isRequired
}

export default MyBookingDetails
