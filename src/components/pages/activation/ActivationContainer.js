import withNotRequiredLogin from '../../hocs/with-login/withNotRequiredLogin'
import Activation from './Activation'
import { compose } from 'redux'
import withPageTracking from '../../../tracking/withPageTracking'

export default compose(
  withPageTracking,
  withNotRequiredLogin
)(Activation)
