import { connect } from 'react-redux'
import { compose } from 'redux'
import get from 'lodash.get'

import Discovery from './Discovery'
import { getRouterQueryByKey } from '../../../helpers'
import { withRedirectToSigninWhenNotAuthenticated } from '../../hocs'

const checkIfShouldLoadRecommendations = state => {
  const now = Date.now()
  const lastRecommendationsRequestTimestamp = get(
    state,
    'lastRecommendationsRequestTimestamp'
  )
  const delayInMilliSecs = 2 * 60 * 1000 // 2 minutes
  return now >= lastRecommendationsRequestTimestamp + delayInMilliSecs
}

export const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps
  const from = getRouterQueryByKey(location, 'from')
  const fromPassword = from === 'password'
  const recommendations = get(state, 'data.recommendations')
  const readRecommendations = get(state, 'data.readRecommendations')
  const shouldLoadRecommendations = checkIfShouldLoadRecommendations(state)
  return {
    fromPassword,
    readRecommendations,
    recommendations,
    shouldLoadRecommendations,
  }
}

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  connect(mapStateToProps)
)(Discovery)
