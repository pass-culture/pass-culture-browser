import withNotRequiredLogin from '../../hocs/with-login/withNotRequiredLogin'
import BetaPage from './BetaPage'
import withPageTracking from '../../../tracking/withPageTracking'
import { compose } from 'redux'

export default compose(
  withPageTracking,
  withNotRequiredLogin
)(BetaPage)
