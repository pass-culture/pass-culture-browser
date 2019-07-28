import { connect } from 'react-redux'

import Booking from './Booking'
import selectBookables from '../../selectors/selectBookables'
import selectBookingById from '../../selectors/selectBookingById'

export const mapStateToProps = (state, ownProps) => {
  const { match, recommendation } = ownProps
  const { params } = match
  const { bookingId } = params

  const bookables = selectBookables(state, recommendation)
  const booking = selectBookingById(state, bookingId)

  return {
    bookables,
    booking,
  }
}

export default connect(mapStateToProps)(Booking)
