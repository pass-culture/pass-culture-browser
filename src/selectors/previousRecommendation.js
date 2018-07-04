import { createSelector } from 'reselect'

import selectCurrentRecommendation from './currentRecommendation'
import getRecommendation from '../getters/recommendation'
import selectUniqueRecommendations from './uniqueRecommendations'

export default createSelector(
  selectUniqueRecommendations,
  selectCurrentRecommendation,
  (recommendations, currentRecommendation) => {
    const previousRecommendation =
      currentRecommendation &&
      recommendations &&
      recommendations[
        currentRecommendation.index - 1
      ]
    return getRecommendation({ recommendation: previousRecommendation })
  }
)
