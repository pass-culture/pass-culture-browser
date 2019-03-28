import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'

const getRecommendationDescription = recommendation => {
  const defaultValue = ''
  if (!recommendation) return defaultValue
  return get(recommendation, 'offer.eventOrThing.description', defaultValue)
}

const VersoInfosWhat = ({ recommendation }) => {
  const description = getRecommendationDescription(recommendation)
  if (!description) return null
  return (
    <div id="verso-infos-section-what">
      <h3>Quoi ?</h3>
      <pre className="is-raw-description">{description}</pre>
    </div>
  )
}

VersoInfosWhat.defaultProps = {
  recommendation: null,
}

VersoInfosWhat.propTypes = {
  recommendation: PropTypes.object,
}

export default VersoInfosWhat
