import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import MyBookingDetails from './MyBookingDetails'
import selectRecommendationById from '../selectors/selectRecommendationById'
import selectBookingById from '../../../../selectors/selectBookingById'
import { bookingNormalizer } from '../../../../utils/normalizers'

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params } = match
  const { bookingId } = params
  const booking = selectBookingById(state, bookingId)
  const { recommendationId } = booking || {}
  const recommendation = selectRecommendationById(state, recommendationId)
  return {
    booking,
    recommendation,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestGetBooking: handleSuccess => {
      const { match } = ownProps
      const { params } = match
      const { bookingId } = params
      let apiPath = `/bookings/${bookingId}`
      dispatch(
        requestData({
          apiPath,
          handleSuccess,
          normalizer: bookingNormalizer,
        })
      )
    },
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MyBookingDetails)
