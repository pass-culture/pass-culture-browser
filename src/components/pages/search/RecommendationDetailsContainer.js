import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import RecommendationDetails from './RecommendationDetails'

import selectFirstMatchingBookingByStocks from '../../../selectors/selectFirstMatchingBookingByStocks'
import selectRecommendationByOfferIdAndMediationId from '../../../selectors/selectRecommendationByOfferIdAndMediationId'
import { recommendationNormalizer } from '../../../utils/normalizers'

export const mapStateToProps = (state, ownProps) => {
  const { mediationId, offerId } = ownProps.match.params
  const recommendation = selectRecommendationByOfferIdAndMediationId(state, offerId, mediationId)
  const { offer } = recommendation || {}
  const { stocks } = offer || {}
  const firstMatchingBooking = selectFirstMatchingBookingByStocks(state, stocks)
  const needsToRequestGetRecommendation = typeof offerId !== 'undefined'
  return {
    firstMatchingBooking,
    needsToRequestGetRecommendation,
    recommendation,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  const { match } = ownProps
  const { params } = match
  const { mediationId, offerId } = params
  return {
    requestGetRecommendation: handleForceDetailsVisible => {
      let apiPath = `/recommendations/offers/${offerId}`
      if (mediationId) {
        apiPath = `${apiPath}?mediationId=${mediationId}`
      }

      dispatch(
        requestData({
          apiPath,
          handleSuccess: handleForceDetailsVisible,
          normalizer: recommendationNormalizer,
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
)(RecommendationDetails)
