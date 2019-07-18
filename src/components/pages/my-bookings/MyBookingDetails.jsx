import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'

import BookingContainer from '../../booking/BookingContainer'
import Recto from '../../recto/Recto'
import Verso from '../../verso/Verso'

class MyBookingDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { areDetailsVisible: false }
  }

  componentDidMount() {
    const { booking, requestGetBooking } = this.props

    if (booking) {
      // We need to wait to go out the mount lifecycle
      // in order to force the dom to render
      // twice
      setTimeout(this.handleForceDetailsVisible)
      return
    }

    requestGetBooking(this.handleForceDetailsVisible)
  }

  handleForceDetailsVisible = () => {
    this.setState({ areDetailsVisible: true })
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
    const { booking, recommendation } = this.props
    const { areDetailsVisible } = this.state
    return (
      <Fragment>
        {areDetailsVisible && (
          <Route
            path="/reservations/:details(details)/:bookingId([A-Z0-9]+)/:cancellation(annulation)/:confirmation(confirmation)?"
            render={this.renderBooking}
          />
        )}
        {recommendation && (
          <Fragment>
            <Verso
              areDetailsVisible={areDetailsVisible}
              booking={booking}
              extraClassName="with-header"
              recommendation={recommendation}
            />
            <Recto
              areDetailsVisible={areDetailsVisible}
              extraClassName="with-header"
              recommendation={recommendation}
            />
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
  recommendation: PropTypes.shape(),
  requestGetBooking: PropTypes.func.isRequired
}

export default MyBookingDetails
