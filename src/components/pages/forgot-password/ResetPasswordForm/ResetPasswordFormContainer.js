import withPageTracking from '../../../../tracking/withPageTracking'
import ResetPasswordForm from './ResetPasswordForm'
import { compose } from 'redux'
import withNotRequiredLogin from '../../../hocs/with-login/withNotRequiredLogin'

export default compose(
  withNotRequiredLogin,
  withPageTracking
)(ResetPasswordForm)
