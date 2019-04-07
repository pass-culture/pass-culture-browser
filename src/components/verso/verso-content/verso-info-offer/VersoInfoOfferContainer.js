/* eslint
  react/jsx-one-expression-per-line: 0 */
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import VersoInfoOffer from './VersoInfoOffer'
import { selectBookables } from '../../../../selectors/selectBookables'
import { isRecommendationOfferFinished } from '../../../../helpers'
import currentRecommendationSelector from '../../../../selectors/currentRecommendation'

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { mediationId, offerId } = match.params
  const recommendation = currentRecommendationSelector(
    state,
    offerId,
    mediationId
  )

  const bookables = selectBookables(state, recommendation, match)
  const isFinished = isRecommendationOfferFinished(recommendation, offerId)

  return {
    bookables,
    isFinished,
    recommendation,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(VersoInfoOffer)
