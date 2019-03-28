/* eslint
  react/jsx-one-expression-per-line: 0 */
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import get from 'lodash.get'

import { VersoInfos } from './VersoInfos'
import { isRecommendationFinished } from '../../../helpers'
import { selectBookables } from '../../../selectors/selectBookables'
import currentRecommendationSelector from '../../../selectors/currentRecommendation'

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

const getRecommendationDescription = recommendation => {
  const defaultValue = ''
  if (!recommendation) return defaultValue
  return get(recommendation, 'offer.eventOrThing.description', defaultValue)
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { mediationId, offerId } = match.params
  // recuperation de la recommandation
  const recommendation = currentRecommendationSelector(
    state,
    offerId,
    mediationId
  )

  const venue = getRecommendationVenue(recommendation)
  const distance = getRecommendationDistance(recommendation)
  const description = getRecommendationDescription(recommendation)
  const bookables = selectBookables(state, recommendation, match)
  const isFinished = isRecommendationFinished(recommendation, offerId)
  return {
    bookables,
    description,
    distance,
    isFinished,
    recommendation,
    venue,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VersoInfos)
