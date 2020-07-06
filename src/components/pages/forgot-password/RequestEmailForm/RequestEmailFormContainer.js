import withPageTracking from '../../../../tracking/withPageTracking'
import RequestEmailForm from './RequestEmailForm'
import { compose } from 'redux'
import withNotRequiredLogin from '../../../hocs/with-login/withNotRequiredLogin'

export default compose(
  withNotRequiredLogin,
  withPageTracking
)(RequestEmailForm)
