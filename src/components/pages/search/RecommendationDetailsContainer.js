import { connect } from 'react-redux'
import { requestData } from 'redux-saga-data'

import RecommendationDetails from './RecommendationDetails'
import selectRecommendationByOfferIdAndMediationId from '../../../selectors/selectRecommendationByOfferIdAndMediationId'
import { recommendationNormalizer } from '../../../utils/normalizers'

export const mapStateToProps = (state, ownProps) => {
  const { mediationId, offerId } = ownProps.match.params
  const recommendation = selectRecommendationByOfferIdAndMediationId(state, offerId, mediationId)

  return { recommendation }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationDetails)
