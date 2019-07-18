import PropTypes from 'prop-types'
import React from 'react'

import BookingItemContainer from './BookingItemContainer'

export const BookingsList = ({ bookings }) => (
  <ul>
    {bookings.map(booking => (
      <BookingItemContainer
        booking={booking}
        key={booking.id}
      />
    ))}
  </ul>
)

BookingsList.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default BookingsList
