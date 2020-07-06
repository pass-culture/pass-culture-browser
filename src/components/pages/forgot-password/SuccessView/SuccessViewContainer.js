import SuccessView from './SuccessView'
import withPageTracking from '../../../../tracking/withPageTracking'
import withNotRequiredLogin from '../../../hocs/with-login/withNotRequiredLogin'
import { compose } from 'redux'

export default compose(
  withNotRequiredLogin,
  withPageTracking
)(SuccessView)
