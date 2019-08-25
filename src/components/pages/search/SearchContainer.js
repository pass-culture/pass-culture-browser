import { connect } from 'react-redux'
import { compose } from 'redux'
import { deleteData } from 'redux-saga-data'

import Search from './Search'
import selectTypeSublabels, { selectTypes } from './selectors/selectTypes'
import { withRequiredLogin } from '../../hocs'
import selectRecommendationsByActivityTag from '../../../selectors/selectRecommendationsByActivityTag'

const mapStateToProps = state => {
  const recommendations = selectRecommendationsByActivityTag(state, 'search')
  const typeSublabels = selectTypeSublabels(state)
  const typeSublabelsAndDescription = selectTypes(state)
  const { user } = state

  return {
    recommendations,
    typeSublabels,
    typeSublabelsAndDescription,
    user,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  resetSearchData: () => dispatch(deleteData(null, { tags: ['search'] })),
})

export default compose(
  withRequiredLogin,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search)
