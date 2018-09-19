/* eslint
  react/jsx-one-expression-per-line: 0 */
import PropTypes from 'prop-types'
import get from 'lodash.get'
import moment from 'moment'
import { capitalize, Icon } from 'pass-culture-shared'
import React, { Fragment } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { Link } from 'react-router-dom'

import Thumb from '../layout/Thumb'
import { getQueryURL } from '../../helpers'
import { getTimezone } from '../../utils/timezone'

const formatDate = (date, tz) =>
  capitalize(
    moment(date)
      .tz(tz)
      .format('dddd DD/MM/YYYY')
  )

const getRecommendationDateString = (offer, tz) => {
  if (offer.eventId === null) {
    return 'permanent'
  }
  const fromDate = offer.dateRange[0]
  const toDate = offer.dateRange[1]

  const formatedDate = `du
  ${formatDate(fromDate, tz)} au ${formatDate(toDate, tz)}`

  return formatedDate
}

const SearchResultItem = ({ recommendation }) => {
  const offerId = get(recommendation, 'offerId')
  const mediationId = get(recommendation, 'mediationId')
  const departementCode = get(recommendation, 'offer.venue.departementCode')
  const tz = getTimezone(departementCode)

  const queryURL = getQueryURL({ mediationId, offerId })
  const linkURL = `/decouverte/${queryURL}`

  return (
    <li className="recommendation-item">
      <Link to={linkURL}>
        <Thumb src={recommendation.thumbUrl} />
        <div className="infos">
          <div className="top">
            {recommendation.offer && (
              <Fragment>
                <h5 title={recommendation.offer.eventOrThing.name}>
                  <Dotdotdot clamp="2">
                    {recommendation.offer.eventOrThing.name}
                  </Dotdotdot>
                </h5>
                ,
                <span>
                  {recommendation.offer &&
                    getRecommendationDateString(recommendation.offer, tz)}
                </span>
              </Fragment>
            )}
          </div>
        </div>
        <div className="arrow">
          <Icon svg="ico-next-S" className="Suivant" />
        </div>
      </Link>
    </li>
  )
}

SearchResultItem.propTypes = {
  recommendation: PropTypes.object.isRequired,
}

export default SearchResultItem
