import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import withTracking from '../../hocs/withTracking'
import Booking from './Booking'
import selectBookables from '../../../selectors/selectBookables'
import selectBookingByRouterMatch from '../../../selectors/selectBookingByRouterMatch'
import selectOfferByRouterMatch from '../../../selectors/selectOfferByRouterMatch'
import selectRecommendationByRouterMatch from '../../../selectors/selectRecommendationByRouterMatch'
import { bookingNormalizer } from '../../../utils/normalizers'

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps

  const offer = selectOfferByRouterMatch(state, match)
  const bookables = selectBookables(state, offer)
  const booking = selectBookingByRouterMatch(state, match)
  const recommendation = selectRecommendationByRouterMatch(state, match)

  return {
    bookables,
    booking,
    offer,
    recommendation,
  }
}

export const mapDispatchToProps = dispatch => ({
  handleSubmit: (formValues, handleRequestFail, handleRequestSuccess) => {
    dispatch(
      requestData({
        apiPath: '/bookings',
        body: { ...formValues, quantity: 1 },
        handleFail: handleRequestFail,
        handleSuccess: handleRequestSuccess,
        method: 'POST',
        name: 'booking',
        normalizer: bookingNormalizer,
      })
    )
  },
})

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { offer: { id: offerId } = {} } = stateProps

  return {
    ...stateProps,
    ...dispatchProps,
    trackBookingSuccess: () => {
      ownProps.tracking.trackEvent({ action: 'bookingOffer', name: offerId })
    },
  }
}

export default compose(
  withRouter,
  withTracking('Offer'),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Booking)
