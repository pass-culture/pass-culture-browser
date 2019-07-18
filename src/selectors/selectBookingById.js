import { createSelector } from 'reselect'

const selectBookingById = createSelector(
  state => state.data.bookings,
  (state, bookingId) => bookingId,
  (bookings, bookingId) => bookings.find(o => o.id === bookingId)
)

export default selectBookingById
