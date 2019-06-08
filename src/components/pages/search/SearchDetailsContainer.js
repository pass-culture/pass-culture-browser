import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { selectCurrentSearchRecommendation } from '../../../selectors'
import { SearchDetails } from './SearchDetails'

function mapStateToProps(state, ownProps) {
  const { mediationId, offerId } = ownProps.match.params
  const recommendation = selectCurrentSearchRecommendation(
    state,
    offerId,
    mediationId
  )

  return { recommendation }
}

export const SearchDetailsContainer = compose(
  withRouter,
  connect(mapStateToProps)
)(SearchDetails)
