import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import { Icon } from 'pass-culture-shared'
import { navigationLink } from '../../../utils/geolocation'

const getRecommendationDistance = recommendation => {
  const defaultValue = '-'
  if (!recommendation) return defaultValue
  return get(recommendation, 'distance', defaultValue)
}

const getRecommendationVenue = recommendation => {
  const defaultValue = {}
  if (!recommendation) return defaultValue
  return get(recommendation, 'offer.venue', defaultValue)
}

export const VesoInfosWhere = ({ recommendation }) => {
  const venue = getRecommendationVenue(recommendation)
  const distance = getRecommendationDistance(recommendation)
  const { address, city, latitude, longitude, name, postalCode } = venue || {}
  return (
    <div id="verso-infos-section-where">
      <h3>Où ?</h3>
      <div className="flex-columns flex-between">
        <p className="address-info">
          {name && <span className="is-block">{name}</span>}
          {address && <span className="is-block">{address}</span>}
          {postalCode && <span className="is-block">{postalCode}</span>}
          {city && <span className="is-block">{city}</span>}
        </p>
        {latitude && longitude && (
          <a className="distance" href={navigationLink(latitude, longitude)}>
            {distance}
            <Icon
              svg="ico-geoloc-solid2"
              alt="Géolocalisation dans Open Street Map"
            />
          </a>
        )}
      </div>
    </div>
  )
}

VesoInfosWhere.defaultProps = {
  recommendation: null,
}

VesoInfosWhere.propTypes = {
  recommendation: PropTypes.object,
}

export default VesoInfosWhere
