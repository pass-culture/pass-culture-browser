import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { capitalize } from 'react-final-form-utils'
import { Link } from 'react-router-dom'

import Icon from '../../../../../layout/Icon'
import Ribbon from '../../../../../layout/Ribbon'
import { isRecommendationOfferFinished } from '../../../../../../helpers'
import { humanizeRelativeDate } from '../../../../../../utils/date/date'
import { getTimezone } from '../../../../../../utils/timezone'

export const stringify = date => timeZone =>
  capitalize(
    moment(date)
      .tz(timeZone)
      .format('dddd DD/MM/YYYY à H:mm')
  )

const ribbonLabelAndType = (
  isCancelled,
  isFinished,
  humanizeRelativeDate = '',
  isUsed
) => {
  if (isUsed) {
    return {
      label: 'Terminé',
      type: 'finished',
    }
  }
  if (!isCancelled && humanizeRelativeDate === 'Aujourd’hui') {
    return {
      label: 'Aujourd’hui',
      type: 'today',
    }
  } else if (!isCancelled && humanizeRelativeDate === 'Demain') {
    return {
      label: 'Demain',
      type: 'tomorrow',
    }
  } else if (!isCancelled && isFinished) {
    return {
      label: 'Terminé',
      type: 'finished',
    }
  } else if (isCancelled) {
    return {
      label: 'Annulé',
      type: 'cancelled',
    }
  }

  return null
}

const BookingItem = ({
  booking,
  location,
  recommendation
}) => {
  const { pathname, search } = location
  const { id: bookingId, isCancelled, isUsed, stock, token } = booking
  const { beginningDatetime } = stock
  const { offer, offerId, thumbUrl } = recommendation
  const humanizeRelativeBeginningDate = beginningDatetime &&
    humanizeRelativeDate(beginningDatetime)
  const isFinished = isRecommendationOfferFinished(recommendation, offerId)
  const ribbon = ribbonLabelAndType(
    isCancelled,
    isFinished,
    humanizeRelativeBeginningDate,
    isUsed
  )
  const { label, type } = ribbon || {}
  const { product, venue } = offer
  const { name: productName } = product
  const { departementCode } = venue
  const detailsUrl = `${pathname}/details/${bookingId}${search}`
  const timeZone = getTimezone(departementCode)
  const stringifyDate = beginningDatetime && stringify(beginningDatetime)(timeZone)
  return (
    <li
      className="my-bookings-my-booking"
      data-token={token.toLowerCase()}
    >
      <Link
        className="teaser-link"
        to={detailsUrl}
      >
        <div className="teaser-thumb">
          {thumbUrl && (
            <img
              alt=""
              src={thumbUrl}
            />)}
        </div>
        <div className="teaser-wrapper">
          <div className="my-bookings-heading">
            <div className="teaser-title">{productName}</div>
            <div className="teaser-sub-title">{stringifyDate || 'Permanent'}</div>
          </div>
          <div className="my-bookings-token">{token}</div>
        </div>
        <div className="teaser-arrow">
          {ribbon && (
            <Ribbon
              label={label}
              type={type}
            />)}
          <Icon
            className="teaser-arrow-img"
            svg="ico-next-S"
          />
        </div>
      </Link>
    </li>
  )
}

BookingItem.defaultProps = {
  recommendation: null
}

BookingItem.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string,
    isCancelled: PropTypes.bool.isRequired,
    isUsed: PropTypes.bool.isRequired,
    stock: PropTypes.shape({
      beginningDatetime: PropTypes.string
    }),
    token: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  recommendation: PropTypes.shape({
    offer: PropTypes.shape({
      product: PropTypes.shape({
        name: PropTypes.string,
      }),
      venue: PropTypes.shape({
        departementCode: PropTypes.string
      })
    }),
    offerId: PropTypes.string,
    thumbUrl: PropTypes.string
  })
}

export default BookingItem
