import get from 'lodash.get'
import createCachedSelector from 're-reselect'

import mapArgsToCacheKey from './mapArgsToCacheKey'
import selectCurrentRecommendation from './selectCurrentRecommendation'
import selectRecommendations from './selectRecommendations'

const selectNextRecommendation = createCachedSelector(
  selectRecommendations,
  selectCurrentRecommendation,
  (recommendations, currentRecommendation) => {
    const nextRecommendation =
      currentRecommendation &&
      get(
        recommendations,
        recommendations.findIndex(
          recommendation => recommendation.id === currentRecommendation.id
        ) + 1
      )

    if (!nextRecommendation) {
      return undefined
    }

    const { mediationId, offerId } = nextRecommendation

    // path
    const path = `/decouverte/${offerId}/${mediationId || ''}`

    // return
    return Object.assign(
      {
        path,
      },
      nextRecommendation
    )
  }
)(mapArgsToCacheKey)

export default selectNextRecommendation
