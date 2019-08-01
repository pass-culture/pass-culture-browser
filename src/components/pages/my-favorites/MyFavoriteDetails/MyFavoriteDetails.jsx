import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'

import BookingContainer from '../../../layout/booking/BookingContainer'
import Recto from '../../../layout/recto/Recto'
import Verso from '../../../layout/verso/Verso'
import getAreDetailsVisible from '../../../../helpers/getAreDetailsVisible'

class MyFavoriteDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentRecommendation: null,
      forceDetailsVisible: false
    }
  }

  componentDidMount() {
    const { favorite, needsToRequestGetFavorite, requestGetFavorite } = this.props

    if (favorite) {
      this.handleMountDetails()
      return
    }

    if (!needsToRequestGetFavorite) {
      return
    }

    requestGetFavorite(this.handleSetForceDetailsVisible)
  }

  componentDidUpdate (prevProps) {
    const { match, firstMatchingRecommendation } = this.props
    const { forceDetailsVisible } = this.state

    const shouldMountDetails = !forceDetailsVisible &&
      firstMatchingRecommendation &&
      !prevProps.firstMatchingRecommendation
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
    const { firstMatchingRecommendation } = this.props
    this.setState({ currentRecommendation: firstMatchingRecommendation })
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
    const { currentRecommendation } = this.state
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


    console.log('currentRecommendation', currentRecommendation, forceDetailsVisible)

    return (
      <Fragment>
        {forceDetailsVisible && (
          <Route
            path="/favoris/:details(details)/:favoriteId([A-Z0-9]+)/:bookings(reservations)/:cancellation(annulation)?/:confirmation(confirmation)?"
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
              />)}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

MyFavoriteDetails.defaultProps = {
  favorite: null,
  firstMatchingBooking: null,
  firstMatchingRecommendation: null
}

MyFavoriteDetails.propTypes = {
  favorite: PropTypes.shape(),
  firstMatchingBooking: PropTypes.shape(),
  firstMatchingRecommendation: PropTypes.shape(),
  match: PropTypes.shape({
    params: PropTypes.shape({
      details: PropTypes.string
    }).isRequired
  }).isRequired,
  needsToRequestGetFavorite: PropTypes.bool.isRequired,
  requestGetFavorite: PropTypes.func.isRequired
}

export default MyFavoriteDetails
