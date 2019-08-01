import { connect } from 'react-redux'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import MyFavorites from './MyFavorites'
import selectFavorites from './selectors/selectFavorites'
import { withRequiredLogin } from '../../hocs'
import { favoriteNormalizer } from '../../../utils/normalizers'

export const mapStateToProps = state => ({
  myFavorites: selectFavorites(state),
})

export const mapDispatchToProps = dispatch => ({
  requestGetMyFavorites: (handleFail, handleSuccess) => {
    dispatch(
      requestData({
        apiPath: '/favorites',
        handleFail,
        handleSuccess,
        normalizer: favoriteNormalizer,
      })
    )
  },
})

export default compose(
  withRequiredLogin,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MyFavorites)
