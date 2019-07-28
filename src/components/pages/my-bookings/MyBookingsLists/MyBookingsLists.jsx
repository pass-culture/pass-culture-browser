import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import BookingsList from './BookingsList/BookingsList'
import NoBookings from './NoBookings'
import RelativeFooterContainer from '../../../layout/RelativeFooter/RelativeFooterContainer'

const MyBookingsLists = ({ isEmpty, myBookings, soonBookings }) => (
  <Fragment>
    <div className="page-content">
      {isEmpty && <NoBookings />}

      {soonBookings.length > 0 && (
        <section className="my-bookings-section">
          <header className="my-bookings-header">{'C’est bientôt !'}</header>
          <BookingsList bookings={soonBookings} />
        </section>
      )}

      {myBookings.length > 0 && (
        <section className="my-bookings-section">
          <header className="my-bookings-header">{'Réservations'}</header>
          <BookingsList bookings={myBookings} />
        </section>
      )}
    </div>
    <RelativeFooterContainer
      className="dotted-top-white"
      theme="purple"
    />
  </Fragment>
)

MyBookingsLists.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
  myBookings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  soonBookings: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default MyBookingsLists
