import { connect } from 'react-redux'
import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'

import SignIn from './SignIn'
import withPageTracking from '../../../tracking/withPageTracking'
import withNotRequiredLogin from '../../hocs/with-login/withNotRequiredLogin'

export const mapDispatchToProps = dispatch => ({
  signIn: (values, fail, success) => {
    return new Promise(resolve => {
      dispatch(
        requestData({
          apiPath: '/users/signin',
          body: { ...values },
          handleFail: fail(resolve),
          handleSuccess: success(resolve),
          method: 'POST',
        })
      )
    })
  },
})

export default compose(
  withNotRequiredLogin,
  withPageTracking,
  connect(
    null,
    mapDispatchToProps
  )
)(SignIn)
