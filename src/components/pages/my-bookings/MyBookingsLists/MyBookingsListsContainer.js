import { connect } from 'react-redux'
import { assignData, requestData } from 'redux-saga-data'

import MyBookingsLists from './MyBookingsLists'
import selectMyBookings from './selectors/selectMyBookings'
import selectSoonBookings from './selectors/selectSoonBookings'
import { bookingNormalizer } from '../../../../utils/normalizers'

export const mapStateToProps = state => {
  const myBookings = selectMyBookings(state)
  const soonBookings = selectSoonBookings(state)
  return { myBookings, soonBookings }
}

export const mapDispatchToProps = dispatch => ({
  requestGetBookings: (handleFail, handleSuccess) => {
    dispatch(
      requestData({
        apiPath: '/bookings',
        handleFail,
        handleSuccess,
        normalizer: bookingNormalizer,
      })
    )
  },
  resetRecommendationsAndBookings: () => {
    dispatch(
      assignData({
        bookings: [],
        recommendations: [],
      })
    )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBookingsLists)
