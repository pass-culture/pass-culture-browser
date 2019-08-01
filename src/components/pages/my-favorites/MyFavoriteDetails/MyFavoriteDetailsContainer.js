import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import MyFavoriteDetails from './MyFavoriteDetails'
import selectFavoriteById from '../selectors/selectFavoriteById'
import selectFirstMatchingBookingByStocks from '../../../../selectors/selectFirstMatchingBookingByStocks'
import selectRecommendationByOfferIdAndMediationId from '../../../../selectors/selectRecommendationByOfferIdAndMediationId'
import { favoriteNormalizer } from '../../../../utils/normalizers'

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { params } = match
  const { favoriteId } = params
  const needsToRequestGetFavorite = typeof favoriteId !== 'undefined'
  const favorite = selectFavoriteById(state, favoriteId)
  const { mediationId, offerId } = favorite || {}
  const firstMatchingRecommendation = selectRecommendationByOfferIdAndMediationId(
    state,
    offerId,
    mediationId
  )
  const { offer } = firstMatchingRecommendation || {}
  const { stocks } = offer || {}
  const firstMatchingBooking = selectFirstMatchingBookingByStocks(state, stocks)
  return {
    firstMatchingBooking,
    firstMatchingRecommendation,
    needsToRequestGetFavorite,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestGetFavorite: handleSuccess => {
      const { match } = ownProps
      const { params } = match
      const { favoriteId } = params
      let apiPath = `/favorites/${favoriteId}`
      dispatch(
        requestData({
          apiPath,
          handleSuccess,
          normalizer: favoriteNormalizer,
        })
      )
    },
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MyFavoriteDetails)
