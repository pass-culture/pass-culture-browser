import { connect } from 'react-redux'
import { compose } from 'redux'
import { deleteData } from 'redux-saga-data'

import NavByOfferType from './NavByOfferType'
import withFrenchQueryRouter from '../../../hocs/withFrenchQueryRouter'

export const mapDispatchToProps = (dispatch, ownProps) => ({
  resetSearchData: () => dispatch(deleteData(null, { tags: ['search'] })),

  updateSearchQuery: categories => {
    const { query } = ownProps
    query.change({ categories, page: null }, { pathname: `/recherche/resultats/${categories}` })
  },
})

export default compose(
  withFrenchQueryRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(NavByOfferType)
