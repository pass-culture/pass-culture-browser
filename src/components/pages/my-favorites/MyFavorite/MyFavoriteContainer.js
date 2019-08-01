import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import MyFavorite from './MyFavorite'

import selectRecommendationByOfferIdAndMediationId from '../../../../selectors/selectRecommendationByOfferIdAndMediationId'
import { humanizeRelativeDistance } from '../../../../utils/geolocation'
import { humanizeRelativeDate } from '../../../../utils/date/date'

export const hasBookings = offer => offer.stocks.some(stock => stock.bookings.length > 0)

export const isBooked = offer => {
  let flag = false

  offer.stocks.forEach(stock => {
    const { bookings } = stock
    const hasAtLeastOneBooking = bookings.length > 0

    if (hasAtLeastOneBooking) {
      const lastBooking = bookings.slice(-1)[0]

      if (!lastBooking.isCancelled) {
        flag = true
      }
    }
  })
  return flag
}

export const reservationStatus = (
  isFinished,
  isFullyBooked,
  hasBookings,
  humanizeRelativeDistance,
  isBooked
) => {
  if (isFinished) {
    return {
      label: 'Terminé',
      class: 'finished',
    }
  } else if (isFullyBooked) {
    return {
      label: 'Épuisé',
      class: 'fully-booked',
    }
  } else if (hasBookings) {
    if (isBooked) {
      return {
        label: 'Réservé',
        class: 'booked',
      }
    } else {
      return {
        label: 'Annulé',
        class: 'cancelled',
      }
    }
  } else if (humanizeRelativeDate) {
    if (humanizeRelativeDate === 'Demain') {
      return {
        label: humanizeRelativeDate,
        class: 'tomorrow',
      }
    } else {
      return {
        label: humanizeRelativeDate,
        class: 'today',
      }
    }
  }

  return null
}

export const mapStateToProps = (state, ownProps) => {
  const { favorite } = ownProps
  const { mediationId, offerId } = favorite
  const { latitude: currentLatitude, longitude: currentLongitude } = state.geolocation
  const firstMatchingRecommendation = selectRecommendationByOfferIdAndMediationId(
    state,
    offerId,
    mediationId
  )
  const hasBookings = hasBookings(offer)
  const isBooked = isBooked(offer)
  const { offer } = firstMatchingRecommendation || {}
  const { venue } = offer || {}
  const { latitude: venueLatitude, longitude: venueLongitude } = venue || {}
  const { dateRange = [], isFinished, isFullyBooked } = offer || {}
  const offerBeginningDate = dateRange[0] || null

  const status = reservationStatus(
    isFinished,
    isFullyBooked,
    hasBookings,
    isBooked,
    offerBeginningDate ? humanizeRelativeDate(offerBeginningDate) : null
  )
  return {
    firstMatchingRecommendation,
    humanizeRelativeDistance: humanizeRelativeDistance(
      venueLatitude,
      venueLongitude,
      currentLatitude,
      currentLongitude
    ),
    status,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(MyFavorite)
