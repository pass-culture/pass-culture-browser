import { connect } from 'react-redux'
import { mergeData, requestData } from 'redux-saga-data'

import Favorite from './Favorite'

export const mergeFavoriteData = (dispatch, ownProps) => {
  const { recommendation } = ownProps
  return isFavorite => (state, action) => {
    const { payload } = action
    const favorite = payload.datum

    const updatedRecommendation = {
      ...recommendation,
      offer: {
        ...recommendation.offer,
        favorites: isFavorite ? [] : [favorite],
      },
    }

    dispatch(mergeData({ recommendations: [updatedRecommendation] }))
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  const { recommendation } = ownProps
  const { mediationId, offerId } = recommendation
  return {
    handleFavorite: (isFavorite, showFailModal) => () => {
      dispatch(
        requestData({
          apiPath: `/offers/favorites${isFavorite ? `/${offerId}/${mediationId}` : ''}`,
          body: {
            mediationId,
            offerId,
          },
          handleFail: showFailModal,
          handleSuccess: mergeFavoriteData(dispatch, ownProps)(isFavorite),
          method: isFavorite ? 'DELETE' : 'POST',
          stateKey: 'offersFavorites',
        })
      )
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Favorite)
