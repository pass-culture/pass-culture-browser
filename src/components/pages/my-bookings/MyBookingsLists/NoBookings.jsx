import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const NoBookings = () => (
  <Fragment>
    <Link
      className="my-bookings-link-offers"
      to="/decouverte"
    >
      {'Lancez-vous'}
    </Link>
    <p className="my-bookings-text">
      {'Dès que vous aurez réservé une offre,'}
      <br />
      {'vous la retrouverez ici.'}
    </p>
  </Fragment>
)

export default NoBookings
