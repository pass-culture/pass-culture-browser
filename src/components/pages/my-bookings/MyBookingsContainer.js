import { connect } from 'react-redux'
import { compose } from 'redux'
import { assignData, requestData } from 'redux-saga-data'

import MyBookings from './MyBookings'
import { bookingNormalizer } from '../../../utils/normalizers'
import { withRedirectToSigninWhenNotAuthenticated } from '../../hocs'
import {
  selectSoonBookings,
  selectOtherBookings,
  selectRecommendations,
} from '../../../selectors'

export const mapStateToProps = state => {
  const recommendations = selectRecommendations(state)
  const otherBookings = selectOtherBookings(state)
  const soonBookings = selectSoonBookings(state)
  return { otherBookings, recommendations, soonBookings }
}

export const mapDispachToProps = dispatch => ({
  fetchUserBookings: (handleSuccess, handleFail) => {
    const opts = {
      apiPath: '/bookings',
      handleFail,
      handleSuccess,
      normalizer: bookingNormalizer,
    }
    dispatch(requestData(opts))
  },
  resetRecommendations: () => {
    const opts = { recommendations: [] }
    dispatch(assignData(opts))
  },
})

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  connect(
    mapStateToProps,
    mapDispachToProps
  )
)(MyBookings)
