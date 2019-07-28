import createCachedSelector from 're-reselect'

import mapArgsToCacheKey from './mapArgsToCacheKey'
import selectRecommendations from './selectRecommendations'

const selectCurrentRecommendation = createCachedSelector(
  selectRecommendations,
  (state, offerId) => offerId,
  (state, offerId, mediationId) => mediationId,
  (allRecommendations, offerId, mediationId) => {
    const currentRecommendation = allRecommendations.find(recommendation => {
      const matchOffer = recommendation.offerId === offerId
      const matchMediation = recommendation.mediationId === mediationId
      return offerId === 'tuto' ? matchMediation : matchOffer
    })
    return currentRecommendation
  }
)(mapArgsToCacheKey)

export default selectCurrentRecommendation
