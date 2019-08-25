import { connect } from 'react-redux'
import { compose } from 'redux'
import { deleteData } from 'redux-saga-data'

import FilterControls from './FilterControls'
import withFrenchQueryRouter from '../../../hocs/withFrenchQueryRouter'

const mapDispatchToProps = dispatch => ({
  resetSearchData: () => {
    dispatch(deleteData(null, { tags: ['search'] }))
  },
})

export default compose(
  withFrenchQueryRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(FilterControls)
