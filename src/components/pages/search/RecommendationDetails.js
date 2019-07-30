import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'

import BookingContainer from '../../layout/booking/BookingContainer'
import Recto from '../../layout/recto/Recto'
import Verso from '../../layout/verso/Verso'
import getAreDetailsVisible from '../../../helpers/getAreDetailsVisible'

class RecommendationDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentRecommendation: null,
      forceDetailsVisible: false,
    }
  }

  componentDidMount() {
    const { needsToRequestGetRecommendation, recommendation, requestGetRecommendation } = this.props
    if (recommendation) {
      this.handleMountDetails()
      return
    }

    if (!needsToRequestGetRecommendation) {
      return
    }
    requestGetRecommendation(this.handleSetAreDetailsVisible)
  }

  componentDidUpdate(prevProps) {
    const { match, recommendation } = this.props
    const { forceDetailsVisible } = this.state

    const shouldMountDetails = !forceDetailsVisible && recommendation && !prevProps.recommendation
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
    const { currentRecommendation } = this.this.state
    if (!currentRecommendation) {
      return null
    }
    return (
      <BookingContainer
        extraClassName="with-header"
        {...route}
        recommendation={currentRecommendation}
      />
    )
  }

  render() {
    const { firstMatchingBooking } = this.props
    const { currentRecommendation, forceDetailsVisible } = this.state
    return (
      <Fragment>
        {forceDetailsVisible && (
          <Route
            path="/recherche/resultats/:option?/details/:offerId([A-Z0-9]+)/:mediationId(vide|[A-Z0-9]+)?/:bookings(reservations)/:bookingId?/:cancellation(annulation)?/:confirmation(confirmation)?"
            render={this.renderBooking}
          />
        )}
        {currentRecommendation && (
          <Fragment>
            <Verso
              areDetailsVisible={forceDetailsVisible}
              booking={firstMatchingBooking}
              extraClassName="with-header"
              recommendation={currentRecommendation}
            />
            {forceDetailsVisible && (
              <Recto
                areDetailsVisible
                extraClassName="with-header"
                recommendation={currentRecommendation}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

RecommendationDetails.defaultProps = {
  firstMatchingBooking: null,
  recommendation: null,
}

RecommendationDetails.propTypes = {
  firstMatchingBooking: PropTypes.shape(),
  match: PropTypes.shape({
    params: PropTypes.shape({
      details: PropTypes.string,
    }).isRequired,
  }).isRequired,
  needsToRequestGetRecommendation: PropTypes.bool.isRequired,
  recommendation: PropTypes.shape(),
  requestGetRecommendation: PropTypes.func.isRequired,
}

export default RecommendationDetails
