import { connect } from 'react-redux'
import { compose } from 'redux'
import { assignData, requestData } from 'redux-saga-data'

import MyBookings from './MyBookings'
import { withRequiredLogin } from '../../hocs'
import { bookingNormalizer } from '../../../utils/normalizers'

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

export default compose(
  withRequiredLogin,
  connect(
    null,
    mapDispatchToProps
  )
)(MyBookings)
