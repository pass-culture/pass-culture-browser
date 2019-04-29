export const SAVE_RECOMMENDATIONS_REQUEST_TIMESTAMP =
  'SAVE_RECOMMENDATIONS_REQUEST_TIMESTAMP'

const initialState = 0

export const lastRecommendationsRequestTimestamp = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SAVE_RECOMMENDATIONS_REQUEST_TIMESTAMP:
      return Date.now()
    default:
      return state
  }
}

export const saveLastRecommendationsRequestTimestamp = () => ({
  type: SAVE_RECOMMENDATIONS_REQUEST_TIMESTAMP,
})
