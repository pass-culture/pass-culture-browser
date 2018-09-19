/* eslint
  react/jsx-one-expression-per-line: 0 */
import PropTypes from 'prop-types'
import get from 'lodash.get'
import moment from 'moment'
import { capitalize } from 'pass-culture-shared'
import React, { Fragment } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'

import { THUMBS_URL } from '../../../utils/config'
import { getQueryURL } from '../../../helpers'
import { getTimezone } from '../../../utils/timezone'

const formatDate = (date, tz) =>
  capitalize(
    moment(date)
      .tz(tz)
      .format('dddd DD/MM/YYYY')
  )

const getRecommendationDateString = (offer, tz) => {
  if (offer.eventId === null) return 'permanent'
  const fromDate = offer.dateRange[0]
  const toDate = offer.dateRange[1]
  const formatedDate = `du
  ${formatDate(fromDate, tz)} au ${formatDate(toDate, tz)}`
  return formatedDate
}

const getRecommendationTimezoneDate = item => {
  const departementCode = get(item, 'offer.venue.departementCode')
  const tz = getTimezone(departementCode)
  const dates = item.offer && getRecommendationDateString(item.offer, tz)
  return dates
}

const getThumbURL = item => {
  const mediationId = get(item, 'mediationId')
  return `${THUMBS_URL}/mediations/${mediationId}`
}

const getLinkURL = item => {
  const offerId = get(item, 'offerId')
  const mediationId = get(item, 'mediationId')
  const params = getQueryURL({ mediationId, offerId })
  return `/decouverte/${params}`
}

const RecommendationListItem = ({ className, item }) => {
  const hasOffer = item.offer || false
  const linkURL = getLinkURL(item)
  const thumbURL = getThumbURL(item)
  const title = item.offer.eventOrThing.name
  const dates = getRecommendationTimezoneDate(item)
  return (
    <li className={`list-item mb18 ${className}`}>
      <Link to={linkURL} className="flex-columns items-center pr12">
        <div className="image flex-0 dotted-right-primary flex-rows flex-center">
          <img src={thumbURL} alt={title} />
        </div>
        <div className="m18 flex-1">
          {hasOffer && (
            <Fragment>
              <h5 className="fs18 is-bold" title={title}>
                <Dotdotdot clamp={dates ? 2 : 3}>{title}</Dotdotdot>
              </h5>
              {dates && <span className="fs13">{dates}</span>}
            </Fragment>
          )}
        </div>
        <div className="flex-0 is-primary-text">
          <span
            aria-hidden
            className="icon-next"
            title="Voir l'offre complète"
          />
        </div>
      </Link>
    </li>
  )
}

RecommendationListItem.defaultProps = {
  className: '',
}

RecommendationListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
}

export default RecommendationListItem
