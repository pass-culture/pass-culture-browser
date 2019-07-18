import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'

import BookingContainer from '../../booking/BookingContainer'
import Recto from '../../recto/Recto'
import Verso from '../../verso/Verso'

class RecommendationDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { areDetailsVisible: false }
  }

  componentDidMount() {
    const { recommendation, requestGetRecommendation } = this.props

    if (recommendation) {
      // We need to wait to go out the mount lifecycle
      // in order to force the dom to render
      // twice
      setTimeout(this.handleSetAreDetailsVisible)
      return
    }

    requestGetRecommendation(this.handleSetAreDetailsVisible)
  }

  handleSetAreDetailsVisible = () => {
    this.setState({ areDetailsVisible: true })
  }

  renderBooking = route => {
    const { recommendation } = this.props
    return (
      <BookingContainer
        extraClassName="with-header"
        {...route}
        recommendation={recommendation}
      />
    )
  }

  render() {
    const { recommendation } = this.props
    const { areDetailsVisible } = this.state

    return (
      <Fragment>
        {areDetailsVisible && (
          <Route
            path="/recherche/resultats/:option?/details/:offerId([A-Z0-9]+)/:mediationId(vide|[A-Z0-9]+)?/:bookings(reservations)/:bookingId?/:cancellation(annulation)?/:confirmation(confirmation)?"
            render={this.renderBooking}
          />
        )}
        {recommendation && (
          <Fragment>
            <Verso
              areDetailsVisible={areDetailsVisible}
              extraClassName="with-header"
              recommendation={recommendation}
            />
            <Recto
              areDetailsVisible={areDetailsVisible}
              extraClassName="with-header"
              position="current"
              recommendation={recommendation}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

RecommendationDetails.defaultProps = {
  recommendation: null,
}

RecommendationDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  recommendation: PropTypes.shape(),
  requestGetRecommendation: PropTypes.func.isRequired,
}

export default RecommendationDetails
