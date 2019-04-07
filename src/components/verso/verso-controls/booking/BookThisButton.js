import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Price from '../../../layout/Price'

const BookThisButton = ({ linkDestination, priceValue }) => (
  <Link to={linkDestination} id="verso-booking-button" className="flex-columns">
    <Price
      free="Gratuit"
      value={priceValue}
      className="pc-ticket-button-price"
    />
    <span className="pc-ticket-button-label">J&apos;y vais!</span>
  </Link>
)

BookThisButton.propTypes = {
  linkDestination: PropTypes.string.isRequired,
  priceValue: PropTypes.array.isRequired,
}

export default BookThisButton
