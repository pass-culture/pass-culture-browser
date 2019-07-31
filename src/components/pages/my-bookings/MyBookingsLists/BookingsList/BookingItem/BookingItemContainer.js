import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import BookingItem from './BookingItem'
import selectRecommendationById from '../../../selectors/selectRecommendationById'

export const mapStateToProps = (state, ownProps) => {
  const { booking } = ownProps
  const { recommendationId } = booking
  const recommendation = selectRecommendationById(state, recommendationId)
  return {
    recommendation,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(BookingItem)
