import { connect } from 'react-redux'
import { mergeData, requestData } from 'redux-saga-data'

import selectIsFeatureDisabled from '../../../../router/selectors/selectIsFeatureDisabled'
import Favorite from './Favorite'

export const mapStateToProps = state => {
  const isFeatureDisabled = selectIsFeatureDisabled(state, 'FAVORITE_OFFER')
  return {
    isFeatureDisabled,
  }
}

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
          apiPath: `/favorites${isFavorite ? `/${offerId}/${mediationId}` : ''}`,
          body: {
            mediationId,
            offerId,
          },
          handleFail: showFailModal,
          handleSuccess: mergeFavoriteData(dispatch, ownProps)(isFavorite),
          method: isFavorite ? 'DELETE' : 'POST',
        })
      )
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite)
