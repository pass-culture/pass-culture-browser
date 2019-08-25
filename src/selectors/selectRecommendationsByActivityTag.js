import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, tag) {
  return tag || ''
}

export const selectRecommendationsByActivityTag = createCachedSelector(
  state => state.data.recommendations,
  (state, tag) => tag,
  (recommendations, tag) =>
    recommendations.filter(recommendation =>
      recommendation.__ACTIVITIES__.find(activity => activity.tag === tag)
    )
)(mapArgsToCacheKey)

export default selectRecommendationsByActivityTag
