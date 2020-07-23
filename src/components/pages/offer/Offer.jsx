import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router'

import DetailsContainer from '../../layout/Details/DetailsContainer'
import CloseLink from '../../layout/Header/CloseLink/CloseLink'

const Offer = ({ getOfferById, match }) => (
  <Route
    exact
    path={`${match.path}/:booking(reservation)?/:bookingId([A-Z0-9]+)?/:cancellation(annulation)?/:confirmation(confirmation)?`}
    sensitive
  >
    <main className="offer-page">
      <CloseLink
        closeTitle="Fermer"
        closeTo="/decouverte"
      />
      <DetailsContainer getOfferById={getOfferById} />
    </main>
  </Route>
)

Offer.propTypes = {
  getOfferById: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
}

export default Offer
