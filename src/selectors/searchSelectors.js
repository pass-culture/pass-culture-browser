import createCachedSelector from 're-reselect'

const SELECTOR_SEPARATOR = '::'
const toReReSelectorId = (...args) => args.join(SELECTOR_SEPARATOR)

export const selectCurrentSearchRecommendation = createCachedSelector(
  state => state.data.searchRecommendations,
  (state, offerId) => offerId,
  (state, offerId, mediationId) => mediationId,
  (recommendations, offerId, mediationId) => {
    if (
      !recommendations ||
      !recommendations.length ||
      (!offerId && !mediationId)
    )
      return null
    const currentRecommendation = recommendations.find(recommendation => {
      const matchOffer = recommendation.offerId === offerId
      const matchMediation = recommendation.mediationId === mediationId
      return matchMediation || matchOffer
    })
    return currentRecommendation || null
  }
)((state, offerId, mediationId) =>
  toReReSelectorId('search', 'current', 'recommendation', offerId, mediationId)
)

export default selectCurrentSearchRecommendation
