import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import isCancelView from '../../../utils/isCancelView'
import Details from './Details'
import withPageTracking from '../../../tracking/withPageTracking'

export const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const cancelView = isCancelView(match)

  return {
    cancelView,
  }
}

export default compose(
  withPageTracking,
  withRouter,
  connect(mapStateToProps)
)(Details)
